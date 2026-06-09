import { createContext, useContext } from 'react'

export type ConfirmTone = 'warning' | 'danger' | 'info'

export type ConfirmOptions = {
  title: string
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  tone?: ConfirmTone
}

export type ConfirmContextValue = {
  confirm: (options: ConfirmOptions) => Promise<boolean>
}

export const ConfirmContext = createContext<ConfirmContextValue | null>(null)

export const useConfirmDialog = () => {
  const context = useContext(ConfirmContext)

  if (!context) {
    throw new Error('useConfirmDialog debe usarse dentro de AppConfirmProvider')
  }

  return context
}
