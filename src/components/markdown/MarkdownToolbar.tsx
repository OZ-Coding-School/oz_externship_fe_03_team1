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

export interface MarkdownToolbarProps {
  textareaRef: RefObject<HTMLTextAreaElement | null>
  onUpdate: Dispatch<SetStateAction<string>>
}

export const MarkdownToolbar = ({
  textareaRef,
  onUpdate,
}: MarkdownToolbarProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const wrapSelectedText = (wrapper: string, closingWrapper?: string) => {
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      alert('JPG 또는 PNG 파일만 업로드 가능합니다.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('5MB 이하의 이미지만 업로드 가능합니다.')
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
        onClick={() => wrapSelectedText('**')}
      />
      <Italic
        size={18}
        className="cursor-pointer hover:text-amber-500"
        onClick={() => wrapSelectedText('*')}
      />
      <Code2
        size={18}
        className="cursor-pointer hover:text-amber-500"
        onClick={() => wrapSelectedText('`')}
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
          accept="image/png, image/jpeg"
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
        onClick={() => wrapSelectedText('## ')}
      />
      <List
        size={18}
        className="cursor-pointer hover:text-amber-500"
        onClick={() => wrapSelectedText('- ')}
      />
    </div>
  )
}
