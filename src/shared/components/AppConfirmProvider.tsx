import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { APP_ICONS, APP_ICON_STROKE_WIDTH } from '@/config/iconConfig'
import { ConfirmContext, type ConfirmOptions } from './appConfirmContext'
import './app-confirm.css'

type PendingConfirm = Required<ConfirmOptions>

const DEFAULT_CONFIRM: Required<ConfirmOptions> = {
  title: 'Confirmar accion',
  message: 'Esta accion necesita confirmacion.',
  confirmLabel: 'Confirmar',
  cancelLabel: 'Cancelar',
  tone: 'warning',
}

export const AppConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [pendingConfirm, setPendingConfirm] = useState<PendingConfirm | null>(null)
  const resolverRef = useRef<((value: boolean) => void) | null>(null)

  const close = useCallback((value: boolean) => {
    resolverRef.current?.(value)
    resolverRef.current = null
    setPendingConfirm(null)
  }, [])

  const confirm = useCallback((options: ConfirmOptions) => {
    setPendingConfirm({ ...DEFAULT_CONFIRM, ...options })

    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve
    })
  }, [])

  const value = useMemo(() => ({ confirm }), [confirm])
  const ToneIcon = pendingConfirm?.tone === 'danger' ? APP_ICONS.error : pendingConfirm?.tone === 'info' ? APP_ICONS.info : APP_ICONS.warning

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      {pendingConfirm ? (
        <div className="app-confirm-backdrop" role="presentation" onMouseDown={() => close(false)}>
          <section
            className={`app-confirm app-confirm--${pendingConfirm.tone}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="app-confirm-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="app-confirm__icon">
              <ToneIcon size={24} strokeWidth={APP_ICON_STROKE_WIDTH} />
            </div>
            <div className="app-confirm__content">
              <h2 id="app-confirm-title">{pendingConfirm.title}</h2>
              <p>{pendingConfirm.message}</p>
            </div>
            <div className="app-confirm__actions">
              <button type="button" className="app-confirm__cancel" onClick={() => close(false)}>
                {pendingConfirm.cancelLabel}
              </button>
              <button type="button" className="app-confirm__accept" onClick={() => close(true)}>
                {pendingConfirm.confirmLabel}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </ConfirmContext.Provider>
  )
}
