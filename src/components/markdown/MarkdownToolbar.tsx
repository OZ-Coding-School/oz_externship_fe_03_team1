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
import { toast } from 'react-toastify'

export interface MarkdownToolbarProps {
  textareaRef: RefObject<HTMLTextAreaElement | null>
  onUpdate: Dispatch<SetStateAction<string>>
}

export const MarkdownToolbar = ({
  textareaRef,
  onUpdate,
}: MarkdownToolbarProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const getLineRange = (value: string, caret: number) => {
    const start = value.lastIndexOf('\n', Math.max(0, caret - 1)) + 1
    const nextNewline = value.indexOf('\n', caret)
    const end = nextNewline === -1 ? value.length : nextNewline
    return [start, end] as const
  }

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
    const { value } = ta
    let ss = ta.selectionStart
    let se = ta.selectionEnd
    if (ss === se) [ss, se] = getLineRange(value, ss)
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
    const { value } = ta
    let ss = ta.selectionStart
    let se = ta.selectionEnd
    if (ss === se) [ss, se] = getLineRange(value, ss)
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

  const toggleCodeBlock = () => {
    const ta = textareaRef.current
    if (!ta) return
    const { selectionStart: ss, selectionEnd: se, value } = ta
    const selected = value.slice(ss, se).trim()
    const isBlock = /^```[\s\S]*```$/.test(selected)
    const newSelected = isBlock
      ? selected.replace(/^```|```$/g, '').trim()
      : `\`\`\`\n${selected}\n\`\`\``
    const newValue = value.slice(0, ss) + newSelected + value.slice(se)
    onUpdate(newValue)
    requestAnimationFrame(() => {
      ta.focus()
      ta.selectionStart = ss
      ta.selectionEnd = ss + newSelected.length
    })
  }

  const toggleLink = () => {
    const ta = textareaRef.current
    if (!ta) return
    const { value } = ta
    let ss = ta.selectionStart
    let se = ta.selectionEnd
    let selected = value.slice(ss, se)
    const linkRegex = /\[[^\]]+\]\((?:https?:\/\/)?[^\s)]+\)/

    if (ss === se) {
      const [ls, le] = getLineRange(value, ss)
      const line = value.slice(ls, le)
      const match = [...line.matchAll(linkRegex)].find((m) => {
        const start = ls + (m.index ?? 0)
        const end = start + m[0].length
        return start <= ss && ss <= end
      })
      if (match) {
        ss = ls + (match.index ?? 0)
        se = ss + match[0].length
        selected = match[0]
      }
    }

    const isLink = linkRegex.test(selected)
    const newSelected = isLink
      ? selected.replace(/^\[([^\]]+)\]\([^)]*\)$/, '$1')
      : `[${selected || '링크텍스트'}](https://)`
    const newValue = value.slice(0, ss) + newSelected + value.slice(se)
    onUpdate(newValue)
    requestAnimationFrame(() => {
      ta.focus()
      ta.selectionStart = ss
      ta.selectionEnd = ss + newSelected.length
    })
  }

  const insertHeading = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    const { selectionStart, selectionEnd, value } = textarea
    const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1
    const nextNewline = value.indexOf('\n', selectionEnd)
    const lineEnd = nextNewline === -1 ? value.length : nextNewline

    const line = value.slice(lineStart, lineEnd)
    const headingRegex = /^##\s+/
    let newLine: string

    if (headingRegex.test(line)) {
      newLine = line.replace(headingRegex, '')
    } else {
      newLine = `## ${line}`
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
      toast.error(UPLOAD_ERROR_MESSAGES.invalidType)
      return
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      toast.error(UPLOAD_ERROR_MESSAGES.tooLarge)
      return
    }
    const imageURL = URL.createObjectURL(file)
    const markdownImage = `![${file.name}](${imageURL})`
    onUpdate((prev) => prev + '\n' + markdownImage)
    toast.success('이미지가 추가되었습니다.')
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
        onClick={toggleCodeBlock}
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
