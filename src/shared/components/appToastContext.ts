import { createContext, useContext } from 'react'

export type ToastTone = 'success' | 'error' | 'warning' | 'info'

export type ToastInput = {
  title: string
  message?: string
  tone?: ToastTone
  duration?: number
}

export type ToastItem = Required<Omit<ToastInput, 'duration'>> & {
  id: number
}

export type ToastContextValue = {
  notify: (toast: ToastInput) => void
  success: (title: string, message?: string) => void
  error: (title: string, message?: string) => void
  warning: (title: string, message?: string) => void
  info: (title: string, message?: string) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export const useAppToast = () => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useAppToast debe usarse dentro de AppToastProvider')
  }

  return context
}
