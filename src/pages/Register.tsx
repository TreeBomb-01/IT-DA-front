import React, { useState, useEffect, useRef } from 'react'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  
  const [isEmailChecked, setIsEmailChecked] = useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [isCodeSent, setIsCodeSent] = useState(false)
  
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [codeError, setCodeError] = useState('')
  
  const [verificationTimeLeft, setVerificationTimeLeft] = useState(0) // 인증코드 입력 제한시간 (5분)
  const [resendCooldown, setResendCooldown] = useState(0) // 재전송 쿨타임 (1분)
  const verificationTimerRef = useRef<number | null>(null)
  const resendTimerRef = useRef<number | null>(null)

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
    // 기존 타이머가 있으면 정리
    if (verificationTimerRef.current) {
      clearInterval(verificationTimerRef.current)
    }

    // 5분(300초) 설정
    setVerificationTimeLeft(300)

    verificationTimerRef.current = window.setInterval(() => {
      setVerificationTimeLeft((prev) => {
        if (prev <= 1) {
          if (verificationTimerRef.current) {
            clearInterval(verificationTimerRef.current)
            verificationTimerRef.current = null
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // 재전송 쿨타임 타이머 시작 (1분)
  const startResendCooldown = () => {
    // 기존 타이머가 있으면 정리
    if (resendTimerRef.current) {
      clearInterval(resendTimerRef.current)
    }

    // 1분(60초) 설정
    setResendCooldown(60)

    resendTimerRef.current = window.setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          if (resendTimerRef.current) {
            clearInterval(resendTimerRef.current)
            resendTimerRef.current = null
          }
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
  const handleCheckEmailDuplicate = async () => {
    if (!email) {
      setEmailError('이메일을 입력해주세요')
      return
    }
    
    try {
      // TODO: API 연동
      // const response = await checkEmailDuplicate(email)
      
      // 임시 로직
      setIsEmailChecked(true)
      setEmailError('')
      alert('사용 가능한 이메일입니다')
    } catch (error) {
      setEmailError('이미 사용 중인 이메일입니다')
      setIsEmailChecked(false)
    }
  }

  // 인증코드 전송
  const handleSendVerificationCode = async () => {
    if (!isEmailChecked) {
      alert('이메일 중복 확인을 먼저 진행해주세요')
      return
    }
    
    try {
      // TODO: API 연동
      // const response = await sendVerificationCode(email)
      
      setIsCodeSent(true)
      setCodeError('')
      setVerificationCode('')
      startVerificationTimer() // 인증코드 입력 제한시간 타이머 시작 (5분)
      startResendCooldown() // 재전송 쿨타임 타이머 시작 (1분)
      alert('인증코드가 전송되었습니다')
    } catch (error) {
      setCodeError('인증코드 전송에 실패했습니다')
    }
  }

  // 인증코드 확인
  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setCodeError('인증코드를 입력해주세요')
      return
    }
    
    try {
      // TODO: API 연동
      // const response = await verifyCode(email, verificationCode)
      
      setIsEmailVerified(true)
      setCodeError('')
      alert('이메일 인증이 완료되었습니다')
    } catch (error) {
      setCodeError('인증코드가 일치하지 않습니다')
      setIsEmailVerified(false)
    }
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
    
    // TODO: 회원가입 API 호출
    console.log('회원가입:', { name, email, password })
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
              disabled={isEmailVerified}
              style={{padding:'8px 16px', whiteSpace:'nowrap'}}
            >
              중복 확인
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
              disabled={resendCooldown > 0}
              style={{
                padding:'8px 16px', 
                width:'100%', 
                marginBottom:8,
                cursor: resendCooldown > 0 ? 'not-allowed' : 'pointer',
                opacity: resendCooldown > 0 ? 0.6 : 1
              }}
            >
              {resendCooldown > 0 
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
                style={{padding:'8px 16px', whiteSpace:'nowrap'}}
              >
                확인
              </button>
            </div>
            {codeError && <p style={{color:'red', fontSize:12, margin:'4px 0 0 0'}}>{codeError}</p>}
            {verificationTimeLeft === 0 && <p style={{color:'orange', fontSize:12, margin:'4px 0 0 0'}}>⚠ 인증 시간이 만료되었습니다. 인증코드를 재전송해주세요.</p>}
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
          style={{width:'100%', padding:'12px', fontSize:16, cursor:'pointer'}}
        >
          회원가입
        </button>
      </form>
    </div>
  )
}
