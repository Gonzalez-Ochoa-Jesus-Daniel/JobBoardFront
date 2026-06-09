import type { LucideIcon } from 'lucide-react'
import { ArrowLeft, Clock3, ShieldCheck } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import campusImg from '@/assets/images/campus.png'
import logoBlanco from '@/assets/images/logoblanco.png'
import { APP_ICON_STROKE_WIDTH } from '@/config/iconConfig'
import { ROUTES } from '@/router/routes'
import './auth-flow.css'

type PasswordRecoveryShellProps = {
  children: ReactNode
  description: string
  eyebrow: string
  icon: LucideIcon
  title: string
}

export const PasswordRecoveryShell = ({
  children,
  description,
  eyebrow,
  icon: Icon,
  title,
}: PasswordRecoveryShellProps) => (
  <main
    className="auth-recovery-screen"
    style={{ backgroundImage: `url(${campusImg})` }}
  >
    <div className="auth-recovery-overlay">
      <section className="auth-recovery-brand" aria-label="Bolsa de Trabajo UTTECAM">
        <img src={logoBlanco} alt="UTTecam" />

        <div>
          <p>Recuperación de acceso</p>
          <h2>Tu cuenta vuelve a estar bajo tu control.</h2>
        </div>

        <div className="auth-recovery-security">
          <span>
            <Clock3 size={18} strokeWidth={APP_ICON_STROKE_WIDTH} />
            Enlace temporal
          </span>
          <span>
            <ShieldCheck size={18} strokeWidth={APP_ICON_STROKE_WIDTH} />
            Uso único
          </span>
        </div>
      </section>

      <section className="auth-recovery-card">
        <div className="auth-recovery-card-top">
          <Link to={ROUTES.LOGIN} className="auth-back-button" aria-label="Volver al inicio de sesión">
            <ArrowLeft size={19} strokeWidth={APP_ICON_STROKE_WIDTH} />
          </Link>
          <img
            src="/logouttecam-removebg-preview.png"
            alt="UTTecam"
            className="auth-recovery-mobile-logo"
          />
        </div>

        <div className="auth-recovery-heading">
          <span className="auth-recovery-heading-icon">
            <Icon size={24} strokeWidth={APP_ICON_STROKE_WIDTH} />
          </span>
          <div>
            <p>{eyebrow}</p>
            <h1>{title}</h1>
          </div>
        </div>

        <p className="auth-recovery-description">{description}</p>
        {children}
      </section>
    </div>
  </main>
)
