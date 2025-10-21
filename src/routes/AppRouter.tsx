import React from 'react'
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import Main from '../pages/Main'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Projects from '../pages/Projects'
import Contests from '../pages/Contests'
import Teambuilding from '../pages/Teambuilding'
import Community from '../pages/Community'
import MyPage from '../pages/MyPage'
import { useAuthStore } from '../store/useAuthStore'
import { useLogout } from '../api/userApi'

export default function AppRouter() {
  const navigate = useNavigate()
  const location = useLocation()
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
              onClick={() => navigate('/projects')}
              className={`transition-colors pb-1 ${
                location.pathname === '/projects' 
                  ? 'text-sky-600 font-bold border-b-2 border-sky-600' 
                  : 'text-slate-600 hover:text-sky-600'
              }`}
            >
              프로젝트 찾기
            </button>
            <button
              onClick={() => navigate('/teambuilding')}
              className={`transition-colors pb-1 ${
                location.pathname === '/teambuilding' 
                  ? 'text-sky-600 font-bold border-b-2 border-sky-600' 
                  : 'text-slate-600 hover:text-sky-600'
              }`}
            >
              팀원 찾아보기
            </button>
            <button
              onClick={() => navigate('/contests')}
              className={`transition-colors pb-1 ${
                location.pathname === '/contests' 
                  ? 'text-sky-600 font-bold border-b-2 border-sky-600' 
                  : 'text-slate-600 hover:text-sky-600'
              }`}
            >
              공모전 정보
            </button>
            <button
              onClick={() => navigate('/community')}
              className={`transition-colors pb-1 ${
                location.pathname === '/community' 
                  ? 'text-sky-600 font-bold border-b-2 border-sky-600' 
                  : 'text-slate-600 hover:text-sky-600'
              }`}
            >
              포트폴리오
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
          <Route path="/projects" element={<Projects/>} />
          <Route path="/contests" element={<Contests/>} />
          <Route path="/teambuilding" element={<Teambuilding/>} />
          <Route path="/community" element={<Community/>} />
          <Route path="/mypage" element={<MyPage/>} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white mt-16">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2">IT-DA</h3>
              <p className="text-slate-400">
                성장하는 개발자와 디자이너를 위한
                <br /> 최고의 협업 커뮤니티
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">바로가기</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <button onClick={() => navigate('/projects')} className="hover:text-white">
                    프로젝트 찾기
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/teambuilding')} className="hover:text-white">
                    팀원 찾기
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/contests')} className="hover:text-white">
                    공모전
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/')} className="hover:text-white">
                    서비스 소개
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">고객지원</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <button onClick={() => {}} className="hover:text-white">
                    이용약관
                  </button>
                </li>
                <li>
                  <button onClick={() => {}} className="hover:text-white">
                    개인정보처리방침
                  </button>
                </li>
                <li>
                  <button onClick={() => {}} className="hover:text-white">
                    문의하기
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-700 pt-8 text-center text-slate-500 text-sm">
            &copy; 2025 IT-DA. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
