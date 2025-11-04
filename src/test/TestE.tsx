import { CreateStudyGroup } from '@/pages/study-groups/CreateStudyGroup'

export default function TestE() {
  // 아래줄 주석처리 후 링크 TestE 변경-생성 모드, 주석해제 후 링크 TestE 변경-수정 모드
  // window.history.pushState({}, '', '/study-groups/edit')
  return (
    <>
      <nav className="fixed top-0 right-0 left-0 z-50 h-[65px] border-b border-gray-200 bg-white px-20">
        <div className="flex h-full items-center justify-between px-8">
          <div className="flex items-center space-x-2">
            <div className="bg-primary-400 flex h-8 w-8 items-center justify-center rounded-lg font-semibold text-white">
              S
            </div>
            <span className="text-primary-600 text-xl font-semibold">
              StudyHub
            </span>
          </div>

          <div className="flex items-center space-x-8 text-gray-700">
            <span>강의 목록</span>
            <span>스터디 그룹</span>
            <span>구인 공고</span>
            <span className="font-semibold">김개발</span>
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-gray-50 pt-[65px]">
        <CreateStudyGroup />
      </div>
    </>
  )
}
