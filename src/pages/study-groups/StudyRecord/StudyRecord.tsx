import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { RecordTitleInput } from '@/components/studyReport/RecordTitleInput'
import { RecordMarkdownEditor } from '@/components/studyReport/RecordMarkdownEditor'
import { RecordFileUpload } from '@/components/studyReport/RecordFileUpload'
import { RecordActionButtons } from '@/components/studyReport/RecordActionButtons'
import { RecordBreadcrumb } from '@/components/breadcrumb/RecordBreadcrumb'
import { toast } from 'react-toastify'
import { api } from '@/api/api'

export const StudyRecord = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState<any[]>([])
  const [mode, setMode] = useState<'create' | 'edit'>('create')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { studyGroupId, studyRecordId } = useParams<{
    studyGroupId: string
    studyRecordId: string
  }>()

  // 드래그&드롭 방지
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

  // 기존 기록 불러오기
  const loadStudyRecord = async (recordId: string) => {
    try {
      setLoading(true)
      const res = await api.v1.studies.notes(Number(recordId)).GET()
      const data = res.data
      if (!data) {
        toast.error('기록 정보를 찾을 수 없습니다.')
        return
      }
      setTitle(data.title)
      setContent(data.content_md)
      setFiles(data.attachments || [])
    } catch (error: any) {
      console.error(error)
      toast.error('기록 정보를 불러오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 편집 모드 판단
  useEffect(() => {
    if (studyRecordId) {
      setMode('edit')
      loadStudyRecord(studyRecordId)
    } else if (window.location.pathname.includes('edit')) {
      setMode('edit')
    }
  }, [studyRecordId])

  // 취소
  const handleCancel = () => {
    setTitle('')
    setContent('')
    setFiles([])
    toast.info('작성 중인 내용이 초기화되었습니다.')
  }

  // 저장
  const handleSave = async () => {
    if (!studyGroupId) return toast.error('잘못된 접근입니다.')

    if (!title.trim() || !content.trim()) {
      return toast.warn('제목과 내용을 모두 입력해야 저장할 수 있습니다.')
    }

    try {
      setLoading(true)

      // attachments 처리: 새 파일은 file 객체, 기존 파일은 { url, name } 유지
      const formattedFiles = files.map((file) => {
        if (file.url && file.name) return file // 서버에서 가져온 기존 파일
        return { file } // 새로 업로드한 파일
      })

      const payload = {
        title,
        content_md: content,
        attachments: formattedFiles,
        ...(mode === 'create' && { group_id: studyGroupId }),
      }

      let res
      if (mode === 'edit' && studyRecordId) {
        res = await api.v1.studies.notes(Number(studyRecordId)).PATCH(payload)
      } else {
        res = await api.v1.studies.notes.POST(payload)
      }

      if (!res.data) return toast.error('저장할 수 없습니다.')
      toast.success(
        mode === 'edit'
          ? '스터디 기록이 성공적으로 수정되었습니다.'
          : '새 스터디 기록이 성공적으로 저장되었습니다.'
      )
      navigate(`/study_group_detail/${studyGroupId}`)
    } catch (error: any) {
      console.error(error)
      toast.error(
        error.response?.data?.message || '저장 중 오류가 발생했습니다.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-[896px] flex-col items-center px-8 pt-[65px] pb-20">
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
        {loading ? (
          <p className="text-center text-gray-400">불러오는 중...</p>
        ) : (
          <>
            <RecordTitleInput title={title} setTitle={setTitle} />
            <RecordMarkdownEditor content={content} setContent={setContent} />
            <RecordFileUpload files={files} onFilesChange={setFiles} />
          </>
        )}
      </div>

      <div className="mt-6 flex w-full max-w-3xl justify-between">
        {studyGroupId && (
          <RecordActionButtons
            onCancel={handleCancel}
            onSave={handleSave}
            mode={mode}
            studyGroupId={studyGroupId}
          />
        )}
      </div>
    </div>
  )
}
