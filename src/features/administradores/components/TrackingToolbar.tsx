import SearchFiltersToolbar from '../../../components/ui/SearchFiltersToolbar'
import type { SearchFiltersToolbarControlProps } from '../../../components/ui/SearchFiltersToolbar'

function TrackingToolbar(props: SearchFiltersToolbarControlProps) {
  return (
    <SearchFiltersToolbar
      {...props}
      containerClassName="tracking-toolbar"
      ariaLabel="Buscador y filtros de seguimiento"
      inputId="tracking-search"
      placeholder="Buscar por candidato, vacante o empresa..."
      availableFilters={[
        'Estado: Pendiente',
        'Estado: En revision',
        'Estado: Entrevista',
        'Estado: Aceptado',
        'Estado: Rechazado',
      ]}
    />
  )
}

export default TrackingToolbar
