import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { APP_ICONS, APP_ICON_SIZE, APP_ICON_STROKE_WIDTH } from '@/config/iconConfig'
import { ROUTES } from '@/router/routes'
import { useEmpresaPerfil } from '../hooks/useEmpresa'

interface EmpresaLayoutProps {
  children: ReactNode
}

export const EmpresaLayout = ({ children }: EmpresaLayoutProps) => {
  const navigate = useNavigate()
  const { data: perfil } = useEmpresaPerfil()
  const companyName = perfil?.nombreEmpresa ?? 'Empresa'
  const companyEmail = perfil?.correoEmpresa ?? perfil?.email ?? 'Perfil empresarial'

  return (
    <PageWrapper
      role="Empresa"
      account={{
        title: companyName,
        subtitle: companyEmail,
        icon: APP_ICONS.company,
      }}
    >
      <div className="empresa-workspace">
        <header className="empresa-topbar">
          <div className="min-w-0">
            <p className="empresa-topbar-label">Espacio de empresa</p>
            <p className="empresa-topbar-title">{companyName}</p>
          </div>

          <div className="empresa-topbar-actions">
            <button type="button" className="empresa-icon-button" aria-label="Ver notificaciones">
              <APP_ICONS.notifications
                size={APP_ICON_SIZE}
                strokeWidth={APP_ICON_STROKE_WIDTH}
              />
            </button>
            <button
              type="button"
              onClick={() => navigate(ROUTES.EMPRESA_CREAR_VACANTE)}
              className="empresa-primary-action"
            >
              <APP_ICONS.create size={APP_ICON_SIZE} strokeWidth={APP_ICON_STROKE_WIDTH} />
              <span>Publicar vacante</span>
            </button>
          </div>
        </header>

        <div className="empresa-content">
          {children}
        </div>
      </div>
    </PageWrapper>
  )
}
