import { useQuery } from '@tanstack/react-query'
import { getTrackingOverview } from '../services/trackingService'

function useTrackingOverview() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['admin', 'tracking', 'overview'],
    queryFn: () => getTrackingOverview(),
  })

  return {
    metrics: data?.metrics ?? [],
    rows: data?.rows ?? [],
    isLoading,
    isError,
    error,
    refetch,
  }
}

export default useTrackingOverview
