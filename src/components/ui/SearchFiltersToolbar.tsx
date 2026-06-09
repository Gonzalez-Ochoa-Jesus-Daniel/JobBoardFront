import { Filter, Search, SlidersHorizontal, X } from 'lucide-react'
import { useState } from 'react'
import { APP_ICON_SIZE, APP_ICON_STROKE_WIDTH } from '../../config/iconConfig'

export type SearchFiltersToolbarControlProps = {
  searchValue?: string
  filters?: string[]
  resultCount?: number
  onSearchChange?: (value: string) => void
  onFiltersChange?: (filters: string[]) => void
}

type SearchFiltersToolbarProps = SearchFiltersToolbarControlProps & {
  containerClassName: string
  ariaLabel: string
  inputId: string
  placeholder: string
  availableFilters: string[]
}

function SearchFiltersToolbar({
  containerClassName,
  ariaLabel,
  inputId,
  placeholder,
  availableFilters,
  searchValue,
  filters,
  resultCount,
  onSearchChange,
  onFiltersChange,
}: SearchFiltersToolbarProps) {
  const [showFiltersPanel, setShowFiltersPanel] = useState(false)
  const [internalSearchValue, setInternalSearchValue] = useState('')
  const [internalFilters, setInternalFilters] = useState<string[]>([])
  const currentSearchValue = searchValue ?? internalSearchValue
  const appliedFilters = filters ?? internalFilters

  const handleSearchChange = (value: string) => {
    setInternalSearchValue(value)
    onSearchChange?.(value)
  }

  const updateFilters = (nextFilters: string[]) => {
    setInternalFilters(nextFilters)
    onFiltersChange?.(nextFilters)
  }

  const handleToggleFilter = (filterName: string) => {
    updateFilters(
      appliedFilters.includes(filterName)
        ? appliedFilters.filter((item) => item !== filterName)
        : [...appliedFilters, filterName],
    )
  }

  return (
    <div className="search-filters-shell">
      <section className={containerClassName} aria-label={ariaLabel}>
        <label className="validation-search" htmlFor={inputId}>
          <Search size={APP_ICON_SIZE} strokeWidth={APP_ICON_STROKE_WIDTH} />
          <input
            id={inputId}
            type="search"
            placeholder={placeholder}
            value={currentSearchValue}
            onChange={(event) => handleSearchChange(event.target.value)}
          />
          {typeof resultCount === 'number' ? <span className="search-results-count">{resultCount}</span> : null}
        </label>

        <button
          type="button"
          className={`validation-filter-btn ${showFiltersPanel ? 'is-open' : ''}`}
          onClick={() => setShowFiltersPanel((current) => !current)}
          aria-expanded={showFiltersPanel}
          aria-controls={`${inputId}-filters`}
        >
          <Filter size={APP_ICON_SIZE} strokeWidth={APP_ICON_STROKE_WIDTH} />
          Filtros
          {appliedFilters.length > 0 ? <span className="filters-count">{appliedFilters.length}</span> : null}
        </button>
      </section>

      {showFiltersPanel ? (
        <aside className="filters-preview-card" id={`${inputId}-filters`} role="status" aria-live="polite">
          <header className="filters-preview-head">
            <h3>
              <SlidersHorizontal size={APP_ICON_SIZE} strokeWidth={APP_ICON_STROKE_WIDTH} />
              Filtros aplicados
            </h3>
            <button
              type="button"
              className="filters-preview-close"
              aria-label="Cerrar filtros"
              onClick={() => setShowFiltersPanel(false)}
            >
              <X size={APP_ICON_SIZE} strokeWidth={APP_ICON_STROKE_WIDTH} />
            </button>
          </header>

          {appliedFilters.length > 0 ? (
            <div className="filters-preview-chips" aria-label="Listado de filtros activos">
              {appliedFilters.map((filterName) => (
                <span key={filterName} className="filters-preview-chip">
                  {filterName}
                </span>
              ))}
            </div>
          ) : (
            <p className="filters-preview-empty">No hay filtros activos.</p>
          )}

          <section className="filters-available-wrap" aria-label="Filtros disponibles">
            <h4>Filtros disponibles</h4>
            <div className="filters-available-chips">
              {availableFilters.map((filterName) => {
                const isSelected = appliedFilters.includes(filterName)

                return (
                  <button
                    key={filterName}
                    type="button"
                    className={`filters-available-chip ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => handleToggleFilter(filterName)}
                    aria-pressed={isSelected}
                  >
                    {filterName}
                  </button>
                )
              })}
            </div>
          </section>

          <footer className="filters-preview-actions">
            <button
              type="button"
              className="filters-preview-clear"
              onClick={() => updateFilters([])}
              disabled={appliedFilters.length === 0}
            >
              Limpiar filtros
            </button>
          </footer>
        </aside>
      ) : null}
    </div>
  )
}

export default SearchFiltersToolbar
