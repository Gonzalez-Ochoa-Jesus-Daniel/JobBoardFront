import { useQuery } from '@tanstack/react-query'
import { getManagementOverview } from '../services/gestionService'

function useManagementOverview() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['admin', 'management', 'overview'],
    queryFn: () => getManagementOverview(),
  })

  return {
    metrics: data?.metrics ?? [],
    users: data?.users ?? [],
    isLoading,
    isError,
    error,
    refetch,
  }
}

export default useManagementOverview
