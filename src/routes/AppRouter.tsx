import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Main from '../pages/Main'
import Login from '../pages/Login'
import Register from '../pages/Register'

export default function AppRouter() {
  return (
    <div>
      <nav style={{padding: 12, borderBottom: '1px solid #e5e7eb'}}>
        <Link to="/" style={{marginRight:12}}>Main</Link>
        <Link to="/login" style={{marginRight:12}}>Login</Link>
  <Link to="/register">regiter</Link>
      </nav>
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
