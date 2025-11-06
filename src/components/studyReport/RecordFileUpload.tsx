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
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
      toast.error('총 파일 용량은 10MB를 초과할 수 없습니다.', {
        position: 'top-center',
      })
      return
    }
    onFilesChange([...files, ...selected])
    toast.success(`${selected.length}개의 파일이 추가되었습니다.`, {
      position: 'bottom-center',
    })
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
      toast.error('총 파일 용량은 10MB를 초과할 수 없습니다.', {
        position: 'top-center',
      })
      return
    }
    onFilesChange([...files, ...dropped])
    toast.success(`${dropped.length}개의 파일이 추가되었습니다.`, {
      position: 'bottom-center',
    })
  }

  const handleRemoveFile = (name: string) => {
    onFilesChange(files.filter((f) => f.name !== name))
    toast.info('파일이 삭제되었습니다.', {
      position: 'bottom-center',
    })
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
      case 'doc':
      case 'docx':
      case 'xls':
      case 'xlsx':
      case 'ppt':
      case 'pptx':
      case 'txt':
        return <FileText className="text-gray-500" size={18} />
      default:
        return <FileIcon className="text-gray-500" size={18} />
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) {
      setDroppedFile(dropped)
      const event = {
        target: { files: e.dataTransfer.files },
      } as unknown as React.ChangeEvent<HTMLInputElement>
      onFileChange(event)
    }
  }

  const handleRemoveFile = () => {
    setDroppedFile(null)
    const fileInput = document.getElementById('fileInput') as HTMLInputElement
    if (fileInput) fileInput.value = ''
    const event = {
      target: { files: [] },
    } as unknown as React.ChangeEvent<HTMLInputElement>
    onFileChange(event)
  }

  const getFileIcon = (file: File) => {
    const type = file.type
    if (type.startsWith('image/'))
      return <Image className="text-blue-500" size={32} />
    if (type.startsWith('video/'))
      return <Video className="text-purple-500" size={32} />
    if (type.startsWith('audio/'))
      return <Music className="text-pink-500" size={32} />
    if (type === 'application/pdf')
      return <FileText className="text-red-500" size={32} />
    return <FileIcon className="text-gray-500" size={32} />
  }

  return (
    <div>
      <label className="mb-2 block font-semibold">첨부 파일</label>
      <div className="rounded-xl border-2 border-dashed border-[#E5E7EB] py-10 text-center">
        <span
          className="flex cursor-pointer flex-col items-center gap-2 text-gray-500"
          onClick={handleClick}
        >
          <img
            src="../../public/icons/Vector@2x.png"
            alt="파일 업로드"
            className="h-10 w-10"
          />
          <span>
            파일을 여기에 드래그하거나{' '}
            <span className="text-yellow-600">클릭하여 선택</span>
          </span>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={onFileChange}
          />
          {file && (
            <p className="mt-2 text-sm text-gray-700">
              선택된 파일: {file.name}
            </p>
          )}
        </span>
        <p className="mt-2 text-xs text-gray-400">
          모든 파일 형식 지원 (최대 10MB)
        </p>
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

      {/* Toast 컨테이너 */}
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick
        pauseOnHover={false}
        draggable
      />
    </div>
  )
}
