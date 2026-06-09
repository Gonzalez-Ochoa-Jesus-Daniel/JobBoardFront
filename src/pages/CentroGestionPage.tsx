import { useMemo, useState } from 'react'
import { APP_ICONS } from '../config/iconConfig'
import AdminLayout from '../features/administradores/components/AdminLayout'
import AdminPageHeader from '../features/administradores/components/AdminPageHeader'
import AdminPageState from '../features/administradores/components/AdminPageState'
import ManagementDetailModal from '../features/administradores/components/ManagementDetailModal'
import ManagementStats from '../features/administradores/components/ManagementStats'
import ManagementToolbar from '../features/administradores/components/ManagementToolbar'
import ManagementUsersTable from '../features/administradores/components/ManagementUsersTable'
import useManagementOverview from '../features/administradores/hooks/useManagementOverview'
import { matchesAdminFilterGroup, matchesAdminSearch } from '../features/administradores/utils/filtering'
import type { ManagementUser } from '../features/administradores/types/management.types'

function CentroGestionPage() {
  const { metrics, users, isLoading, isError, refetch } = useManagementOverview()
  const [selectedUser, setSelectedUser] = useState<ManagementUser | null>(null)
  const [searchValue, setSearchValue] = useState('')
  const [filters, setFilters] = useState<string[]>([])

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          matchesAdminSearch(searchValue, [
            user.fullName,
            user.description,
            user.contact,
            user.contactPhone,
            user.type,
            user.state,
          ]) &&
          matchesAdminFilterGroup(filters, 'Estado', user.state) &&
          matchesAdminFilterGroup(filters, 'Tipo', user.type),
      ),
    [filters, searchValue, users],
  )

  return (
    <>
      <AdminLayout contentId="gestion">
        <AdminPageHeader
          eyebrow="Usuarios"
          title="Centro de gestion"
          description="Consulta usuarios, revisa su informacion y supervisa su estado de acceso."
          Icon={APP_ICONS.management}
        />

        {isLoading ? <AdminPageState type="loading" title="Cargando usuarios" /> : null}
        {isError ? <AdminPageState type="error" onRetry={() => void refetch()} /> : null}

        {!isLoading && !isError ? (
          <>
            <ManagementStats metrics={metrics} />
            <ManagementToolbar
              searchValue={searchValue}
              filters={filters}
              resultCount={filteredUsers.length}
              onSearchChange={setSearchValue}
              onFiltersChange={setFilters}
            />
            <div className="admin-results-summary">
              <span>
                Mostrando <strong>{filteredUsers.length}</strong> de {users.length} usuarios
              </span>
              {filters.length > 0 ? <span>{filters.length} filtros activos</span> : null}
            </div>
            {filteredUsers.length > 0 ? (
              <ManagementUsersTable rows={filteredUsers} onView={setSelectedUser} />
            ) : (
              <AdminPageState
                type="empty"
                title="No encontramos usuarios"
                message="Prueba con otro termino o limpia los filtros activos."
              />
            )}
          </>
        ) : null}
      </AdminLayout>

      <ManagementDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </>
  )
}

export default CentroGestionPage
