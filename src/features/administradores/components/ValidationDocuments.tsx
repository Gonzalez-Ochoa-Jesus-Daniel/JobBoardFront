import { ExternalLink, FileText, ImageOff } from 'lucide-react'
import { APP_ICON_SIZE, APP_ICON_STROKE_WIDTH } from '@/config/iconConfig'
import { EmptyState, ErrorState, LoadingState } from '@/shared/components/StateFeedback'
import type { ValidationDocument } from '../types/admin.types'

type ValidationDocumentsProps = {
  documentos: ValidationDocument[]
  isError: boolean
  isLoading: boolean
}

function ValidationDocuments({ documentos, isError, isLoading }: ValidationDocumentsProps) {
  if (isLoading) {
    return (
      <LoadingState
        compact
        title="Cargando documentos"
        message="Consultando archivos de validacion."
      />
    )
  }

  if (isError) {
    return (
      <ErrorState
        compact
        title="No se pudieron cargar los documentos"
        message="Intenta abrir el detalle nuevamente."
      />
    )
  }

  const uploadedDocuments = documentos.filter((documento) => Boolean(documento.url))
  if (!uploadedDocuments.length) {
    return (
      <EmptyState
        compact
        title="Sin documentos cargados"
        message="Este usuario todavia no tiene archivos disponibles para revisar."
      />
    )
  }

  return (
    <div className="validation-documents-grid">
      {documentos.map((documento) => (
        <article className="validation-document-card" key={documento.tipo}>
          <small>{documento.tipo}</small>

          {!documento.url ? (
            <span className="validation-document-empty">
              <ImageOff size={APP_ICON_SIZE} strokeWidth={APP_ICON_STROKE_WIDTH} />
              No cargado
            </span>
          ) : documento.categoria === 'imagen' ? (
            <a
              className="validation-document-image"
              href={documento.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir ${documento.tipo} en una pestaña nueva`}
            >
              <img src={documento.url} alt={documento.tipo} loading="lazy" />
            </a>
          ) : (
            <a
              className="validation-document-link"
              href={documento.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText size={APP_ICON_SIZE} strokeWidth={APP_ICON_STROKE_WIDTH} />
              Ver PDF
              <ExternalLink size={14} strokeWidth={APP_ICON_STROKE_WIDTH} />
            </a>
          )}
        </article>
      ))}
    </div>
  )
}

export default ValidationDocuments
