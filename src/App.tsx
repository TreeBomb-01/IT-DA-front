import React, { useEffect } from 'react'
import AppRouter from './routes/AppRouter'
import { useAuthStore } from './store/useAuthStore'

export default function App() {
  const { updateAccessToken, clearAuth } = useAuthStore()

  // 앱 시작 시 localStorage에서 accessToken 복원
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      updateAccessToken(token)
    }
  }, [updateAccessToken])

  // RefreshToken 만료 시 로그아웃 이벤트 리스너
  useEffect(() => {
    const handleLogout = () => {
      clearAuth()
    }

    window.addEventListener('auth:logout', handleLogout)
    
    return () => {
      window.removeEventListener('auth:logout', handleLogout)
    }
  }, [clearAuth])

  return <AppRouter />
}
