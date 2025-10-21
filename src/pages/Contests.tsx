import React, { useState, useEffect } from 'react'

export default function Contests() {
  const [hostFilter, setHostFilter] = useState('전체')
  const [fieldFilter, setFieldFilter] = useState('전체')
  const [statusFilter, setStatusFilter] = useState('전체')

  const handleSearch = () => {
    // TODO: 검색 기능 구현
    console.log('검색:', { host: hostFilter, field: fieldFilter, status: statusFilter })
  }

  // D-Day 계산 함수
  const calculateDDay = (deadline: string) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const deadlineDate = new Date(deadline)
    deadlineDate.setHours(0, 0, 0, 0)

    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return { text: '접수 마감', color: 'text-slate-400', isClosed: true }
    } else if (diffDays === 0) {
      return { text: 'D-DAY', color: 'text-red-500', isClosed: false }
    } else {
      return { text: `D-${diffDays}`, color: diffDays <= 7 ? 'text-red-500' : 'text-sky-400', isClosed: false }
    }
  }

  // 더미 공모전 데이터
  const contests = [
    {
      id: 1,
      title: '2025 정부 데이터 활용 공모전',
      host: '행정안전부',
      deadline: '2025-12-31',
      image: 'https://www.koren.kr/Attach/Board/wi_files/evt_image/43939e53fead22d3a6909697549f98dc.jpg',
    },
    {
      id: 2,
      title: '제 10회 NAVER D2 FEST',
      host: '네이버',
      deadline: '2025-10-28',
      image: 'https://placehold.co/400x500/cffafe/0e7490?text=NAVER+D2',
    },
    {
      id: 3,
      title: '대학생 창업 경진대회',
      host: 'K-STARTUP',
      deadline: '2025-09-30',
      image: 'https://placehold.co/400x500/fefce8/713f12?text=K-STARTUP',
    },
  ]

  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="container mx-auto px-6 py-12">
        {/* Page Title */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
            새로운 도전을 위한 공모전 정보 🏆
          </h1>
          <p className="mt-3 text-lg text-slate-500">
            당신의 잠재력을 펼칠 수 있는 다양한 공모전에 도전해보세요.
          </p>
        </section>

        {/* Filters Section */}
        <section className="mb-10 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Host Filter */}
            <div className="lg:col-span-1">
              <label htmlFor="host-filter" className="block text-sm font-medium text-slate-700 mb-1">
                주최 기관
              </label>
              <select
                id="host-filter"
                value={hostFilter}
                onChange={(e) => setHostFilter(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
              >
                <option>전체</option>
                <option>정부/공공기관</option>
                <option>대기업</option>
                <option>스타트업</option>
                <option>대학교</option>
              </select>
            </div>

            {/* Field Filter */}
            <div className="lg:col-span-1">
              <label htmlFor="field-filter" className="block text-sm font-medium text-slate-700 mb-1">
                분야
              </label>
              <select
                id="field-filter"
                value={fieldFilter}
                onChange={(e) => setFieldFilter(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
              >
                <option>전체</option>
                <option>앱/웹 개발</option>
                <option>AI/빅데이터</option>
                <option>게임 개발</option>
                <option>UI/UX 디자인</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="lg:col-span-1">
              <label htmlFor="status-filter" className="block text-sm font-medium text-slate-700 mb-1">
                진행 상태
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
              >
                <option>전체</option>
                <option>접수중</option>
                <option>마감임박</option>
                <option>마감</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="lg:col-span-1">
              <button
                onClick={handleSearch}
                className="w-full bg-sky-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-sky-600 transition-all flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                검색하기
              </button>
            </div>
          </div>
        </section>

        {/* Contest Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {contests.map((contest) => {
            const dday = calculateDDay(contest.deadline)
            return (
              <button
                key={contest.id}
                className="group relative block overflow-hidden rounded-xl hover:transform hover:-translate-y-1 hover:shadow-xl transition-all aspect-[4/5]"
              >
                <img
                  src={contest.image}
                  alt={`${contest.title} 포스터`}
                  className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                    dday.isClosed ? 'grayscale' : ''
                  }`}
                />
                <div
                  className={`absolute inset-0 ${
                    dday.isClosed ? 'bg-black/80' : 'bg-black/70 opacity-0 group-hover:opacity-100'
                  } transition-opacity duration-300 flex flex-col justify-end p-4 text-white`}
                >
                  <h3 className="text-lg font-bold">{contest.title}</h3>
                  <p className="text-xs text-slate-300 mb-3">주최: {contest.host}</p>
                  <div className="mt-auto pt-2 border-t border-slate-500">
                    <p className={`text-base font-bold ${dday.color}`}>{dday.text}</p>
                  </div>
                </div>
              </button>
            )
          })}
        </section>
      </main>
    </div>
  )
}
