import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
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
    const timer = setTimeout(() => {
      setPreviewValue(value)
    }, 400)
    return () => clearTimeout(timer)
  }, [value])

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 bg-[#F9FAFB] px-4 py-2">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setTab('edit')}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
              tab === 'edit'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            작성
          </button>
          <button
            type="button"
            onClick={() => setTab('preview')}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
              tab === 'preview'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            미리보기
          </button>
        </div>

        <MarkdownToolbar textareaRef={textareaRef} onUpdate={onChange} />
      </div>

      {tab === 'edit' ? (
        <textarea
          ref={textareaRef}
          name="description"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[160px] w-full resize-none bg-white p-4 text-sm text-gray-700 focus:outline-none"
        />
      ) : (
        <div className="min-h-[160px] bg-white p-4 text-sm text-gray-700">
          {previewValue.trim() ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ node, ...props }) => (
                  <h2
                    className="mb-1 text-xl font-semibold text-gray-800"
                    {...props}
                  />
                ),
                a: ({ node, ...props }) => {
                  const href = props.href?.startsWith('http')
                    ? props.href
                    : `https://${props.href?.replace(/^\/*/, '')}`
                  return (
                    <a
                      {...props}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:underline"
                    />
                  )
                },
                text: ({ children }) => {
                  const text = String(children)
                  const urlRegex =
                    /((?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-z]{2,}(?:\/[^\s]*)?)/g

                  const parts = text.split(urlRegex)

                  return (
                    <>
                      {parts.map((part, i) => {
                        if (urlRegex.test(part)) {
                          const href = part.startsWith('http')
                            ? part
                            : `https://${part.replace(/^\/*/, '')}`
                          return (
                            <a
                              key={i}
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-amber-600 hover:underline"
                            >
                              {part}
                            </a>
                          )
                        }
                        return <span key={i}>{part}</span>
                      })}
                    </>
                  )
                },
                img: ({ node, ...props }) => {
                  const src = props.src ?? ''
                  const isSafeSrc =
                    src.startsWith('blob:') ||
                    src.startsWith('data:') ||
                    src.startsWith('http')

                  return isSafeSrc ? (
                    <img
                      {...props}
                      src={src}
                      alt={props.alt || '이미지 미리보기'}
                      className="max-w-full rounded-md shadow-sm"
                    />
                  ) : (
                    <span className="text-sm text-gray-400">
                      ⚠️ 유효하지 않은 이미지 경로입니다.
                    </span>
                  )
                },
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
          **굵게** *기울임* `코드` [링크](URL) ## 제목
        </span>
      </div>
    </div>
  )
}
