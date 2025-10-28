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
      <BasicInput
        // JSX 대신 문자열로 변경
        label={`제목 *`}
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
