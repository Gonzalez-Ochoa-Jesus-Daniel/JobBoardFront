import api from '@/services/api'
import type {
  EmpresaPerfil,
  Vacante,
  CreateVacanteRequest,
  UpdateEstatusRequest,
  Postulante,
  PostulanteApi,
} from '../types/empresa.types'

const mapPostulante = (postulante: PostulanteApi): Postulante => ({
  id: postulante.estudianteId,
  postulacionId: postulante.postulacionId,
  nombre: postulante.nombreCompleto,
  email: postulante.email,
  telefono: postulante.telefono,
  carrera: postulante.carrera,
  matricula: postulante.matricula,
  estatusAcademico: postulante.estatusAcademico,
  tipoUsuario: postulante.estatusAcademico || 'Estudiante',
  estatus: postulante.estatusPostulacion,
  descripcion: '',
  fotoUrl: postulante.fotoUrl,
  cvUrl: postulante.cvUrl,
  urlExpirationSeconds: postulante.urlExpirationSeconds,
})

export const empresaService = {

  getPerfil: (userId: number): Promise<EmpresaPerfil> =>
    api.get(`/empresa/${userId}/perfil`) as Promise<EmpresaPerfil>,

  actualizarPerfil: (userId: number, data: Partial<EmpresaPerfil>): Promise<EmpresaPerfil> =>
    api.put(`/empresa/${userId}/perfil`, data) as Promise<EmpresaPerfil>,

  getVacantes: (empresaId: number): Promise<Vacante[]> =>
    api.get(`/empresa/${empresaId}/vacantes`) as Promise<Vacante[]>,

  getVacante: (empresaId: number, publicacionId: number): Promise<Vacante> =>
    api.get(`/empresa/${empresaId}/vacantes/${publicacionId}`) as Promise<Vacante>,

  crearVacante: (empresaId: number, data: CreateVacanteRequest): Promise<Vacante> =>
    api.post(`/empresa/${empresaId}/vacantes`, data) as Promise<Vacante>,

  actualizarEstatusVacante: (publicacionId: number, data: UpdateEstatusRequest): Promise<void> =>
    api.put(`/empresa/vacantes/${publicacionId}/estatus`, data) as Promise<void>,

  getPostulantes: async (empresaId: number, publicacionId: number): Promise<Postulante[]> => {
    const response = await api.get(
      `/empresa/${empresaId}/vacantes/${publicacionId}/postulantes`
    ) as unknown as PostulanteApi[]

    return response.map(mapPostulante)
  },

  actualizarEstatusPostulante: (
    empresaId: number,
    postulacionId: number,
    estatus: string
  ): Promise<void> =>
    api.put(`/empresa/${empresaId}/postulaciones/${postulacionId}/estatus`, { estatus }) as Promise<void>,

}
