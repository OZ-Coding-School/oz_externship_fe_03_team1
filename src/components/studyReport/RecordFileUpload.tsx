import React, { useState } from 'react'
import type { DragEvent, ChangeEvent } from 'react'
import {
  FileText,
  Image,
  Video,
  Music,
  File as FileIcon,
  X,
} from 'lucide-react'

interface RecordFileUploadProps {
  file: File | null
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const RecordFileUpload = ({
  file,
  onFileChange,
}: RecordFileUploadProps) => {
  const [dragActive, setDragActive] = useState(false)
  const [droppedFile, setDroppedFile] = useState<File | null>(file)

  // ✅ 파일 선택 시 (클릭으로 선택)
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null
    setDroppedFile(selected)
    onFileChange(e)
  }

  const handleClick = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement
    fileInput?.click()
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
      <div
        className={`rounded-xl border-2 border-dashed py-10 text-center transition-colors ${
          dragActive ? 'border-yellow-500 bg-yellow-50' : 'border-[#E5E7EB]'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!droppedFile ? (
          <span
            className="flex cursor-pointer flex-col items-center gap-2 text-gray-500"
            onClick={handleClick}
          >
            <img
              src="/icons/Vector@2x.png"
              alt="파일 업로드"
              className="h-10 w-10"
            />
            <span>
              파일을 여기에 드래그하거나{' '}
              <span className="font-semibold text-yellow-600">
                클릭하여 선택
              </span>
            </span>
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileSelect}
            />
            <p className="mt-2 text-xs text-gray-400">
              모든 파일 형식 지원 (최대 10MB)
            </p>
          </span>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm">
              {getFileIcon(droppedFile)}
              <div className="text-left">
                <p className="text-sm font-medium text-gray-800">
                  {droppedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(droppedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={handleRemoveFile}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>
            <button
              onClick={handleClick}
              className="text-xs text-yellow-600 hover:underline"
            >
              다른 파일로 교체하기
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
