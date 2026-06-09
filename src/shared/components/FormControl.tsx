import type { ReactNode } from 'react'

type FormControlProps = {
  children: ReactNode
  error?: string
  help?: string
  htmlFor?: string
  label: string
}

export const FORM_FIELD_CLASS =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100'

export const FormControl = ({ children, error, help, htmlFor, label }: FormControlProps) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={htmlFor} className="text-sm font-bold text-slate-600">
      {label}
    </label>
    {children}
    {error ? <p className="text-xs font-semibold text-red-600">{error}</p> : null}
    {help ? <p className="text-xs text-slate-500">{help}</p> : null}
  </div>
)
