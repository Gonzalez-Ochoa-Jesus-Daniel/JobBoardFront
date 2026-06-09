import { APP_ICONS, APP_ICON_STROKE_WIDTH } from '@/config/iconConfig'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type AppButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: AppButtonVariant
  icon?: ReactNode
  isLoading?: boolean
  fullWidth?: boolean
}

const variantClassNames: Record<AppButtonVariant, string> = {
  primary: 'border-transparent bg-emerald-500 text-white shadow-sm hover:bg-emerald-600',
  secondary: 'border-slate-200 bg-white text-slate-700 hover:border-emerald-200 hover:text-emerald-700',
  ghost: 'border-transparent bg-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900',
  danger: 'border-orange-100 bg-orange-50 text-orange-700 hover:bg-orange-100',
}

export const AppButton = ({
  children,
  className = '',
  disabled,
  fullWidth = false,
  icon,
  isLoading = false,
  type = 'button',
  variant = 'primary',
  ...props
}: AppButtonProps) => (
  <button
    type={type}
    disabled={disabled || isLoading}
    className={[
      'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-55',
      fullWidth ? 'w-full' : '',
      variantClassNames[variant],
      className,
    ].filter(Boolean).join(' ')}
    {...props}
  >
    {isLoading ? (
      <APP_ICONS.loading className="animate-spin" size={18} strokeWidth={APP_ICON_STROKE_WIDTH} />
    ) : (
      icon
    )}
    <span>{children}</span>
  </button>
)
