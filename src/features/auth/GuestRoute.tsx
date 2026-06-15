import { Navigate } from 'react-router'
import type { ReactNode } from 'react'
import { useAuthStore } from '@/app/store/auth'

type Props = {
    children: ReactNode
}

export const GuestRoute = ({ children }: Props) => {
    const token = useAuthStore((s) => s.token)

    if (token) {
        return <Navigate to="/" replace />
    }

    return children
}