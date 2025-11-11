import { ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import { RecordBreadcrumb } from '@/components/breadcrumb/RecordBreadcrumb'
import { dummyStudyRecordDetail } from '@/assets/dummyData/dummyStudyRecordDetail'
import { StudyRecordHeader } from './sections/StudyRecordHeader'
import { StudyRecordAISummary } from './sections/StudyRecordAISummary'
import { StudyRecordAttachments } from './sections/StudyRecordAttachments'
import { ToastContainer, toast } from 'react-toastify' // ✅ 추가

export const StudyRecordDetail = () => {
  const { data } = dummyStudyRecordDetail
  const { title, author, content, ai_summary, attachments, created_at } = data

  const handleBack = () => {
    toast.info('스터디 그룹으로 돌아갑니다.') // ✅ toastify 사용
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
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

      <RecordBreadcrumb current="상세" />

      <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <section className="p-10">
          <StudyRecordHeader
            title={title}
            author={author}
            created_at={created_at}
          />
        </section>

        <section className="border-t border-gray-200 px-10 py-8">
          <StudyRecordAISummary summaryData={ai_summary} />
        </section>

        <section className="border-t border-gray-200 px-10 py-8">
          <div className="prose prose-neutral max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        </section>

        <section className="border-t border-gray-200 px-10 pt-0 pb-8">
          <StudyRecordAttachments attachments={attachments} />
        </section>
      </div>

      <div className="mt-6 flex justify-start">
        <BasicButton
          variant="ghost"
          size="medium"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4" />
          스터디 그룹으로 돌아가기
        </BasicButton>
      </div>
    </div>
  )
}
