import React from 'react'

export default function Register() {
  return (
    <div style={{maxWidth:480}}>
      <h2>회원가입</h2>
      <form>
        <div style={{marginBottom:12}}>
          <label>이름</label>
          <input type="text" style={{width:'100%'}} />
        </div>
        <div style={{marginBottom:12}}>
          <label>이메일</label>
          <input type="email" style={{width:'100%'}} />
        </div>
        <div style={{marginBottom:12}}>
          <label>비밀번호</label>
          <input type="password" style={{width:'100%'}} />
        </div>
        <button type="button">regiter</button>
      </form>
    </div>
  )
}
