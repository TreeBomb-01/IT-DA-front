import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../api/userApi'
import { useAuthStore } from '../store/useAuthStore'

export default function Login() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
    <div style={{maxWidth:480, padding:20}}>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div style={{marginBottom:16}}>
          <label style={{display:'block', marginBottom:4}}>이메일</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{width:'100%', padding:8, boxSizing:'border-box'}} 
          />
        </div>
        <div style={{marginBottom:16}}>
          <label style={{display:'block', marginBottom:4}}>비밀번호</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{width:'100%', padding:8, boxSizing:'border-box'}} 
          />
        </div>
        
        {error && <p style={{color:'red', fontSize:12, marginBottom:12}}>{error}</p>}
        
        <button 
          type="submit"
          disabled={loginMutation.isPending}
          style={{
            width:'100%', 
            padding:'12px', 
            fontSize:16, 
            cursor: loginMutation.isPending ? 'not-allowed' : 'pointer',
            opacity: loginMutation.isPending ? 0.6 : 1
          }}
        >
          {loginMutation.isPending ? '로그인 중...' : '로그인'}
        </button>
      </form>
      
      <div style={{marginTop:16, textAlign:'center'}}>
        <button 
          type="button"
          onClick={() => navigate('/register')}
          style={{
            background:'none',
            border:'none',
            color:'#007bff',
            cursor:'pointer',
            textDecoration:'underline'
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  )
}
