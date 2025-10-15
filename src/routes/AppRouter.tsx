import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Main from '../pages/Main'
import Login from '../pages/Login'
import Register from '../pages/Register'

export default function AppRouter() {
  return (
    <div>
      <header className="app-header">
        <div className="app-logo">
          <a href="/">
            <img src="/img/logo.png" alt="logo" style={{height:40}} />
          </a>
        </div>
        <nav className="app-nav">
          <Link to="/" className="nav-link">Main</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">regiter</Link>
        </nav>
      </header>
      <main style={{padding: 16}}>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </main>
    </div>
  )
}
