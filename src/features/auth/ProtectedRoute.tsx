import { Navigate } from 'react-router'

import { useAuthStore } from '@/app/store/auth'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {
  const user = useAuthStore((s) => s.user)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}