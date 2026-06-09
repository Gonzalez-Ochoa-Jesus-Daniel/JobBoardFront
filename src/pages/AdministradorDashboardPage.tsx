import DashboardHeader from '../components/layout/DashboardHeader'
import AdminLayout from '../features/administradores/components/AdminLayout'
import AdminPageState from '../features/administradores/components/AdminPageState'
import ActivityPanel from '../features/administradores/components/ActivityPanel'
import SummaryGrid from '../features/administradores/components/SummaryGrid'
import VacanciesPanel from '../features/administradores/components/VacanciesPanel'
import useDashboardOverview from '../features/administradores/hooks/useDashboardOverview'
import UsersPanel from '../features/administradores/components/UsersPanel'
import useUsersDashboard from '../features/administradores/hooks/useUsersDashboard'

function AdministradorDashboardPage() {
  const dashboard = useDashboardOverview()
  const users = useUsersDashboard()
  const isLoading = dashboard.isLoading || users.isLoading
  const isError = dashboard.isError || users.isError
  const isEmpty =
    dashboard.summaryCards.length === 0 &&
    dashboard.vacancyRows.length === 0 &&
    dashboard.recentActivity.length === 0 &&
    users.userCards.every((card) => card.count === 0)

  const handleRetry = () => {
    void Promise.all([dashboard.refetch(), users.refetch()])
  }

  return (
    <AdminLayout contentId="dashboard">
      <DashboardHeader />

      {isLoading ? <AdminPageState type="loading" title="Preparando el panel de control" /> : null}
      {isError ? <AdminPageState type="error" onRetry={handleRetry} /> : null}
      {!isLoading && !isError && isEmpty ? (
        <AdminPageState
          type="empty"
          title="El panel aun no tiene actividad"
          message="Las metricas y movimientos recientes apareceran cuando existan registros."
        />
      ) : null}

      {!isLoading && !isError && !isEmpty ? (
        <>
          <SummaryGrid cards={dashboard.summaryCards} />

          <section className="dashboard-grid">
            <VacanciesPanel rows={dashboard.vacancyRows} />
            <ActivityPanel items={dashboard.recentActivity} />
          </section>

          <UsersPanel cards={users.userCards} />
        </>
      ) : null}
    </AdminLayout>
  )
}

export default AdministradorDashboardPage
