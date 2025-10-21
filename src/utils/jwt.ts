// JWT 토큰 디코딩 유틸리티
export interface JwtPayload {
  jti: string
  sub: string // user id
  nickname: string
  roles: string[]
  exp: number
  iat: number
}

// Base64 URL 디코딩 (한글 지원)
const base64UrlDecode = (str: string): string => {
  // Base64 URL을 표준 Base64로 변환
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  
  // 패딩 추가
  while (base64.length % 4) {
    base64 += '='
  }
  
  // Base64 디코딩
  const binaryString = atob(base64)
  
  // UTF-8 디코딩 (한글 지원)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  
  // TextDecoder를 사용하여 UTF-8 디코딩
  const decoder = new TextDecoder('utf-8')
  return decoder.decode(bytes)
}

// JWT 토큰을 디코딩하여 페이로드 추출
export const decodeJWT = (token: string): JwtPayload | null => {
  try {
    // JWT는 header.payload.signature 형태
    const parts = token.split('.')
    if (parts.length !== 3) {
      return null
    }

    // payload 부분 디코딩
    const payload = parts[1]
    const decodedPayload = base64UrlDecode(payload)
    
    return JSON.parse(decodedPayload) as JwtPayload
  } catch (error) {
    console.error('JWT 디코딩 실패:', error)
    return null
  }
}

// 토큰에서 닉네임 추출
export const getNicknameFromToken = (token: string): string | null => {
  const payload = decodeJWT(token)
  return payload?.nickname || null
}

// 토큰에서 사용자 ID 추출
export const getIdFromToken = (token: string): string | null => {
  const payload = decodeJWT(token)
  return payload?.sub || null
}

// 토큰에서 roles 추출
export const getRolesFromToken = (token: string): string[] => {
  const payload = decodeJWT(token)
  return payload?.roles || []
}

// 토큰 만료 확인
export const isTokenExpired = (token: string): boolean => {
  const payload = decodeJWT(token)
  if (!payload) return true

  const currentTime = Math.floor(Date.now() / 1000)
  return payload.exp < currentTime
}
