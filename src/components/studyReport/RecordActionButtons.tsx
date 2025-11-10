import { useState } from 'react'
import { BasicButton } from '../basicComponents/BasicButton/BasicButton.tsx'

interface RecordActionButtonsProps {
  onCancel: () => void
  onSave: () => void
  mode?: 'create' | 'edit'
  disabled?: boolean
}

export const RecordActionButtons = ({
  onCancel,
  onSave,
  mode = 'create',
  disabled = false,
}: RecordActionButtonsProps) => {
  const [currentMode, setCurrentMode] = useState<'create' | 'edit'>(mode)

  return (
    <div className="flex w-full flex-col items-center gap-3">
      {/* 쓸모가 다하면 제거 */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>현재 페이지 모드 선택:</span>
        <select
          value={currentMode}
          onChange={(e) => setCurrentMode(e.target.value as 'create' | 'edit')}
          className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm"
        >
          <option value="create">생성 모드</option>
          <option value="edit">수정 모드</option>
        </select>
      </div>

      {/* 버튼 영역 */}
      <div className="flex w-full justify-between">
        <BasicButton variant="outline" size="large" onClick={onCancel}>
          취소
        </BasicButton>

        <BasicButton
          variant="secondary"
          size="large"
          onClick={onSave}
          disabled={disabled}
        >
          {currentMode === 'create' ? '기록 저장' : '기록 수정'}
        </BasicButton>
      </div>
      {/* 현재 모드 표시 */}
      <p className="mt-1 text-xs text-gray-400">
        현재 선택된 모드:{' '}
        <strong>{currentMode === 'edit' ? '수정' : '생성'}</strong>
      </p>
    </div> // 테스트용 - 사용 후에는 제거 가능
  )
}
