import { MarkdownWrite } from '@/components/markdown/MarkdownWrite'

interface RecordMarkdownEditorProps {
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
}

export const RecordMarkdownEditor = ({
  content,
  setContent,
}: RecordMarkdownEditorProps) => {
  return (
    <div className="mb-8">
      <span className="mb-2 block font-semibold">
        내용 <span className="text-red-500">*</span>
      </span>
      <MarkdownWrite
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="학습한 내용을 마크다운 형식으로 작성하세요..."
      />
    </div>
  )
}
