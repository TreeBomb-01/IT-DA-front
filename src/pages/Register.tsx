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
        },
        onError: (error) => {
          alert(`회원가입에 실패했습니다: ${error.message}`)
        },
      }
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-slate-200">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-slate-800">IT-DA 회원가입</h1>
              <p className="text-slate-500 mt-2 text-sm">새로운 성장의 기회를 '잇다'</p>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 이름 */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full p-3 border border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                  required
                />
              </div>

              {/* 이메일 */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  이메일
                </label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setIsEmailChecked(false)
                      setIsCodeSent(false)
                      setIsEmailVerified(false)
                      setEmailError('')
                    }}
                    disabled={isEmailVerified}
                    className="flex-1 w-full p-3 border border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500 disabled:bg-slate-100"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleCheckEmailDuplicate}
                    disabled={isEmailVerified || checkEmailMutation.isPending}
                    className="bg-slate-200 text-slate-700 px-4 py-2 rounded-md hover:bg-slate-300 transition-colors whitespace-nowrap text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {checkEmailMutation.isPending ? '확인 중...' : '중복 확인'}
                  </button>
                </div>
                {emailError && (
                  <p className="text-xs mt-1 text-red-500">{emailError}</p>
                )}
                {isEmailChecked && !emailError && (
                  <p className="text-xs mt-1 text-green-500">✓ 사용 가능한 이메일입니다.</p>
                )}
              </div>

              {/* 인증코드 요청 버튼 */}
              {isEmailChecked && !isEmailVerified && (
                <div>
                  <button
                    type="button"
                    onClick={handleSendVerificationCode}
                    disabled={resendCooldown > 0 || sendCodeMutation.isPending}
                    className="w-full bg-sky-100 text-sky-700 py-3 px-4 rounded-lg font-bold hover:bg-sky-200 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sendCodeMutation.isPending
                      ? '전송 중...'
                      : resendCooldown > 0
                      ? `재전송 대기 중 (${formatTime(resendCooldown)})`
                      : isCodeSent
                      ? '인증코드 재전송'
                      : '인증코드 받기'}
                  </button>
                </div>
              )}

              {/* 인증코드 입력 */}
              {isCodeSent && !isEmailVerified && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="verification-code" className="block text-sm font-medium text-slate-700">
                      인증코드
                    </label>
                    {verificationTimeLeft > 0 && (
                      <span
                        className={`text-sm font-medium ${
                          verificationTimeLeft <= 60 ? 'text-red-500 font-bold' : 'text-slate-500'
                        }`}
                      >
                        ⏱ {formatTime(verificationTimeLeft)}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="verification-code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="인증코드를 입력하세요"
                      className="flex-1 w-full p-3 border border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyCode}
                      disabled={verifyCodeMutation.isPending}
                      className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 transition-colors whitespace-nowrap text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {verifyCodeMutation.isPending ? '확인 중...' : '확인'}
                    </button>
                  </div>
                  {codeError && <p className="text-xs mt-1 text-red-500">{codeError}</p>}
                  {verificationTimeLeft === 0 && isCodeSent && !isEmailVerified && (
                    <p className="text-xs mt-1 text-amber-600">
                      ⚠ 인증 시간이 만료되었습니다. 인증코드를 재전송해주세요.
                    </p>
                  )}
                </div>
              )}

              {/* 이메일 인증 완료 메시지 */}
              {isEmailVerified && (
                <div className="text-center p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm font-bold text-green-600">✓ 이메일 인증이 완료되었습니다.</p>
                </div>
              )}

              {/* 비밀번호 */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  비밀번호
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={checkPasswordMatch}
                  className="mt-1 w-full p-3 border border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                  required
                />
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <label htmlFor="password-confirm" className="block text-sm font-medium text-slate-700">
                  비밀번호 확인
                </label>
                <input
                  type="password"
                  id="password-confirm"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  onBlur={checkPasswordMatch}
                  className="mt-1 w-full p-3 border border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                  required
                />
                {passwordError && <p className="text-xs mt-1 text-red-500">{passwordError}</p>}
                {password && passwordConfirm && !passwordError && (
                  <p className="text-xs mt-1 text-green-500">✓ 비밀번호가 일치합니다.</p>
                )}
              </div>

              {/* 회원가입 버튼 */}
              <div>
                <button
                  type="submit"
                  disabled={signUpMutation.isPending || !isEmailVerified}
                  className="w-full bg-sky-500 text-white py-3 px-4 rounded-lg font-bold hover:bg-sky-600 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  {signUpMutation.isPending ? '가입 진행 중...' : '회원가입'}
                </button>
              </div>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center text-sm text-slate-500">
              <p>
                이미 계정이 있으신가요?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="font-bold text-sky-600 hover:text-sky-500"
                >
                  로그인
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
