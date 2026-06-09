import api from '@/services/api'
import type { Vacante } from '../types/publicaciones.types'

export const publicacionesService = {
  getVacantes: (q?: string, modalidad?: string): Promise<Vacante[]> => {
    const params = new URLSearchParams()

    if (q) params.set('q', q)
    if (modalidad) params.set('modalidad', modalidad)

    const query = params.toString()

    return api.get(`/estudiante/vacantes${query ? `?${query}` : ''}`) as Promise<Vacante[]>
  },

  getVacante: (publicacionId: number): Promise<Vacante> =>
    api.get(`/estudiante/vacantes/${publicacionId}`) as Promise<Vacante>,

  postular: (userId: number, publicacionId: number): Promise<unknown> =>
    api.post(`/estudiante/${userId}/postulaciones`, { publicacionId }),
}
