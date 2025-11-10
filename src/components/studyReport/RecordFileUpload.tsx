import { useState, useRef } from 'react'
import type { DragEvent, ChangeEvent } from 'react'
import {
  FileText,
  Image,
  Video,
  Music,
  File as FileIcon,
  X,
  Paperclip,
} from 'lucide-react'

interface RecordFileUploadProps {
  files: File[]
  onFilesChange: (files: File[]) => void
}

const MAX_TOTAL_SIZE = 10 * 1024 * 1024 // 10MB

export const RecordFileUpload = ({
  files,
  onFilesChange,
}: RecordFileUploadProps) => {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // 파일 선택 (클릭)
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files) : []
    const totalSize =
      selected.reduce((acc, f) => acc + f.size, 0) +
      files.reduce((acc, f) => acc + f.size, 0)
    if (totalSize > MAX_TOTAL_SIZE) {
      alert('총 파일 용량은 10MB를 초과할 수 없습니다.')
      return
    }
    onFilesChange([...files, ...selected])
  }

  // 드래그 앤 드롭
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const dropped = Array.from(e.dataTransfer.files)
    const totalSize =
      dropped.reduce((acc, f) => acc + f.size, 0) +
      files.reduce((acc, f) => acc + f.size, 0)
    if (totalSize > MAX_TOTAL_SIZE) {
      alert('총 파일 용량은 10MB를 초과할 수 없습니다.')
      return
    }
    onFilesChange([...files, ...dropped])
  }

  const handleRemoveFile = (name: string) => {
    onFilesChange(files.filter((f) => f.name !== name))
  }

  const getFileIcon = (file: File) => {
    const type = file.type
    const ext = file.name.split('.').pop()?.toLowerCase()

    if (type.startsWith('image/'))
      return <Image className="text-gray-500" size={18} />
    if (type.startsWith('video/'))
      return <Video className="text-gray-500" size={18} />
    if (type.startsWith('audio/'))
      return <Music className="text-gray-500" size={18} />

    switch (ext) {
      case 'pdf':
        return <FileText className="text-gray-500" size={18} />
      case 'doc':
      case 'docx':
        return <FileText className="text-gray-500" size={18} />
      case 'xls':
      case 'xlsx':
        return <FileText className="text-gray-500" size={18} />
      case 'ppt':
      case 'pptx':
        return <FileText className="text-gray-500" size={18} />
      case 'txt':
        return <FileText className="text-gray-500" size={18} />
      default:
        return <FileIcon className="text-gray-500" size={18} />
    }
  }

  return (
    <div>
      <label className="mb-2 block font-semibold">첨부 파일</label>

      {/* 업로드 영역 */}
      <div
        className={`cursor-pointer rounded-xl border-2 border-dashed py-10 text-center transition-colors ${
          dragActive
            ? 'border-yellow-500 bg-yellow-50'
            : 'border-gray-200 bg-white'
        }`}
        onDragOver={(e) => {
          e.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setDragActive(false)
        }}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <img
          src="/icons/Vector@2x.png"
          alt="파일 업로드"
          className="mx-auto mb-3 h-10 w-10 opacity-70"
        />
        <p className="text-gray-500">
          파일을 여기에 드래그하거나{' '}
          <span className="font-semibold text-yellow-600">클릭하여 선택</span>
        </p>
        <p className="mt-2 text-xs text-gray-400">
          모든 파일 형식 지원 (최대 10MB)
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {/* 파일 리스트 */}
      {files.length > 0 && (
        <div className="mt-5 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="mb-3 flex items-center gap-2 font-medium">
            <Paperclip className="text-gray-700" size={16} />
            첨부 파일 ({files.length}개)
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {files.map((file) => (
              <div
                key={file.name}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm hover:shadow"
              >
                <div className="flex min-w-0 items-center gap-2 text-sm text-gray-700">
                  {getFileIcon(file)}
                  <span className="max-w-[180px] truncate overflow-hidden whitespace-nowrap">
                    {file.name}
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveFile(file.name)}
                  className="cursor-pointer text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
