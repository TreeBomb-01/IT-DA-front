import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Main from '../pages/Main'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Contests from '../pages/Contests'
import Teambuilding from '../pages/Teambuilding'
import Community from '../pages/Community'
import MyPage from '../pages/MyPage'
import { useAuthStore } from '../store/useAuthStore'
import { useLogout } from '../api/userApi'

export default function AppRouter() {
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
        clearAuth()
        console.error('로그아웃 요청 실패:', error)
        navigate('/login')
      },
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <img src="/img/logo.png" alt="IT-DA 로고" className="h-10" />
            <span className="text-xl font-bold text-slate-800">IT-DA</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => navigate('/contests')}
              className="text-slate-600 hover:text-sky-600 transition-colors font-medium"
            >
              공모전/대회
            </button>
            <button
              onClick={() => navigate('/teambuilding')}
              className="text-slate-600 hover:text-sky-600 transition-colors font-medium"
            >
              팀빌딩
            </button>
            <button
              onClick={() => navigate('/community')}
              className="text-slate-600 hover:text-sky-600 transition-colors font-medium"
            >
              커뮤니티
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn && user ? (
              <>
                <span className="text-slate-600">
                  <span className="font-bold" style={{ color: '#4DB6AC' }}>{user.nickname}</span>님
                </span>
                <button
                  onClick={() => navigate('/mypage')}
                  className="text-slate-600 hover:text-sky-600 transition-colors"
                >
                  마이페이지
                </button>
                <button
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900 transition-all shadow-sm disabled:opacity-50"
                >
                  {logoutMutation.isPending ? '로그아웃 중...' : '로그아웃'}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-slate-600 hover:text-sky-600 transition-colors"
                >
                  로그인
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-all shadow-sm"
                >
                  회원가입
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/contests" element={<Contests/>} />
          <Route path="/teambuilding" element={<Teambuilding/>} />
          <Route path="/community" element={<Community/>} />
          <Route path="/mypage" element={<MyPage/>} />
        </Routes>
      </main>
    </div>
  )
}
