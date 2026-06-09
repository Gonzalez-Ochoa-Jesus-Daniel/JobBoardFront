import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { APP_ICON_STROKE_WIDTH } from '@/config/iconConfig'

type AdminPageHeaderProps = {
  title: string
  description: string
  eyebrow?: string
  Icon: LucideIcon
  actions?: ReactNode
}

function AdminPageHeader({
  title,
  description,
  eyebrow = 'Administracion',
  Icon,
  actions,
}: AdminPageHeaderProps) {
  return (
    <header className="admin-page-header">
      <div className="admin-page-header__main">
        <span className="admin-page-header__icon" aria-hidden="true">
          <Icon size={22} strokeWidth={APP_ICON_STROKE_WIDTH} />
        </span>

        <div>
          <p className="admin-page-header__eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="admin-page-header__description">{description}</p>
        </div>
      </div>

      {actions ? <div className="admin-page-header__actions">{actions}</div> : null}
    </header>
  )
}

export default AdminPageHeader
