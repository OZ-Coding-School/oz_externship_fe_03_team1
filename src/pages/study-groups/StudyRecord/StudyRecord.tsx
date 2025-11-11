import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { RecordTitleInput } from '@/components/studyReport/RecordTitleInput'
import { RecordMarkdownEditor } from '@/components/studyReport/RecordMarkdownEditor'
import { RecordFileUpload } from '@/components/studyReport/RecordFileUpload'
import { RecordActionButtons } from '@/components/studyReport/RecordActionButtons'
import { RecordBreadcrumb } from '@/components/breadcrumb/RecordBreadcrumb'
import { ToastContainer, toast } from 'react-toastify'

// 목 데이터 예시
const MOCK_RECORD = {
  title: '예시 스터디 기록 제목',
  content: '여기에 학습 내용을 작성해보세요.',
  files: [],
}

export const StudyRecord = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [mode, setMode] = useState<'create' | 'edit'>('create')
  const navigate = useNavigate()

  const { studyGroupId, studyRecordId } = useParams<{
    studyGroupId: string
    studyRecordId: string
  }>()

  // 드래그 앤 드롭 방지
  useEffect(() => {
    const preventDefault = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
    }

    window.addEventListener('dragover', preventDefault)
    window.addEventListener('drop', preventDefault)

    return () => {
      window.removeEventListener('dragover', preventDefault)
      window.removeEventListener('drop', preventDefault)
    }
  }, [])

  // 기록 데이터 불러오기 (목 데이터)
  const loadStudyRecord = async (groupId: string, recordId: string) => {
    console.log(`(MOCK) 그룹 ${groupId} 기록 ${recordId} 불러오기`)
    await new Promise((resolve) => setTimeout(resolve, 300))
    setTitle(MOCK_RECORD.title)
    setContent(MOCK_RECORD.content)
    setFiles(MOCK_RECORD.files)
  }

  useEffect(() => {
    if (studyGroupId && studyRecordId) {
      setMode('edit')
      loadStudyRecord(studyGroupId, studyRecordId)
    } else if (window.location.pathname.includes('edit')) {
      setMode('edit')
    }
  }, [studyGroupId, studyRecordId])

  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles)
  }

  const handleCancel = () => {
    setTitle('')
    setContent('')
    setFiles([])
    toast.info('작성 중인 내용이 초기화되었습니다.')
  }

  const handleSave = async () => {
    const recordData = { title, content, files }
    console.log('(MOCK) 저장 데이터:', recordData)

    await new Promise((resolve) => setTimeout(resolve, 300))

    if (mode === 'edit') {
      toast.success('스터디 기록이 성공적으로 수정되었습니다.')
    } else {
      toast.success('새 스터디 기록이 성공적으로 저장되었습니다.')
    }

    if (studyGroupId) navigate(`/study_group_detail/${studyGroupId}`)
  }

  const isSaveDisabled = title.trim() === '' || content.trim() === ''

  return (
    <div className="flex min-h-screen w-[896px] flex-col items-center px-8 pt-[65px] pb-20">
      {/* ToastContainer 추가 */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

      <div className="mb-6 w-full max-w-3xl">
        <RecordBreadcrumb current={mode === 'edit' ? '수정' : '작성'} />
        <h1 className="mb-2 text-2xl font-bold">
          {mode === 'edit' ? '스터디 기록 수정' : '스터디 기록 작성'}
        </h1>
        <p className="text-gray-600">
          {mode === 'edit'
            ? '학습에서 작성된 내용을 수정하고 저장해보세요'
            : '학습한 내용을 자세히 기록해보세요'}
        </p>
      </div>

      <div className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-[25px]">
        <RecordTitleInput title={title} setTitle={setTitle} />
        <RecordMarkdownEditor content={content} setContent={setContent} />
        <RecordFileUpload files={files} onFilesChange={handleFilesChange} />
      </div>

      <div className="mt-6 flex w-full max-w-3xl justify-between">
        <RecordActionButtons
          onCancel={handleCancel}
          onSave={handleSave}
          mode={mode}
          disabled={isSaveDisabled}
        />
      </div>
    </div>
  )
}
