import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../api/userApi'
import { useAuthStore } from '../store/useAuthStore'

export default function LogoutButton() {
  const navigate = useNavigate()
  const { clearAuth, user } = useAuthStore()
  const logoutMutation = useLogout()

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        // Zustand store 초기화 (localStorage에서 accessToken 제거 포함)
        clearAuth()
        alert('로그아웃되었습니다.')
        navigate('/login')
      },
      onError: (error: any) => {
        // 에러가 발생해도 클라이언트 측 정보는 삭제
        clearAuth()
        console.error('로그아웃 요청 실패:', error)
        navigate('/login')
      },
    })
  }

  if (!user) {
    return null
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span>
        <strong style={{ color: '#4DB6AC' }}>{user.nickname}</strong>님
      </span>
      <button
        onClick={handleLogout}
        disabled={logoutMutation.isPending}
        style={{
          padding: '8px 16px',
          cursor: logoutMutation.isPending ? 'not-allowed' : 'pointer',
          opacity: logoutMutation.isPending ? 0.6 : 1,
        }}
      >
        {logoutMutation.isPending ? '로그아웃 중...' : '로그아웃'}
      </button>
    </div>
  )
}
