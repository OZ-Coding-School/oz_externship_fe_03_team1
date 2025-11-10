import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { RecordTitleInput } from '@/components/studyReport/RecordTitleInput'
import { RecordMarkdownEditor } from '@/components/studyReport/RecordMarkdownEditor'
import { RecordFileUpload } from '@/components/studyReport/RecordFileUpload'
import { RecordActionButtons } from '@/components/studyReport/RecordActionButtons'
import { RecordBreadcrumb } from '@/components/breadcrumb/RecordBreadcrumb'

export const StudyRecord = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [mode, setMode] = useState<'create' | 'edit'>('create')

  const { studyGroupId, studyRecordId } = useParams<{
    studyGroupId: string
    studyRecordId: string
  }>()

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

  // 스터디 그룹 ID를 활용하여 특정 그룹 내의 기록 불러오기
  const loadStudyRecord = async (groupId: string, recordId: string) => {
    try {
      console.log(
        `그룹 ID ${groupId} / 기록 ID ${recordId}의 데이터를 불러오는 중...`
      )
      const response = await fetch(
        `/api/study_groups/${groupId}/records/${recordId}`
      )

      if (!response.ok) throw new Error('네트워크 응답이 올바르지 않습니다.')

      const fetchedData = await response.json()
      setTitle(fetchedData.title || '')
      setContent(fetchedData.content || '')
      // 파일 데이터는 별도로 처리 필요
    } catch (error) {
      console.error('기록 데이터를 불러오는 중 오류 발생:', error)
    }
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
  }

  const handleSave = async () => {
    const recordData = { title, content }

    try {
      if (mode === 'edit' && studyGroupId && studyRecordId) {
        console.log(`그룹 ${studyGroupId}의 기록(${studyRecordId}) 수정 저장`)
        await fetch(
          `/api/study_groups/${studyGroupId}/records/${studyRecordId}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recordData),
          }
        )
      } else if (studyGroupId) {
        console.log(`그룹 ${studyGroupId}에 새 기록 생성`)
        await fetch(`/api/study_groups/${studyGroupId}/records`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(recordData),
        })
      }
    } catch (error) {
      console.error('기록 저장 중 오류 발생:', error)
    }
  }

  const isSaveDisabled = title.trim() === '' || content.trim() === ''

  return (
    <div className="flex min-h-screen w-full flex-col items-center px-20 pt-[65px] pb-20">
      <div className="mb-6 w-full max-w-3xl">
        <RecordBreadcrumb current="작성" />
        <h1 className="mb-2 text-2xl font-bold">
          {mode === 'edit' ? '스터디 기록 편집' : '스터디 기록 작성'}
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
