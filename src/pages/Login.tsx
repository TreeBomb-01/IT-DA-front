import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../api/userApi'
import { useAuthStore } from '../store/useAuthStore'

export default function Login() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')

  const loginMutation = useLogin()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요')
      return
    }

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          // Zustand store에 accessToken 저장 (자동으로 nickname 추출)
          setAuth(data.accessToken)
          
          setError('')
          alert('로그인 성공!')
          navigate('/') // 메인 페이지로 이동
        },
        onError: (error: any) => {
          setError(error.response?.data?.message || '로그인에 실패했습니다')
        },
      }
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-slate-200">
            {/* Header */}
            <div className="text-center mb-8">
              <img src="/img/logo.png" alt="IT-DA 로고" className="h-12 mx-auto" />
              <h1 className="text-2xl font-bold mt-4 text-slate-800">IT-DA에 오신 것을 환영합니다!</h1>
              <p className="text-slate-500 mt-2 text-sm">팀원과 프로젝트를 찾고 당신의 성장을 '잇다'</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full p-3 border border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                  placeholder="your@email.com"
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  비밀번호
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full p-3 border border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                  placeholder="********"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-slate-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">
                    로그인 상태 유지
                  </label>
                </div>
                <div className="text-sm">
                  <button
                    type="button"
                    onClick={() => {
                      // TODO: 비밀번호 찾기 기능
                      alert('비밀번호 찾기 기능은 준비 중입니다.')
                    }}
                    className="font-medium text-sky-600 hover:text-sky-500"
                  >
                    비밀번호를 잊으셨나요?
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="w-full bg-sky-500 text-white py-3 px-4 rounded-lg font-bold hover:bg-sky-600 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loginMutation.isPending ? '로그인 중...' : '로그인'}
                </button>
              </div>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center text-sm text-slate-500">
              <p>
                계정이 없으신가요?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="font-bold text-sky-600 hover:text-sky-500"
                >
                  회원가입
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
