import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { publicacionesService } from '../services/publicaciones.service'
import type { JobCardItem, SearchPublicationItem, Vacante } from '../types/publicaciones.types'

const getUserId = () => Number(localStorage.getItem('userId'))

const formatSalary = (value: number | null): string =>
  typeof value === 'number' && value > 0 ? `$ ${value.toLocaleString('es-MX')}` : 'Sueldo no especificado'

const formatDate = (iso: string): string => {
  const date = new Date(iso)

  if (Number.isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

const toJobCardItem = (vacante: Vacante): JobCardItem => ({
  id: vacante.id,
  title: vacante.titulo,
  company: vacante.nombreEmpresa,
  location: vacante.modalidad,
  salary: formatSalary(vacante.sueldoAprox),
  modality: vacante.modalidad,
})

const toSearchItem = (vacante: Vacante): SearchPublicationItem => ({
  id: vacante.id,
  title: vacante.titulo,
  location: vacante.nombreEmpresa,
  description: vacante.descripcion,
  typeTag: vacante.modalidad,
  salaryTag: formatSalary(vacante.sueldoAprox),
  timeAgo: formatDate(vacante.fechaPublicacion),
})

export type ApplyFeedback = {
  type: 'ok' | 'error'
  message: string
}

export const usePublicaciones = () => {
  const userId = getUserId()
  const queryClient = useQueryClient()
  const [viewMode, setViewMode] = useState<'detail' | 'search'>('detail')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [appliedIds, setAppliedIds] = useState<number[]>([])
  const [feedback, setFeedback] = useState<ApplyFeedback | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus()
  }, [isSearchOpen])

  const { data: vacantes = [], isLoading, isError } = useQuery({
    queryKey: ['estudiante', 'vacantes'],
    queryFn: () => publicacionesService.getVacantes(),
  })

  const vacantesFiltradas = useMemo(() => {
    const term = searchText.trim().toLowerCase()

    if (!term) return vacantes

    return vacantes.filter((vacante) =>
      [vacante.titulo, vacante.nombreEmpresa, vacante.descripcion, vacante.modalidad]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term))
    )
  }, [vacantes, searchText])

  const selectedVacante = useMemo<Vacante | null>(() => {
    if (vacantes.length === 0) return null

    return vacantes.find((vacante) => vacante.id === selectedId) ?? vacantes[0]
  }, [vacantes, selectedId])

  const listItems = useMemo(() => vacantesFiltradas.map(toJobCardItem), [vacantesFiltradas])
  const searchPublicationItems = useMemo(() => vacantesFiltradas.map(toSearchItem), [vacantesFiltradas])

  const postularMutation = useMutation({
    mutationFn: (publicacionId: number) => {
      if (!userId) {
        return Promise.reject(new Error('No se encontro la sesion del estudiante.'))
      }

      return publicacionesService.postular(userId, publicacionId)
    },
    onSuccess: (_data, publicacionId) => {
      setAppliedIds((current) => (
        current.includes(publicacionId) ? current : [...current, publicacionId]
      ))
      setFeedback({ type: 'ok', message: 'Tu postulacion fue enviada correctamente.' })
      queryClient.invalidateQueries({ queryKey: ['estudiante', 'postulaciones'] })
      queryClient.invalidateQueries({ queryKey: ['estudiante', 'vacantes'] })
    },
    onError: (error: unknown) => {
      const message = (error as { message?: string })?.message ?? 'No se pudo enviar la postulacion.'
      setFeedback({ type: 'error', message })
    },
  })

  const openSearchMode = () => {
    setIsSearchOpen(true)
    setViewMode('search')
  }

  const closeSearchMode = () => {
    setIsSearchOpen(false)
    window.setTimeout(() => setViewMode('detail'), 220)
  }

  const clearFeedback = useCallback(() => {
    setFeedback(null)
  }, [])

  return {
    viewMode,
    isSearchOpen,
    searchText,
    searchInputRef,
    listItems,
    searchPublicationItems,
    selectedVacante,
    isLoading,
    isError,
    isApplying: postularMutation.isPending,
    appliedIds,
    feedback,
    openSearchMode,
    closeSearchMode,
    setSearchText,
    selectVacante: setSelectedId,
    postular: (publicacionId: number) => postularMutation.mutate(publicacionId),
    clearFeedback,
  }
}
