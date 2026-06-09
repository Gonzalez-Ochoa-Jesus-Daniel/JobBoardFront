import { RotateCw } from 'lucide-react'
import { AppButton } from '@/shared/components/AppButton'
import { EmptyState, ErrorState, LoadingState } from '@/shared/components/StateFeedback'

type AdminPageStateProps = {
  type: 'loading' | 'error' | 'empty'
  title?: string
  message?: string
  onRetry?: () => void
}

function AdminPageState({ type, title, message, onRetry }: AdminPageStateProps) {
  if (type === 'loading') {
    return (
      <LoadingState
        title={title ?? 'Cargando informacion'}
        message={message ?? 'Consultando los datos mas recientes del sistema.'}
      />
    )
  }

  if (type === 'error') {
    return (
      <ErrorState
        title={title ?? 'No se pudo cargar esta vista'}
        message={message ?? 'Revisa la conexion e intenta nuevamente.'}
        action={
          onRetry ? (
            <AppButton variant="secondary" icon={<RotateCw size={17} />} onClick={onRetry}>
              Reintentar
            </AppButton>
          ) : undefined
        }
      />
    )
  }

  return (
    <EmptyState
      title={title ?? 'No hay informacion para mostrar'}
      message={message ?? 'Cuando existan registros apareceran en este apartado.'}
      compact
    />
  )
}

export default AdminPageState
