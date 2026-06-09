import { APP_ICONS, APP_ICON_STROKE_WIDTH } from '@/config/iconConfig'
import type { ReactNode } from 'react'
import './state-feedback.css'

type StateFeedbackProps = {
  title: string
  message?: string
  action?: ReactNode
  compact?: boolean
}

export const LoadingState = ({ title = 'Cargando informacion', message, compact = false }: Partial<StateFeedbackProps>) => (
  <section className={`state-feedback ${compact ? 'is-compact' : ''}`} aria-live="polite">
    <span className="state-feedback__icon is-loading">
      <APP_ICONS.loading size={23} strokeWidth={APP_ICON_STROKE_WIDTH} />
    </span>
    <h2>{title}</h2>
    {message ? <p>{message}</p> : null}
  </section>
)

export const EmptyState = ({ title, message, action, compact = false }: StateFeedbackProps) => (
  <section className={`state-feedback ${compact ? 'is-compact' : ''}`}>
    <span className="state-feedback__icon">
      <APP_ICONS.info size={23} strokeWidth={APP_ICON_STROKE_WIDTH} />
    </span>
    <h2>{title}</h2>
    {message ? <p>{message}</p> : null}
    {action ? <div className="state-feedback__action">{action}</div> : null}
  </section>
)

export const ErrorState = ({ title = 'No se pudo cargar la informacion', message, action, compact = false }: Partial<StateFeedbackProps>) => (
  <section className={`state-feedback is-error ${compact ? 'is-compact' : ''}`} role="alert">
    <span className="state-feedback__icon">
      <APP_ICONS.error size={23} strokeWidth={APP_ICON_STROKE_WIDTH} />
    </span>
    <h2>{title}</h2>
    {message ? <p>{message}</p> : null}
    {action ? <div className="state-feedback__action">{action}</div> : null}
  </section>
)
