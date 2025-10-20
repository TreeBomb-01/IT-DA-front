import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { useLogout } from '../api/userApi'

export default function Navigation() {
  const navigate = useNavigate()
  const { user, isLoggedIn, clearAuth } = useAuthStore()
  const logoutMutation = useLogout()

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
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

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 32px',
      borderBottom: '1px solid #e0e0e0',
      backgroundColor: '#fff'
    }}>
      {/* 로고/홈 버튼 */}
      <div>
        <button
          onClick={() => navigate('/')}
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          IT-DA
        </button>
      </div>

      {/* 로그인 상태에 따른 메뉴 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {isLoggedIn ? (
          // 로그인된 경우
          <>
            <span style={{ color: '#333' }}>
              환영합니다, <strong style={{ color: '#4DB6AC' }}>{user?.nickname}</strong>님!
            </span>
            <button
              onClick={() => navigate('/mypage')}
              style={{
                padding: '8px 16px',
                background: 'none',
                border: '1px solid #333',
                cursor: 'pointer',
                borderRadius: 4
              }}
            >
              마이페이지
            </button>
            <button
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              style={{
                padding: '8px 16px',
                background: '#333',
                color: '#fff',
                border: 'none',
                cursor: logoutMutation.isPending ? 'not-allowed' : 'pointer',
                borderRadius: 4,
                opacity: logoutMutation.isPending ? 0.6 : 1
              }}
            >
              {logoutMutation.isPending ? '로그아웃 중...' : '로그아웃'}
            </button>
          </>
        ) : (
          // 로그인되지 않은 경우
          <>
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: '8px 16px',
                background: 'none',
                border: '1px solid #333',
                cursor: 'pointer',
                borderRadius: 4
              }}
            >
              로그인
            </button>
            <button
              onClick={() => navigate('/register')}
              style={{
                padding: '8px 16px',
                background: '#333',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                borderRadius: 4
              }}
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </nav>
  )
}
