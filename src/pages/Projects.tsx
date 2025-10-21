import React, { useState } from 'react'

export default function Projects() {
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

  // 더미 프로젝트 데이터
  const projects = [
    {
      id: 1,
      title: '반려동물 산책 기록 앱',
      status: '모집중',
      statusColor: 'bg-sky-100 text-sky-700',
      description: 'SwiftUI를 이용해 강아지 산책 경로를 기록하고, 친구들과 공유하는 iOS 앱을 함께 만들어요!',
      roles: [
        { name: 'iOS 개발자', current: 1, total: 2 },
        { name: 'UI/UX 디자이너', current: 1, total: 1 },
      ],
      skills: [
        { name: 'SwiftUI', color: 'bg-orange-100 text-orange-700' },
        { name: 'Figma', color: 'bg-purple-100 text-purple-700' },
        { name: 'Firebase', color: 'bg-blue-100 text-blue-700' },
      ],
      available: true,
    },
    {
      id: 2,
      title: '개인 포트폴리오 웹사이트',
      status: '모집완료',
      statusColor: 'bg-green-100 text-green-700',
      description: 'Next.js와 TypeScript로 SEO에 최적화된 나만의 포트폴리오 웹사이트를 만들어봐요.',
      roles: [{ name: '프론트엔드', current: 2, total: 2 }],
      skills: [
        { name: 'React', color: 'bg-cyan-100 text-cyan-700' },
        { name: 'Next.js', color: 'bg-gray-100 text-gray-700' },
        { name: 'TypeScript', color: 'bg-blue-100 text-blue-700' },
      ],
      available: false,
    },
    {
      id: 3,
      title: '스터디/독서모임 플랫폼',
      status: '모집중',
      statusColor: 'bg-sky-100 text-sky-700',
      description: '관심사 기반의 스터디나 독서 모임을 만들고 참여할 수 있는 웹 서비스를 함께 개발할 분들을 찾습니다.',
      roles: [
        { name: '프론트엔드', current: 1, total: 2 },
        { name: '백엔드', current: 0, total: 1 },
        { name: '디자이너', current: 1, total: 1 },
      ],
      skills: [
        { name: 'JavaScript', color: 'bg-yellow-100 text-yellow-700' },
        { name: 'Node.js', color: 'bg-green-100 text-green-700' },
        { name: 'MySQL', color: 'bg-blue-100 text-blue-700' },
      ],
      available: true,
    },
  ]

  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="container mx-auto px-6 py-12">
        {/* Page Title */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
            함께 완성할 프로젝트를 찾아보세요 🚀
          </h1>
          <p className="mt-3 text-lg text-slate-500">
            당신의 성장을 도와줄 최고의 팀 프로젝트가 기다리고 있습니다.
          </p>
        </section>

        {/* Filters Section */}
        <section className="mb-10 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
            {/* Category/Role Filter */}
            <div className="lg:col-span-1">
              <label htmlFor="role-filter" className="block text-sm font-medium text-slate-700 mb-1">
                모집 분야
              </label>
              <select
                id="role-filter"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
              >
                <option>전체</option>
                <option>프론트엔드</option>
                <option>백엔드</option>
                <option>iOS/Android</option>
                <option>UI/UX 디자인</option>
              </select>
            </div>

            {/* Skill Filter */}
            <div className="lg:col-span-1">
              <label htmlFor="skill-filter" className="block text-sm font-medium text-slate-700 mb-1">
                기술 스택
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
            <div className="lg:col-span-1 flex space-x-2">
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

        {/* Project Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:transform hover:-translate-y-1 hover:shadow-xl transition-all flex flex-col"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-slate-800">{project.title}</h3>
                  <span className={`${project.statusColor} text-xs font-semibold px-2.5 py-1 rounded-full`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-slate-500 text-sm mb-4">{project.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">모집 분야</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.roles.map((role, index) => (
                      <span key={index} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">
                        {role.name} ({role.current}/{role.total})
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">주요 기술</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, index) => (
                      <span key={index} className={`${skill.color} text-xs px-2 py-1 rounded-full`}>
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                {project.available ? (
                  <button className="mt-auto w-full text-center bg-sky-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-sky-600 transition-all">
                    자세히 보기 및 지원
                  </button>
                ) : (
                  <button className="mt-auto w-full text-center bg-slate-400 text-white px-4 py-2 rounded-lg cursor-not-allowed">
                    모집 마감
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
