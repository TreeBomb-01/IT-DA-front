import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

export default function MyPage(){
  const { user } = useAuthStore()
  return (
    <div>
      <h2>My Page</h2>
      {user ? (
        <div>
          <p>{user.name}님의 개인 페이지입니다.</p>
        </div>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
    </div>
  )
}
