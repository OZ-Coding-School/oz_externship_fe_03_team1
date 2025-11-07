import {
  useRef,
  type RefObject,
  type Dispatch,
  type SetStateAction,
} from 'react'
import {
  Bold,
  Italic,
  Code2,
  Link as LinkIcon,
  Heading1,
  List,
  Image as FileImage,
} from 'lucide-react'
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE_BYTES,
  UPLOAD_ERROR_MESSAGES,
} from '@/constants/upload'

export interface MarkdownToolbarProps {
  textareaRef: RefObject<HTMLTextAreaElement | null>
  onUpdate: Dispatch<SetStateAction<string>>
}

export const MarkdownToolbar = ({
  textareaRef,
  onUpdate,
}: MarkdownToolbarProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const toggleWrap = (wrapper: string) => {
    const ta = textareaRef.current
    if (!ta) return
    const { selectionStart: ss, selectionEnd: se, value } = ta
    const selected = value.slice(ss, se)

    const before = value.slice(ss - wrapper.length, ss)
    const after = value.slice(se, se + wrapper.length)
    const isWrapped = before === wrapper && after === wrapper

    if (isWrapped) {
      const newValue =
        value.slice(0, ss - wrapper.length) +
        selected +
        value.slice(se + wrapper.length)
      onUpdate(newValue)
      requestAnimationFrame(() => {
        ta.focus()
        ta.selectionStart = ss - wrapper.length
        ta.selectionEnd = se - wrapper.length
      })
    } else {
      const newValue =
        value.slice(0, ss) + wrapper + selected + wrapper + value.slice(se)
      onUpdate(newValue)
      requestAnimationFrame(() => {
        ta.focus()
        ta.selectionStart = ss + wrapper.length
        ta.selectionEnd = se + wrapper.length
      })
    }
  }

  const toggleCode = () => {
    const ta = textareaRef.current
    if (!ta) return
    const { selectionStart: ss, selectionEnd: se, value } = ta
    const selected = value.slice(ss, se)
    const before = value.slice(ss - 1, ss)
    const after = value.slice(se, se + 1)
    const isWrapped = before === '`' && after === '`'

    const newValue = isWrapped
      ? value.slice(0, ss - 1) + selected + value.slice(se + 1)
      : value.slice(0, ss) + '`' + selected + '`' + value.slice(se)
    onUpdate(newValue)
  }

  const toggleHeading = () => {
    const ta = textareaRef.current
    if (!ta) return
    const { value, selectionStart } = ta

    const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1
    const nextNewline = value.indexOf('\n', selectionStart)
    const lineEnd = nextNewline === -1 ? value.length : nextNewline
    const line = value.slice(lineStart, lineEnd)

    const hasHeading = /^##\s/.test(line)
    const newLine = hasHeading ? line.replace(/^##\s/, '') : `## ${line}`
    const newValue = value.slice(0, lineStart) + newLine + value.slice(lineEnd)
    onUpdate(newValue)
  }

  const toggleList = () => {
    const ta = textareaRef.current
    if (!ta) return
    const { value, selectionStart } = ta
    const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1
    const nextNewline = value.indexOf('\n', selectionStart)
    const lineEnd = nextNewline === -1 ? value.length : nextNewline
    const line = value.slice(lineStart, lineEnd)

    const hasList = /^-\s/.test(line)
    const newLine = hasList ? line.replace(/^-+\s*/, '') : `- ${line}`
    const newValue = value.slice(0, lineStart) + newLine + value.slice(lineEnd)
    onUpdate(newValue)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      alert(UPLOAD_ERROR_MESSAGES.invalidType)
      return
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      alert(UPLOAD_ERROR_MESSAGES.tooLarge)
      return
    }
    const imageURL = URL.createObjectURL(file)
    const markdownImage = `![${file.name}](${imageURL})`
    onUpdate((prev) => prev + '\n' + markdownImage)
  }

  const toggleLink = () => {
    const ta = textareaRef.current
    if (!ta) return
    const { selectionStart: ss, selectionEnd: se, value } = ta
    const selected = value.slice(ss, se)
    const linkPattern = /^\[.*?\]\(.*?\)$/

    if (linkPattern.test(selected)) {
      const text = selected.replace(/^\[(.*?)\]\(.*?\)$/, '$1')
      onUpdate(value.slice(0, ss) + text + value.slice(se))
    } else {
      const newValue =
        value.slice(0, ss) +
        `[${selected || '링크텍스트'}](https://)` +
        value.slice(se)
      onUpdate(newValue)
    }
  }

  return (
    <div className="flex items-center gap-3 text-gray-600">
      <Bold
        size={18}
        className="cursor-pointer hover:text-amber-500"
        onClick={() => toggleWrap('**')}
      />
      <Italic
        size={18}
        className="cursor-pointer hover:text-amber-500"
        onClick={() => toggleWrap('_')}
      />
      <Code2
        size={18}
        className="cursor-pointer hover:text-amber-500"
        onClick={toggleCode}
      />
      <div className="relative">
        <FileImage
          size={18}
          className="cursor-pointer hover:text-amber-500"
          onClick={() => fileInputRef.current?.click()}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_IMAGE_TYPES.join(',')}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
      <LinkIcon
        size={18}
        className="cursor-pointer hover:text-amber-500"
        onClick={toggleLink}
      />
      <Heading1
        size={18}
        className="cursor-pointer hover:text-amber-500"
        onClick={toggleHeading}
      />
      <List
        size={18}
        className="cursor-pointer hover:text-amber-500"
        onClick={toggleList}
      />
    </div>
  )
}
