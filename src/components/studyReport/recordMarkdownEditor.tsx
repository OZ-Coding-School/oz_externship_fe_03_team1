import MarkdownWrite from "../markdown/MarkdownWrite";

interface RecordMarkdownEditorProps {
  content: string;
  setContent: (value: string) => void;
}

export default function RecordMarkdownEditor({
  content,
  setContent,
}: RecordMarkdownEditorProps) {
  return (
    <div className="mb-8">
      <label className="block font-semibold mb-2">
        내용 <span className="text-red-500">*</span>
      </label>
      <MarkdownWrite
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="학습한 내용을 마크다운 형식으로 작성하세요..."
      />
    </div>
  );
}
