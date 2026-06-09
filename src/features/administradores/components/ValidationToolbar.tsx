import SearchFiltersToolbar from '../../../components/ui/SearchFiltersToolbar'
import type { SearchFiltersToolbarControlProps } from '../../../components/ui/SearchFiltersToolbar'

function ValidationToolbar(props: SearchFiltersToolbarControlProps) {
  return (
    <SearchFiltersToolbar
      {...props}
      containerClassName="validation-toolbar"
      ariaLabel="Busqueda y filtros de validacion"
      inputId="validation-search"
      placeholder="Buscar solicitante..."
      availableFilters={[
        'Estado: Pendiente',
        'Tipo: Alumno',
        'Tipo: Egresado',
        'Tipo: Empresa',
      ]}
    />
  )
}

export default ValidationToolbar
