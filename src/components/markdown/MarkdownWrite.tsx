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

    const isWrapped = selected.startsWith(wrapper) && selected.endsWith(wrapper)

    const newSelected = isWrapped
      ? selected.slice(wrapper.length, selected.length - wrapper.length)
      : `${wrapper}${selected}${wrapper}`

    const newValue = value.slice(0, ss) + newSelected + value.slice(se)
    onUpdate(newValue)

    requestAnimationFrame(() => {
      ta.focus()
      ta.selectionStart = ss
      ta.selectionEnd = ss + newSelected.length
    })
  }

  const toggleHeading = () => {
    const ta = textareaRef.current
    if (!ta) return
    const { selectionStart: ss, selectionEnd: se, value } = ta
    const selected = value.slice(ss, se)
    const lines = selected.split('\n')
    const allHaveHeading = lines.every((line) => /^##\s/.test(line))

    const newLines = lines.map((line) =>
      !line.trim()
        ? line
        : allHaveHeading
          ? line.replace(/^##\s?/, '')
          : `## ${line.replace(/^##\s?/, '')}`
    )

    const newSelected = newLines.join('\n')
    const newValue = value.slice(0, ss) + newSelected + value.slice(se)
    onUpdate(newValue)

    requestAnimationFrame(() => {
      ta.focus()
      ta.selectionStart = ss
      ta.selectionEnd = ss + newSelected.length
    })
  }

  const toggleList = () => {
    const ta = textareaRef.current
    if (!ta) return
    const { selectionStart: ss, selectionEnd: se, value } = ta
    const selected = value.slice(ss, se)
    const lines = selected.split('\n')
    const allHaveList = lines.every((line) => /^-\s/.test(line))

    const newLines = lines.map((line) =>
      !line.trim()
        ? line
        : allHaveList
          ? line.replace(/^-\s?/, '')
          : `- ${line.replace(/^-\s?/, '')}`
    )

    const newSelected = newLines.join('\n')
    const newValue = value.slice(0, ss) + newSelected + value.slice(se)
    onUpdate(newValue)

    requestAnimationFrame(() => {
      ta.focus()
      ta.selectionStart = ss
      ta.selectionEnd = ss + newSelected.length
    })
  }

  const toggleCode = () => toggleWrap('`')

  const toggleLink = () => {
    const ta = textareaRef.current
    if (!ta) return
    const { selectionStart: ss, selectionEnd: se, value } = ta
    const selected = value.slice(ss, se)

    const linkPattern = /^\[.*?\]\(.*?\)$/
    const newValue = linkPattern.test(selected)
      ? value.slice(0, ss) +
        selected.replace(/^\[(.*?)\]\(.*?\)$/, '$1') +
        value.slice(se)
      : value.slice(0, ss) +
        `[${selected || '링크텍스트'}](https://)` +
        value.slice(se)

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
