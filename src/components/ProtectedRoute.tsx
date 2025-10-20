import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

interface ProtectedRouteProps {
  children: React.ReactNode
}

// 로그인이 필요한 페이지를 보호하는 컴포넌트
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn } = useAuthStore()
  const location = useLocation()

  if (!isLoggedIn) {
    // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
    // 현재 위치를 state로 전달하여 로그인 후 돌아올 수 있도록 함
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
