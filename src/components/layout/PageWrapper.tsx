import type { ReactNode } from 'react'
import { Sidebar, type SidebarAccount } from './Sidebar'
import type { UserRole } from '@/features/auth/types/auth.types'

interface PageWrapperProps {
  children: ReactNode
  role: UserRole
  account?: SidebarAccount
}

export const PageWrapper = ({ children, role, account }: PageWrapperProps) => {
  return (
    <div className="app-shell feature-shell">
      <Sidebar role={role} account={account} />
      <main className="content feature-content">{children}</main>
    </div>
  )
}
