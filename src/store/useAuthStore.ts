import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getNicknameFromToken } from '../utils/jwt'

type User = {
  nickname: string
} | null

type AuthState = {
  user: User
  accessToken: string | null
  isLoggedIn: boolean
  
  // Actions
  setAuth: (accessToken: string) => void
  clearAuth: () => void
  updateAccessToken: (accessToken: string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isLoggedIn: false,

      // 로그인 시 accessToken에서 nickname 추출하여 저장
      setAuth: (accessToken) => {
        const nickname = getNicknameFromToken(accessToken)
        
        if (nickname) {
          localStorage.setItem('accessToken', accessToken)
          set({ 
            user: { nickname }, 
            accessToken, 
            isLoggedIn: true 
          })
        } else {
          console.error('토큰에서 닉네임을 추출할 수 없습니다')
        }
      },

      // 로그아웃 시 모든 정보 초기화
      clearAuth: () => {
        localStorage.removeItem('accessToken')
        set({ 
          user: null, 
          accessToken: null, 
          isLoggedIn: false 
        })
      },

      // 액세스 토큰만 업데이트 (토큰 갱신 시 사용)
      updateAccessToken: (accessToken) => {
        const nickname = getNicknameFromToken(accessToken)
        
        if (nickname) {
          localStorage.setItem('accessToken', accessToken)
          set({ 
            user: { nickname },
            accessToken 
          })
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({ 
        user: state.user,
        isLoggedIn: state.isLoggedIn 
      }), // user와 isLoggedIn만 persist (accessToken은 localStorage에 별도 저장)
    }
  )
)
