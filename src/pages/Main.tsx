import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

export default function Main() {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuthStore()

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-20 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 leading-tight">
            아이디어를 현실로,
            <br className="hidden md:block" /> 최고의 팀원과 함께.
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            IT-DA는 사이드 프로젝트와 공모전을 준비하는 예비 개발자와 디자이너를 위한 포트폴리오 빌딩 플랫폼입니다.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate('/contests')}
                  className="bg-sky-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-sky-600 transition-all shadow-lg text-lg"
                >
                  공모전 찾아보기
                </button>
                <button
                  onClick={() => navigate('/teambuilding')}
                  className="bg-white text-sky-500 border-2 border-sky-500 px-8 py-3 rounded-lg font-bold hover:bg-sky-50 transition-all text-lg"
                >
                  팀원 찾아보기
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/register')}
                  className="bg-sky-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-sky-600 transition-all shadow-lg text-lg"
                >
                  시작하기
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-white text-sky-500 border-2 border-sky-500 px-8 py-3 rounded-lg font-bold hover:bg-sky-50 transition-all text-lg"
                >
                  로그인
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">어떻게 참여하나요?</h2>
            <p className="mt-2 text-slate-500">간단한 3단계로 최고의 팀 프로젝트를 경험해보세요.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="bg-sky-100 text-sky-600 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">1. 프로젝트 등록</h3>
              <p className="text-slate-500 text-center">당신의 아이디어를 공유하고 함께할 멋진 팀원을 모집하세요.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="bg-sky-100 text-sky-600 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">2. 팀원 찾기</h3>
              <p className="text-slate-500 text-center">원하는 기술 스택의 개발자, 감각적인 디자이너를 찾아보세요.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="bg-sky-100 text-sky-600 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">3. 포트폴리오 완성</h3>
              <p className="text-slate-500 text-center">프로젝트를 완성하고 멋진 경력을 만들어나가세요.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Listings Preview */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800">함께할 팀원을 찾고 있어요 🤝</h2>
            <button
              onClick={() => navigate('/teambuilding')}
              className="text-sky-600 font-semibold hover:underline"
            >
              전체보기 →
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Card Example */}
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="border border-slate-200 rounded-xl p-6 bg-white hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
                onClick={() => navigate('/teambuilding')}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg">프로젝트 예시 {item}</h3>
                  <span className="bg-sky-100 text-sky-700 text-xs font-semibold px-2.5 py-1 rounded-full">모집중</span>
                </div>
                <p className="text-slate-500 text-sm mb-4">
                  함께 프로젝트를 진행할 팀원을 모집합니다. 자세한 내용은 팀빌딩 페이지에서 확인하세요.
                </p>
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2">모집 분야</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">개발자</span>
                    <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">디자이너</span>
                  </div>
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <span className="text-sm text-sky-600 font-semibold">자세히 보기 →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contests Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800">도전할만한 공모전 정보 🏆</h2>
            <button
              onClick={() => navigate('/contests')}
              className="text-sky-600 font-semibold hover:underline"
            >
              전체보기 →
            </button>
          </div>
          <div className="space-y-4">
            {/* Contest Item Example */}
            {[1, 2].map((item) => (
              <div
                key={item}
                className="bg-white p-6 rounded-lg border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => navigate('/contests')}
              >
                <div>
                  <p className="text-sm text-slate-500">주최 기관</p>
                  <h3 className="font-bold text-lg">공모전 제목 예시 {item}</h3>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <p className="text-slate-500">총 상금</p>
                    <p className="font-bold">미정</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-500">마감 기한</p>
                    <p className="font-bold text-red-500">확인 필요</p>
                  </div>
                </div>
                <span className="bg-slate-800 text-white text-sm px-4 py-2 rounded-md hover:bg-slate-900 transition-colors">
                  자세히 보기
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isLoggedIn && (
        <section className="bg-gradient-to-r from-sky-500 to-cyan-500 py-16">
          <div className="container mx-auto px-6 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">지금 바로 시작하세요!</h2>
            <p className="text-lg mb-8 opacity-90">
              IT-DA와 함께 당신의 아이디어를 실현하고 성장하세요.
            </p>
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-sky-500 px-8 py-3 rounded-lg font-bold hover:bg-slate-50 transition-all shadow-lg text-lg"
            >
              무료로 시작하기
            </button>
          </div>
        </section>
      )}
    </div>
  )
}
