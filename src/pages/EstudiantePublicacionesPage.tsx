import { useEffect } from 'react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { JobListCard } from '@/features/estudiantes/components/JobListCard'
import { PublicacionesFilterPanel } from '@/features/estudiantes/components/PublicacionesFilterPanel'
import { PublicacionesSearchHeader } from '@/features/estudiantes/components/PublicacionesSearchHeader'
import { PublicationDetail } from '@/features/estudiantes/components/PublicationDetail'
import { SearchPublicationCard } from '@/features/estudiantes/components/SearchPublicationCard'
import { usePublicaciones } from '@/features/estudiantes/hooks/usePublicaciones'
import { useAppToast } from '@/shared/components/appToastContext'
import { EmptyState, ErrorState, LoadingState } from '@/shared/components/StateFeedback'

export const EstudiantePublicacionesPage = () => {
  const {
    viewMode,
    isSearchOpen,
    searchText,
    searchInputRef,
    listItems,
    searchPublicationItems,
    selectedVacante,
    isLoading,
    isError,
    isApplying,
    appliedIds,
    feedback,
    openSearchMode,
    closeSearchMode,
    setSearchText,
    selectVacante,
    postular,
    clearFeedback,
  } = usePublicaciones()
  const toast = useAppToast()

  useEffect(() => {
    if (!feedback) return

    if (feedback.type === 'ok') {
      toast.success('Postulacion enviada', feedback.message)
    } else {
      toast.error('No se pudo postular', feedback.message)
    }

    clearFeedback()
  }, [clearFeedback, feedback, toast])

  const handleSelectFromSearch = (id: number) => {
    selectVacante(id)
    closeSearchMode()
  }

  return (
    <PageWrapper role="Estudiante">
      <div className="flex min-h-full flex-col bg-white text-[#1d2538]">
        <PublicacionesSearchHeader
          isSearchOpen={isSearchOpen}
          searchText={searchText}
          searchInputRef={searchInputRef}
          onOpenSearch={openSearchMode}
          onCloseSearch={closeSearchMode}
          onSearchChange={setSearchText}
        />

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center p-6">
            <LoadingState title="Cargando vacantes" message="Estamos consultando las oportunidades disponibles." />
          </div>
        ) : isError ? (
          <div className="flex flex-1 items-center justify-center p-6">
            <ErrorState title="No se pudieron cargar las vacantes" message="Intenta actualizar la pagina en unos segundos." />
          </div>
        ) : viewMode === 'detail' ? (
          <section className="grid min-h-0 flex-1 gap-4 px-6 py-5 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
            <PublicationDetail
              vacante={selectedVacante}
              onApply={postular}
              isApplying={isApplying}
              hasApplied={selectedVacante ? appliedIds.includes(selectedVacante.id) : false}
            />

            <aside className="publication-scroll h-full overflow-y-auto pr-1">
              <div className="space-y-3">
                {listItems.length === 0 ? (
                  <EmptyState title="No hay vacantes disponibles" message="Cuando una empresa publique una vacante activa aparecera aqui." />
                ) : (
                  listItems.map((item) => (
                    <JobListCard
                      key={item.id}
                      item={item}
                      isActive={selectedVacante?.id === item.id}
                      onSelect={selectVacante}
                    />
                  ))
                )}
              </div>
            </aside>
          </section>
        ) : (
          <section className="grid min-h-0 flex-1 gap-4 px-6 py-5 xl:grid-cols-[minmax(0,2fr)_minmax(260px,300px)]">
            <div className="publication-scroll h-full overflow-y-auto pr-1">
              <div className="space-y-5">
                {searchPublicationItems.length === 0 ? (
                  <EmptyState title="Sin resultados" message="Prueba con otro nombre de vacante, empresa o modalidad." />
                ) : (
                  searchPublicationItems.map((item) => (
                    <SearchPublicationCard key={item.id} item={item} onSelect={handleSelectFromSearch} />
                  ))
                )}
              </div>
            </div>

            <PublicacionesFilterPanel />
          </section>
        )}
      </div>
    </PageWrapper>
  )
}
