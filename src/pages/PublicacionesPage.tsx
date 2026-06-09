import { useMemo, useState } from 'react'
import { APP_ICONS } from '../config/iconConfig'
import AdminLayout from '../features/administradores/components/AdminLayout'
import AdminPageHeader from '../features/administradores/components/AdminPageHeader'
import AdminPageState from '../features/administradores/components/AdminPageState'
import DetallePublicacionModal from '../features/administradores/components/DetallePublicacionModal'
import PublicacionesGrid from '../features/administradores/components/PublicacionesGrid'
import EstadisticasPublicaciones from '../features/administradores/components/EstadisticasPublicaciones'
import PublicacionesToolbar from '../features/administradores/components/PublicacionesToolbar'
import usePublicationsOverview, { useActualizarEstatusPublicacion } from '../features/administradores/hooks/usePublicationsOverview'
import { matchesAdminFilterGroup, matchesAdminSearch } from '../features/administradores/utils/filtering'
import { useAppToast } from '../shared/components/appToastContext'
import type { PublicacionEstatusAdmin } from '../features/administradores/types/admin.types'
import type { Publication } from '../features/administradores/types/publicaciones.types'

function PublicacionesPage() {
  const { metrics, publications, isLoading, isError, refetch } = usePublicationsOverview()
  const { mutate: actualizarEstatus, isPending: isUpdatingStatus } = useActualizarEstatusPublicacion()
  const toast = useAppToast()
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null)
  const [searchValue, setSearchValue] = useState('')
  const [filters, setFilters] = useState<string[]>([])

  const filteredPublications = useMemo(
    () =>
      publications.filter(
        (publication) =>
          matchesAdminSearch(searchValue, [
            publication.title,
            publication.company,
            publication.status,
            publication.modality,
            publication.workday,
            publication.location,
          ]) &&
          matchesAdminFilterGroup(filters, 'Estado', publication.status) &&
          matchesAdminFilterGroup(filters, 'Modalidad', publication.modality),
      ),
    [filters, publications, searchValue],
  )

  const handleUpdateStatus = (publication: Publication, estatus: PublicacionEstatusAdmin) => {
    actualizarEstatus(
      { publicacionId: publication.id, estatus },
      {
        onSuccess: () => {
          toast.success('Publicacion actualizada', `El estatus cambio a ${estatus}.`)
          setSelectedPublication(null)
        },
        onError: () => toast.error('No se pudo actualizar', 'Intenta cambiar el estatus nuevamente.'),
      },
    )
  }

  return (
    <>
      <AdminLayout contentId="publicaciones">
        <AdminPageHeader
          eyebrow="Vacantes"
          title="Publicaciones"
          description="Supervisa las vacantes publicadas y revisa su informacion antes de cambiar el estatus."
          Icon={APP_ICONS.documents}
        />

        {isLoading ? <AdminPageState type="loading" title="Cargando publicaciones" /> : null}
        {isError ? <AdminPageState type="error" onRetry={() => void refetch()} /> : null}

        {!isLoading && !isError ? (
          <>
            <EstadisticasPublicaciones metrics={metrics} />
            <PublicacionesToolbar
              searchValue={searchValue}
              filters={filters}
              resultCount={filteredPublications.length}
              onSearchChange={setSearchValue}
              onFiltersChange={setFilters}
            />
            <div className="admin-results-summary">
              <span>
                Mostrando <strong>{filteredPublications.length}</strong> de {publications.length} publicaciones
              </span>
              {filters.length > 0 ? <span>{filters.length} filtros activos</span> : null}
            </div>
            {filteredPublications.length > 0 ? (
              <PublicacionesGrid rows={filteredPublications} onSelect={setSelectedPublication} />
            ) : (
              <AdminPageState
                type="empty"
                title="No encontramos publicaciones"
                message="Prueba con otro termino o ajusta los filtros."
              />
            )}
          </>
        ) : null}
      </AdminLayout>

      <DetallePublicacionModal
        publication={selectedPublication}
        onClose={() => setSelectedPublication(null)}
        onUpdateStatus={handleUpdateStatus}
        isUpdatingStatus={isUpdatingStatus}
      />
    </>
  )
}

export default PublicacionesPage
