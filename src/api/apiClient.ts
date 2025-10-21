import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { refreshAccessToken } from './userApi';

const apiClient = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키를 자동으로 전송하고 받기 위해 필요
});

// 재발급 중인지 추적하는 플래그
let isRefreshing = false;
// 재발급 대기 중인 요청들을 저장할 배열
let failedQueue: Array<{
  resolve: (token: string | null) => void;
  reject: (error: any) => void;
}> = [];

// 대기 중인 요청들 처리
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 요청 인터셉터: accessToken을 헤더에 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: AT 만료 시 자동 재발급, RT 만료 시 로그아웃
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // 401 에러이고, 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 로그인/회원가입 요청은 재발급 시도하지 않음
      if (originalRequest.url?.includes('/auth/login') || 
          originalRequest.url?.includes('/auth/signup') ||
          originalRequest.url?.includes('/auth/refresh')) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // 이미 재발급 중이면 대기열에 추가
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // RefreshToken으로 새로운 AccessToken 발급
        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
          // 성공: 새 토큰으로 원래 요청 재시도
          processQueue(null, newAccessToken);
          
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          
          return apiClient(originalRequest);
        } else {
          // RefreshToken도 만료됨 -> 로그아웃
          processQueue(new Error('RefreshToken expired'), null);
          
          // 로그인 페이지로 리다이렉트
          if (!window.location.pathname.includes('/login')) {
            localStorage.removeItem('accessToken');
            window.dispatchEvent(new Event('auth:logout')); // 커스텀 이벤트 발생
            window.location.href = '/login';
          }
          
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // RefreshToken 재발급 실패 -> 로그아웃
        processQueue(refreshError, null);
        
        localStorage.removeItem('accessToken');
        window.dispatchEvent(new Event('auth:logout'));
        
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
