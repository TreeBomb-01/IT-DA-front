import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Main from '../pages/Main'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Contests from '../pages/Contests'
import Teambuilding from '../pages/Teambuilding'
import Community from '../pages/Community'
import MyPage from '../pages/MyPage'
import { useAuthStore } from '../store/useAuthStore'

export default function AppRouter() {
  const { user, logout } = useAuthStore()

  return (
    <div>
      {/* Thin top banner with auth links */}
      <div className="top-banner">
        <div className="top-banner-inner">
          <div />
          <div className="top-links">
            {user ? (
              <>
                <span className="greeting">{user.name}님 안녕하세요</span>
                <Link to="/mypage" className="top-link">MyPage</Link>
                <button className="top-link btn-logout" onClick={logout}>로그아웃</button>
              </>
            ) : (
              <>
                <Link to="/login" className="top-link">로그인</Link>
                <Link to="/register" className="top-link">회원가입</Link>
              </>
            )}
          </div>
        </div>
      </div>
      <header className="app-header">
        <div className="app-left">
          <div className="app-logo">
            <a href="/">
              <img src="/img/logo.png" alt="logo" />
            </a>
          </div>
          <div className="site-title">IT-DA</div>
          <nav className="main-menu">
            <Link to="/contests" className="menu-link">공모전/대회</Link>
            <Link to="/teambuilding" className="menu-link">팀빌딩</Link>
            <Link to="/community" className="menu-link">커뮤니티</Link>
          </nav>
        </div>

        <div className="app-nav">
          {/* auth handled in top-banner; main header right side intentionally empty */}
        </div>
      </header>
      <main style={{padding: 16}}>
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
