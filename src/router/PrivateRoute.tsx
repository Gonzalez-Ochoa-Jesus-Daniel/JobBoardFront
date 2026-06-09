import { Navigate } from 'react-router-dom'
import type { UserRole } from '@/features/auth/types/auth.types'
import { ROUTES } from './routes'

interface PrivateRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
}

const getRoleHome = (role: UserRole | null) => {
  if (role === 'Admin') return ROUTES.ADMIN_DASHBOARD
  if (role === 'Empresa') return ROUTES.EMPRESA_DASHBOARD
  if (role === 'Estudiante' || role === 'Egresado') return ROUTES.ESTUDIANTE_DASHBOARD
  return ROUTES.LOGIN
}

export const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('rol') as UserRole | null

  if (!token) return <Navigate to={ROUTES.LOGIN} replace />
  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    return <Navigate to={getRoleHome(role)} replace />
  }

  return <>{children}</>
}
