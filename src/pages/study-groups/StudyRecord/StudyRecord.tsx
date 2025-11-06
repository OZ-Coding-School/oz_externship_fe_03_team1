import { useState } from 'react'
import { RecordTitleInput } from '@/components/studyReport/RecordTitleInput'
import { RecordMarkdownEditor } from '@/components/studyReport/RecordMarkdownEditor'
import { RecordFileUpload } from '@/components/studyReport/RecordFileUpload'
import { RecordActionButtons } from '@/components/studyReport/RecordActionButtons'
import { RecordBreadcrumb } from '@/components/breadcrumb/RecordBreadcrumb'

export const StudyRecord = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null
    setFile(selectedFile)
  }

  const handleCancel = () => {
    setTitle('')
    setContent('')
    setFile(null)
  }

  const handleSave = () => {
    // 저장 로직 추가 예정
  }

  // 필수 입력값 검증 (제목과 내용)
  const isSaveDisabled = title.trim() === '' || content.trim() === ''

  return (
    <div className="flex min-h-screen w-full flex-col items-center px-20 pt-[65px] pb-20">
      <div className="mb-6 w-full max-w-3xl">
        <RecordBreadcrumb current="작성" />
        <h1 className="mb-2 text-2xl font-bold">스터디 기록 작성</h1>
        <p className="text-gray-600">학습한 내용을 자세히 기록해보세요</p>
      </div>

      <div className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-[25px]">
        <RecordTitleInput title={title} setTitle={setTitle} />
        <RecordMarkdownEditor content={content} setContent={setContent} />
        <RecordFileUpload file={file} onFileChange={handleFileChange} />
      </div>

      <div className="mt-6 flex w-full max-w-3xl justify-between">
        <RecordActionButtons
          onCancel={handleCancel}
          onSave={handleSave}
          mode="create"
          disabled={isSaveDisabled}
        />
      </div>
    </div>
  )
}
