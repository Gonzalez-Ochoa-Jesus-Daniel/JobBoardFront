import { useQuery } from '@tanstack/react-query'
import { adminService } from '../services/admin.service'

export function useValidationDocuments(userId: string | null) {
  return useQuery({
    queryKey: ['admin', 'validation', 'documentos', userId],
    queryFn: () => adminService.getDocumentosUsuario(userId!),
    enabled: Boolean(userId),
    staleTime: (query) => {
      const seconds = query.state.data?.urlExpirationSeconds ?? 0
      return seconds > 0 ? seconds * 800 : 0
    },
  })
}

export default useValidationDocuments
