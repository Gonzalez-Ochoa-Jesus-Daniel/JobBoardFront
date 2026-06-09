import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { APP_ICONS, APP_ICON_STROKE_WIDTH } from '@/config/iconConfig'
import { ToastContext, type ToastContextValue, type ToastInput, type ToastItem } from './appToastContext'
import './app-toast.css'

const iconByTone = {
  success: APP_ICONS.success,
  error: APP_ICONS.error,
  warning: APP_ICONS.warning,
  info: APP_ICONS.info,
}

export const AppToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const removeToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const notify = useCallback((toast: ToastInput) => {
    const id = Date.now() + Math.floor(Math.random() * 1000)
    const duration = toast.duration ?? 4200
    const nextToast: ToastItem = {
      id,
      tone: toast.tone ?? 'info',
      title: toast.title,
      message: toast.message ?? '',
    }

    setToasts((current) => [...current, nextToast].slice(-4))
    window.setTimeout(() => removeToast(id), duration)
  }, [removeToast])

  const value = useMemo<ToastContextValue>(() => ({
    notify,
    success: (title, message) => notify({ title, message, tone: 'success' }),
    error: (title, message) => notify({ title, message, tone: 'error' }),
    warning: (title, message) => notify({ title, message, tone: 'warning' }),
    info: (title, message) => notify({ title, message, tone: 'info' }),
  }), [notify])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="app-toast-region" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => {
          const Icon = iconByTone[toast.tone]

          return (
            <article className={`app-toast app-toast--${toast.tone}`} key={toast.id}>
              <span className="app-toast__icon">
                <Icon size={19} strokeWidth={APP_ICON_STROKE_WIDTH} />
              </span>
              <div className="app-toast__copy">
                <strong>{toast.title}</strong>
                {toast.message ? <p>{toast.message}</p> : null}
              </div>
              <button type="button" onClick={() => removeToast(toast.id)} aria-label="Cerrar alerta">
                <APP_ICONS.close size={17} strokeWidth={APP_ICON_STROKE_WIDTH} />
              </button>
            </article>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}
