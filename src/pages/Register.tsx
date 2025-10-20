import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useCheckEmailDuplicate,
  useSendVerificationCode,
  useVerifyCode,
  useSignUp,
} from '../api/userApi'
import { useAuthStore } from '../store/useAuthStore'

export default function Register() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [ticket, setTicket] = useState('')

  const [isEmailChecked, setIsEmailChecked] = useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [isCodeSent, setIsCodeSent] = useState(false)

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [codeError, setCodeError] = useState('')

  const [verificationTimeLeft, setVerificationTimeLeft] = useState(0)
  const [resendCooldown, setResendCooldown] = useState(0)
  const verificationTimerRef = useRef<number | null>(null)
  const resendTimerRef = useRef<number | null>(null)

  // Mutation hooks
  const checkEmailMutation = useCheckEmailDuplicate()
  const sendCodeMutation = useSendVerificationCode()
  const verifyCodeMutation = useVerifyCode()
  const signUpMutation = useSignUp()

  // 타이머 정리
  useEffect(() => {
    return () => {
      if (verificationTimerRef.current) {
        clearInterval(verificationTimerRef.current)
      }
      if (resendTimerRef.current) {
        clearInterval(resendTimerRef.current)
      }
    }
  }, [])

  // 인증코드 입력 제한시간 타이머 시작 (5분)
  const startVerificationTimer = () => {
    if (verificationTimerRef.current) clearInterval(verificationTimerRef.current)
    setVerificationTimeLeft(300)
    verificationTimerRef.current = window.setInterval(() => {
      setVerificationTimeLeft((prev) => {
        if (prev <= 1) {
          if (verificationTimerRef.current) clearInterval(verificationTimerRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // 재전송 쿨타임 타이머 시작 (1분)
  const startResendCooldown = () => {
    if (resendTimerRef.current) clearInterval(resendTimerRef.current)
    setResendCooldown(60)
    resendTimerRef.current = window.setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          if (resendTimerRef.current) clearInterval(resendTimerRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // 시간 포맷팅 (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // 이메일 중복 확인
  const handleCheckEmailDuplicate = () => {
    if (!email) {
      setEmailError('이메일을 입력해주세요')
      return
    }
    checkEmailMutation.mutate(email, {
      onSuccess: () => {
        setIsEmailChecked(true)
        setEmailError('')
        alert('사용 가능한 이메일입니다.')
      },
      onError: (error) => {
        setEmailError(error.message || '이미 사용 중인 이메일입니다.')
        setIsEmailChecked(false)
      },
    })
  }

  // 인증코드 전송
  const handleSendVerificationCode = () => {
    if (!isEmailChecked) {
      alert('이메일 중복 확인을 먼저 진행해주세요')
      return
    }
    sendCodeMutation.mutate(email, {
      onSuccess: () => {
        setIsCodeSent(true)
        setCodeError('')
        setVerificationCode('')
        startVerificationTimer()
        startResendCooldown()
        alert('인증코드가 전송되었습니다.')
      },
      onError: (error) => {
        setCodeError(error.message || '인증코드 전송에 실패했습니다.')
      },
    })
  }

  // 인증코드 확인
  const handleVerifyCode = () => {
    if (!verificationCode) {
      setCodeError('인증코드를 입력해주세요')
      return
    }
    verifyCodeMutation.mutate(
      { email, code: verificationCode },
      {
        onSuccess: (data) => {
          if (verificationTimerRef.current) clearInterval(verificationTimerRef.current)
          setVerificationTimeLeft(0)
          
          setTicket(data.ticket)
          setIsEmailVerified(true)
          setCodeError('')
          alert('이메일 인증이 완료되었습니다.')
        },
        onError: (error) => {
          setCodeError(error.message || '인증코드가 일치하지 않습니다.')
          setIsEmailVerified(false)
        },
      }
    )
  }

  // 비밀번호 확인 체크
  const checkPasswordMatch = () => {
    if (password && passwordConfirm && password !== passwordConfirm) {
      setPasswordError('비밀번호가 일치하지 않습니다')
      return false
    }
    setPasswordError('')
    return true
  }

  // 회원가입 제출
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !password || !passwordConfirm) {
      alert('모든 항목을 입력해주세요')
      return
    }
    if (!isEmailVerified) {
      alert('이메일 인증을 완료해주세요')
      return
    }
    if (!checkPasswordMatch()) {
      return
    }

    signUpMutation.mutate(
      { name, email, password: password, ticket },
      {
        onSuccess: (data) => {
          // 회원가입 성공 후 로그인 페이지로 이동
          alert('회원가입이 완료되었습니다! 로그인해주세요.')
          navigate('/login')
          
          // 또는 회원가입 후 자동 로그인을 원하면:
          // if (data.accessToken) {
          //   setAuth({ id: data.userId, name, email }, data.accessToken)
          //   navigate('/')
          // }
        },
        onError: (error) => {
          alert(`회원가입에 실패했습니다: ${error.message}`)
        },
      }
    )
  }

  return (
    <div style={{maxWidth:480, padding:20}}>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        {/* 이름 입력 */}
        <div style={{marginBottom:16}}>
          <label style={{display:'block', marginBottom:4}}>이름</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{width:'100%', padding:8, boxSizing:'border-box'}} 
          />
        </div>

        {/* 이메일 입력 및 중복 확인 */}
        <div style={{marginBottom:16}}>
          <label style={{display:'block', marginBottom:4}}>이메일</label>
          <div style={{display:'flex', gap:8}}>
            <input 
              type="email" 
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setIsEmailChecked(false)
                setIsCodeSent(false)
                setIsEmailVerified(false)
              }}
              style={{flex:1, padding:8, boxSizing:'border-box'}} 
              disabled={isEmailVerified}
            />
            <button 
              type="button"
              onClick={handleCheckEmailDuplicate}
              disabled={isEmailVerified || checkEmailMutation.isPending}
              style={{padding:'8px 16px', whiteSpace:'nowrap'}}
            >
              {checkEmailMutation.isPending ? '확인 중...' : '중복 확인'}
            </button>
          </div>
          {emailError && <p style={{color:'red', fontSize:12, margin:'4px 0 0 0'}}>{emailError}</p>}
          {isEmailChecked && !emailError && (
            <p style={{color:'green', fontSize:12, margin:'4px 0 0 0'}}>✓ 사용 가능한 이메일입니다</p>
          )}
        </div>

        {/* 인증코드 전송 */}
        {isEmailChecked && !isEmailVerified && (
          <div style={{marginBottom:16}}>
            <button 
              type="button"
              onClick={handleSendVerificationCode}
              disabled={resendCooldown > 0 || sendCodeMutation.isPending}
              style={{
                padding:'8px 16px', 
                width:'100%', 
                marginBottom:8,
                cursor: (resendCooldown > 0 || sendCodeMutation.isPending) ? 'not-allowed' : 'pointer',
                opacity: (resendCooldown > 0 || sendCodeMutation.isPending) ? 0.6 : 1
              }}
            >
              {sendCodeMutation.isPending 
                ? '전송 중...'
                : resendCooldown > 0 
                  ? `재전송 대기 중 (${formatTime(resendCooldown)})` 
                  : isCodeSent 
                    ? '인증코드 재전송' 
                    : '인증코드 받기'
              }
            </button>
          </div>
        )}

        {/* 인증코드 입력 */}
        {isCodeSent && !isEmailVerified && (
          <div style={{marginBottom:16}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4}}>
              <label style={{display:'block'}}>인증코드</label>
              {verificationTimeLeft > 0 && (
                <span style={{
                  fontSize:14, 
                  color: verificationTimeLeft <= 60 ? 'red' : '#666',
                  fontWeight: verificationTimeLeft <= 60 ? 'bold' : 'normal'
                }}>
                  ⏱ {formatTime(verificationTimeLeft)}
                </span>
              )}
            </div>
            <div style={{display:'flex', gap:8}}>
              <input 
                type="text" 
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="인증코드를 입력하세요"
                style={{flex:1, padding:8, boxSizing:'border-box'}} 
              />
              <button 
                type="button"
                onClick={handleVerifyCode}
                disabled={verifyCodeMutation.isPending}
                style={{padding:'8px 16px', whiteSpace:'nowrap'}}
              >
                {verifyCodeMutation.isPending ? '확인 중...' : '확인'}
              </button>
            </div>
            {codeError && <p style={{color:'red', fontSize:12, margin:'4px 0 0 0'}}>{codeError}</p>}
            {verificationTimeLeft === 0 && isCodeSent && !isEmailVerified && <p style={{color:'orange', fontSize:12, margin:'4px 0 0 0'}}>⚠ 인증 시간이 만료되었습니다. 인증코드를 재전송해주세요.</p>}
          </div>
        )}

        {isEmailVerified && (
          <div style={{marginBottom:16}}>
            <p style={{color:'green', fontSize:14}}>✓ 이메일 인증이 완료되었습니다</p>
          </div>
        )}

        {/* 비밀번호 입력 */}
        <div style={{marginBottom:16}}>
          <label style={{display:'block', marginBottom:4}}>비밀번호</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={checkPasswordMatch}
            style={{width:'100%', padding:8, boxSizing:'border-box'}} 
          />
        </div>

        {/* 비밀번호 확인 */}
        <div style={{marginBottom:16}}>
          <label style={{display:'block', marginBottom:4}}>비밀번호 확인</label>
          <input 
            type="password" 
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            onBlur={checkPasswordMatch}
            style={{width:'100%', padding:8, boxSizing:'border-box'}} 
          />
          {passwordError && <p style={{color:'red', fontSize:12, margin:'4px 0 0 0'}}>{passwordError}</p>}
          {password && passwordConfirm && !passwordError && (
            <p style={{color:'green', fontSize:12, margin:'4px 0 0 0'}}>✓ 비밀번호가 일치합니다</p>
          )}
        </div>

        <button 
          type="submit"
          disabled={signUpMutation.isPending || !isEmailVerified}
          style={{
            width:'100%', 
            padding:'12px', 
            fontSize:16, 
            cursor: (signUpMutation.isPending || !isEmailVerified) ? 'not-allowed' : 'pointer',
            opacity: (signUpMutation.isPending || !isEmailVerified) ? 0.6 : 1
          }}
        >
          {signUpMutation.isPending ? '가입 진행 중...' : '회원가입'}
        </button>
      </form>
    </div>
  )
}
