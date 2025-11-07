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

  const wrapSelection = (wrapper: string, closingWrapper?: string) => {
    const textarea = textareaRef.current
    if (!textarea) return
    const { selectionStart, selectionEnd, value } = textarea
    const selected = value.slice(selectionStart, selectionEnd)

    const newValue = closingWrapper
      ? value.slice(0, selectionStart) +
        wrapper +
        selected +
        closingWrapper +
        value.slice(selectionEnd)
      : value.slice(0, selectionStart) +
        wrapper +
        selected +
        wrapper +
        value.slice(selectionEnd)

    onUpdate(newValue)

    requestAnimationFrame(() => {
      textarea.focus()
      const pos =
        selectionStart +
        wrapper.length +
        selected.length +
        (closingWrapper ? closingWrapper.length : wrapper.length)
      textarea.selectionStart = textarea.selectionEnd = pos
    })
  }

  const insertHeading = (level: 1 | 2 | 3 | 4 | 5 | 6 = 2) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const { selectionStart, selectionEnd, value } = textarea

    const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1
    const nextNewline = value.indexOf('\n', selectionEnd)
    const lineEnd = nextNewline === -1 ? value.length : nextNewline

    const line = value.slice(lineStart, lineEnd)

    const headingRegex = /^(#{1,6})\s+/
    let newLine: string

    if (headingRegex.test(line)) {
      const currentLevel = (line.match(headingRegex)?.[1].length ?? 0) as number
      if (currentLevel === level) {
        newLine = line.replace(headingRegex, '')
      } else {
        newLine = line.replace(headingRegex, `${'#'.repeat(level)} `)
      }
    } else {
      newLine = `${'#'.repeat(level)} ${line}`
    }

    const newValue = value.slice(0, lineStart) + newLine + value.slice(lineEnd)
    const delta = newLine.length - line.length

    onUpdate(newValue)

    requestAnimationFrame(() => {
      textarea.focus()
      textarea.selectionStart = selectionStart + delta
      textarea.selectionEnd = selectionEnd + delta
    })
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

  const handleLinkInsert = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    const { selectionStart, selectionEnd, value } = textarea
    const selected = value.slice(selectionStart, selectionEnd).trim()
    const isUrl = /^https?:\/\/|^www\./i.test(selected)
    const linkTarget = isUrl ? selected : 'https://'

    const newValue =
      value.slice(0, selectionStart) +
      `[${selected || '링크텍스트'}](${linkTarget})` +
      value.slice(selectionEnd)

    onUpdate(newValue)

    requestAnimationFrame(() => {
      textarea.focus()
      const pos = selectionStart + `[${selected || '링크텍스트'}](`.length
      textarea.selectionStart = textarea.selectionEnd = pos + linkTarget.length
    })
  }

  return (
    <div className="flex items-center gap-3 text-gray-600">
      <Bold
        size={18}
        className="cursor-pointer hover:text-amber-500"
        onClick={() => wrapSelection('**')}
      />
      <Italic
        size={18}
        className="cursor-pointer hover:text-amber-500"
        onClick={() => wrapSelection('*')}
      />
      <Code2
        size={18}
        className="cursor-pointer hover:text-amber-500"
        onClick={() => wrapSelection('`')}
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
        onClick={handleLinkInsert}
      />

      <Heading1
        size={18}
        className="cursor-pointer hover:text-amber-500"
        onClick={() => insertHeading(2)}
      />

      <List
        size={18}
        className="cursor-pointer hover:text-amber-500"
        onClick={() => wrapSelection('- ')}
      />
    </div>
  )
}
