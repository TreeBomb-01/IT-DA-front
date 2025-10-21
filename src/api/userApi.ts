import { useMutation } from '@tanstack/react-query';
import apiClient from './apiClient';

// 회원가입을 위한 데이터 타입
interface SignUpData {
  name: string;
  email: string;
  password: string;
  ticket: string; // ticket 추가
}

// 로그인을 위한 데이터 타입
interface LoginRequest {
  email: string;
  password: string;
}

// 로그인 응답 타입
interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  deviceId: string;
}

// API 응답 타입 (예시)
interface SignUpResponse {
  message: string;
  userId: string;
}

// 이메일 중복 확인
export const useCheckEmailDuplicate = () => {
  return useMutation<void, Error, string>({
    mutationFn: async (email: string) => {
      await apiClient.post('/auth/email/check', null, {
        params: { email }
      });
    },
  });
};

// 이메일 인증코드 전송
export const useSendVerificationCode = () => {
  return useMutation<void, Error, string>({
    mutationFn: async (email: string) => {
      await apiClient.post('/auth/email/send', null, {
        params: { email }
      });
    },
  });
};

// 이메일 인증코드 확인
export const useVerifyCode = () => {
  return useMutation<{ ticket: string }, Error, { email: string; code: string }>({
    mutationFn: async ({ email, code }) => {
      const { data } = await apiClient.post<{ ticket: string }>('/auth/email/verify', null, {
        params: { email, code }
      });
      return data;
    },
  });
};


// 회원가입 요청
export const useSignUp = () => {
  return useMutation<SignUpResponse, Error, SignUpData>({
    mutationFn: async (userData: SignUpData) => {
      const { data } = await apiClient.post<SignUpResponse>('/auth/signup', userData);
      return data;
    },
  });
};

// 로그인 요청
export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (loginData: LoginRequest) => {
      const response = await apiClient.post<LoginResponse>('/auth/login', loginData);
      
      // Authorization 헤더에서 accessToken 추출
      const authHeader = response.headers['authorization'];
      const accessToken = authHeader ? authHeader.replace('Bearer ', '') : '';
      
      // refreshToken과 deviceId는 HttpOnly 쿠키로 자동 저장됨
      return {
        accessToken,
        refreshToken: '', // 쿠키로 관리되므로 빈 문자열
        deviceId: '', // 쿠키로 관리되므로 빈 문자열
      };
    },
  });
};

// 로그아웃 요청
export const useLogout = () => {
  return useMutation<void, Error, void>({
    mutationFn: async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        await apiClient.post('/auth/logout', null, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
      }
    },
  });
};

// 토큰 재발급 요청 (RefreshToken을 사용하여 새로운 AccessToken 발급)
export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const response = await apiClient.post('/auth/refresh');
    
    // Authorization 헤더에서 새로운 accessToken 추출
    const authHeader = response.headers['authorization'];
    const newAccessToken = authHeader ? authHeader.replace('Bearer ', '') : null;
    
    if (newAccessToken) {
      localStorage.setItem('accessToken', newAccessToken);
      return newAccessToken;
    }
    
    return null;
  } catch (error) {
    // RefreshToken도 만료된 경우
    localStorage.removeItem('accessToken');
    return null;
  }
};
