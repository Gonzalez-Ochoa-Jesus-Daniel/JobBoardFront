import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAppToast } from '@/shared/components/appToastContext'
import { extractFileName, getPresignedUrl } from '@/services/filesService'
import { estudianteService } from '../services/estudiante.service'
import type { CurriculumData, EditContactFormData, StudentProfile } from '../types/profile.types'

const getUserId = () => Number(localStorage.getItem('userId'))

const EMPTY_PROFILE: StudentProfile = {
  id: '',
  firstName: 'Estudiante',
  lastName: '',
  email: '',
  phone: '',
  career: 'Programa no especificado',
  institutionalEmail: '',
  birthDate: '',
  civilStatus: 'No especificado',
  address: 'No especificado',
  academicStatus: 'Estudiante',
}

const buildCurriculumData = (profile: StudentProfile): CurriculumData => {
  if (!profile.cvUrl) {
    return {
      fileName: 'CV no disponible',
      uploadDate: 'Sin archivo cargado',
    }
  }

  return {
    fileName: extractFileName(profile.cvUrl) || 'Curriculum del estudiante',
    uploadDate: 'Disponible en perfil',
    url: profile.cvUrl,
  }
}

export const useProfile = () => {
  const userId = getUserId()
  const toast = useAppToast()
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [contactOverrides, setContactOverrides] =
    useState<Partial<Pick<StudentProfile, 'phone' | 'email' | 'civilStatus' | 'address'>>>({})

  const profileQuery = useQuery({
    queryKey: ['estudiante', 'perfil', userId],
    queryFn: () => estudianteService.getPerfil(userId),
    enabled: !!userId,
  })

  const studentProfile = useMemo(
    () => ({
      ...(profileQuery.data ?? EMPTY_PROFILE),
      ...contactOverrides,
    }),
    [contactOverrides, profileQuery.data]
  )

  const curriculumData = useMemo(() => buildCurriculumData(studentProfile), [studentProfile])

  const handleEditClick = () => {
    setIsContactModalOpen(true)
  }

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false)
  }

  const handleSaveContact = (data: EditContactFormData) => {
    setContactOverrides({
      phone: data.phone,
      email: data.email,
      civilStatus: data.civilStatus,
      address: data.address,
    })
    toast.success('Contacto actualizado', 'Los datos se guardaron en esta vista.')
    setIsContactModalOpen(false)
  }

  const handleDownloadCV = async () => {
    if (!curriculumData.url) {
      toast.info('CV no disponible', 'Este perfil todavia no tiene un archivo para consultar.')
      return
    }

    const viewer = window.open('', '_blank')
    if (!viewer) {
      toast.warning('Ventana bloqueada', 'Permite ventanas emergentes para abrir el CV.')
      return
    }
    viewer.opener = null

    try {
      const freshUrl = await getPresignedUrl(curriculumData.url)
      viewer.location.href = freshUrl
    } catch {
      viewer.close()
      toast.error('No se pudo abrir el CV', 'Intenta nuevamente en unos segundos.')
    }
  }

  return {
    studentProfile,
    curriculumData,
    isEditing: false,
    isContactModalOpen,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    handleEditClick,
    handleCloseContactModal,
    handleSaveContact,
    handleDownloadCV,
  }
}
