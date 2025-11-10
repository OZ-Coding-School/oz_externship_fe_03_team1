import { Link, useParams } from 'react-router'
import { ChevronRight } from 'lucide-react'

interface RecordBreadcrumbProps {
  current: '작성' | '상세' | '수정'
  homeTo?: string
  groupsTo?: string
}

interface StudyParams {
  id?: string
  groupId?: string
}

const DEFAULT_HOME = '/'
const DEFAULT_GROUPS = '/'

export const RecordBreadcrumb = ({
  current,
  homeTo = DEFAULT_HOME,
  groupsTo = DEFAULT_GROUPS,
}: RecordBreadcrumbProps) => {
  const { id, groupId } = useParams() as StudyParams
  const resolvedGroupId = groupId ?? id ?? '1'

  return (
    <nav
      aria-label="breadcrumb"
      className="mb-6 flex items-center text-sm text-gray-500"
    >
      <Link to={homeTo} className="hover:text-gray-700">
        홈
      </Link>
      <ChevronRight size={16} className="mx-1" />

      <Link to={groupsTo} className="hover:text-gray-700">
        스터디 그룹
      </Link>
      <ChevronRight size={16} className="mx-1" />

      <Link
        to={`/study_group/${resolvedGroupId}`}
        className="hover:text-gray-700"
      >
        스터디 상세
      </Link>
      <ChevronRight size={16} className="mx-1" />

      <span className="font-medium text-gray-800">기록 {current}</span>
    </nav>
  )
}
