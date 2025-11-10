import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import { MarkdownToolbar } from './MarkdownToolbar'

interface MarkdownWriteProps {
  value: string
  onChange: Dispatch<SetStateAction<string>>
  placeholder?: string
}

export const MarkdownWrite = ({
  value,
  onChange,
  placeholder = '내용을 입력하세요. 마크다운 문법을 사용할 수 있습니다.',
}: MarkdownWriteProps) => {
  const [tab, setTab] = useState<'edit' | 'preview'>('edit')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [previewValue, setPreviewValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setPreviewValue(value), 200)
    return () => clearTimeout(timer)
  }, [value])

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 bg-[#F9FAFB] px-4 py-2">
        <div className="flex gap-2">
          {['edit', 'preview'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTab(type as 'edit' | 'preview')}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                tab === type
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {type === 'edit' ? '작성' : '미리보기'}
            </button>
          ))}
        </div>
        <MarkdownToolbar textareaRef={textareaRef} onUpdate={onChange} />
      </div>

      {tab === 'edit' ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[180px] w-full resize-none bg-white p-4 text-sm text-gray-700 focus:outline-none"
        />
      ) : (
        <div className="min-h-[180px] bg-white p-4 text-sm whitespace-pre-wrap text-gray-700">
          {previewValue.trim() ? (
            <ReactMarkdown
              remarkPlugins={[remarkBreaks]}
              components={{
                h2: ({ node: _, ...props }) => (
                  <h2
                    {...props}
                    className="my-1 text-lg font-semibold text-gray-800"
                  />
                ),
                li: ({ children }) => <div>- {children}</div>,
              }}
            >
              {previewValue}
            </ReactMarkdown>
          ) : (
            <p className="text-gray-400">미리보기할 내용이 없습니다.</p>
          )}
        </div>
      )}

      <div className="border-t border-gray-200 bg-[#F9FAFB] px-4 py-2 text-xs text-gray-600">
        마크다운 문법을 사용할 수 있습니다.{` `}
        <span className="font-medium text-gray-600">
          **굵게** _기울임_ `코드` [링크](URL) ## 제목 - 리스트
        </span>
      </div>
    </div>
  )
}
