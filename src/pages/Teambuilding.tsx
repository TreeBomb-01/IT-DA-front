import React, { useState } from 'react'

export default function Teambuilding() {
  const [roleFilter, setRoleFilter] = useState('전체')
  const [skillFilter, setSkillFilter] = useState('')

  const handleSearch = () => {
    // TODO: 검색 기능 구현
    console.log('검색:', { role: roleFilter, skills: skillFilter })
  }

  const handleReset = () => {
    setRoleFilter('전체')
    setSkillFilter('')
  }

  // 더미 데이터
  const teammates = [
    {
      id: 1,
      name: '이코딩',
      role: '프론트엔드 개발자',
      roleColor: 'text-sky-600',
      ringColor: 'ring-sky-100',
      skills: ['React', 'Next.js', 'TypeScript'],
      bio: '사용자 경험을 개선하는 개발자가 되고 싶습니다. 함께 성장할 팀을 찾아요!',
      avatar: 'https://placehold.co/96x96/dbeafe/1e3a8a?text=Lee',
    },
    {
      id: 2,
      name: '박디자인',
      role: 'UI/UX 디자이너',
      roleColor: 'text-red-600',
      ringColor: 'ring-red-100',
      skills: ['Figma', 'Protopie', 'UX Research'],
      bio: '직관적이고 아름다운 디자인을 추구합니다. 재미있는 프로젝트 함께해요.',
      avatar: 'https://placehold.co/96x96/fecaca/991b1b?text=Park',
    },
    {
      id: 3,
      name: '김서버',
      role: '백엔드 개발자',
      roleColor: 'text-green-600',
      ringColor: 'ring-green-100',
      skills: ['Node.js', 'Express', 'MySQL', 'AWS'],
      bio: '안정적이고 확장성 있는 서버를 구축하는 것을 목표로 공부하고 있습니다.',
      avatar: 'https://placehold.co/96x96/a7f3d0/14532d?text=Kim',
    },
    {
      id: 4,
      name: '최모바일',
      role: 'iOS 개발자',
      roleColor: 'text-orange-600',
      ringColor: 'ring-orange-100',
      skills: ['Swift', 'SwiftUI', 'Combine'],
      bio: '사용자들에게 사랑받는 앱을 만들고 싶습니다. 열정 넘치는 분들을 기다립니다!',
      avatar: 'https://placehold.co/96x96/fed7aa/b45309?text=Choi',
    },
  ]

  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="container mx-auto px-6 py-12">
        {/* Page Title */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800">나와 딱 맞는 팀원 찾기 🧩</h1>
          <p className="mt-3 text-lg text-slate-500">
            원하는 역할과 기술을 가진 최고의 팀원을 찾아 프로젝트를 완성하세요.
          </p>
        </section>

        {/* Filters Section */}
        <section className="mb-10 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
            {/* Role Filter */}
            <div className="md:col-span-1">
              <label htmlFor="role-filter" className="block text-sm font-medium text-slate-700 mb-1">
                역할
              </label>
              <select
                id="role-filter"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
              >
                <option>전체</option>
                <option>프론트엔드 개발자</option>
                <option>백엔드 개발자</option>
                <option>iOS 개발자</option>
                <option>Android 개발자</option>
                <option>UI/UX 디자이너</option>
                <option>프로덕트 디자이너</option>
              </select>
            </div>

            {/* Skill Filter */}
            <div className="md:col-span-2">
              <label htmlFor="skill-filter" className="block text-sm font-medium text-slate-700 mb-1">
                기술 스택 (쉼표로 구분)
              </label>
              <input
                type="text"
                id="skill-filter"
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                placeholder="예: React, Swift, Figma"
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            {/* Search Button */}
            <div className="md:col-span-3 lg:col-span-2 flex space-x-2">
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
              <button
                onClick={handleReset}
                className="w-auto bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 transition-all"
              >
                초기화
              </button>
            </div>
          </div>
        </section>

        {/* Teammate Profile Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teammates.map((teammate) => (
              <div
                key={teammate.id}
                className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:transform hover:-translate-y-1 hover:shadow-xl transition-all flex flex-col items-center"
              >
                <img
                  src={teammate.avatar}
                  alt={`${teammate.name} 프로필 사진`}
                  className={`w-24 h-24 rounded-full mb-4 ring-4 ring-offset-2 ${teammate.ringColor}`}
                />
                <h3 className="text-xl font-bold text-slate-800">{teammate.name}</h3>
                <p className={`${teammate.roleColor} font-semibold mb-3`}>{teammate.role}</p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {teammate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="text-slate-500 text-sm mb-4">"{teammate.bio}"</p>
                <button className="mt-auto w-full bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-900 transition-all">
                  프로필 보기
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
