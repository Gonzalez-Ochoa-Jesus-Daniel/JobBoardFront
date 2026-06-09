import { Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import AdminPageHeader from '@/features/administradores/components/AdminPageHeader'
import { APP_ICONS, APP_ICON_SIZE, APP_ICON_STROKE_WIDTH } from '@/config/iconConfig'
import { ROUTES } from '@/router/routes'

function DashboardHeader() {
  const currentTime = new Intl.DateTimeFormat('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date())

  return (
    <AdminPageHeader
      eyebrow="Panel general"
      title="Hola, Administrador"
      description="Consulta la operacion general y atiende primero los elementos que requieren una decision."
      Icon={APP_ICONS.dashboard}
      actions={
        <>
          <span className="admin-update-time">
            <Clock3 size={APP_ICON_SIZE} strokeWidth={APP_ICON_STROKE_WIDTH} />
            Actualizado {currentTime}
          </span>
          <Link className="admin-header-action" to={ROUTES.ADMIN_GESTION}>
            <APP_ICONS.management size={APP_ICON_SIZE} strokeWidth={APP_ICON_STROKE_WIDTH} />
            Usuarios
          </Link>
          <Link className="admin-header-action is-primary" to={ROUTES.ADMIN_VALIDACION}>
            <APP_ICONS.validation size={APP_ICON_SIZE} strokeWidth={APP_ICON_STROKE_WIDTH} />
            Revisar solicitudes
          </Link>
        </>
      }
    />
  )
}

export default DashboardHeader
