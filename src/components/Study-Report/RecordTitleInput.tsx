import { BasicInput } from '../basicComponents/input/BasicInput'
import type { InputStatus } from '@/types/InputStatus'
import React from 'react'

interface RecordTitleInputProps {
  title: string
  setTitle: (value: string) => void
  status?: InputStatus
  errorMessage?: string
}

const MAX_TITLE_LENGTH = 100

const RecordTitleInput: React.FC<RecordTitleInputProps> = ({
  title,
  setTitle,
  status = 'default',
  errorMessage,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  return (
    <div className="mb-8">
      {/* 레이블 구조를 MarkdownEditor와 통일 */}
      <label className="block font-semibold mb-2">
        제목 <span className="text-red-500">*</span>
      </label>

      <BasicInput
        placeholder="스터디 기록의 제목을 입력하세요"
        maxLength={MAX_TITLE_LENGTH}
        value={title}
        onChange={handleChange}
        status={status}
        errorMessage={errorMessage}
      />

      <div className="text-right text-sm text-gray-400 mt-1">
        {title.length}/{MAX_TITLE_LENGTH}자
      </div>
    </div>
  )
}

export default RecordTitleInput
