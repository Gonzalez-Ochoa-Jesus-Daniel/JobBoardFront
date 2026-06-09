import { useQuery } from '@tanstack/react-query'
import { getDashboardOverview } from '../services/dashboardService'

function useDashboardOverview() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['admin', 'dashboard', 'overview'],
    queryFn: () => getDashboardOverview(),
  })

  return {
    summaryCards: data?.summaryCards ?? [],
    vacancyRows: data?.vacancyRows ?? [],
    recentActivity: data?.recentActivity ?? [],
    isLoading,
    isError,
    error,
    refetch,
  }
}

export default useDashboardOverview
