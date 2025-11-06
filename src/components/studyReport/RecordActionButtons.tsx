import { BasicButton } from '../basicComponents/BasicButton/BasicButton.tsx'

interface RecordActionButtonsProps {
  onCancel: () => void
  onSave: () => void
  mode: 'create' | 'edit'
  disabled?: boolean // 🔹 추가 (비활성화 상태를 전달받기 위해)
}

export const RecordActionButtons = ({
  onCancel,
  onSave,
  mode,
  disabled = false, // 기본값 false
}: RecordActionButtonsProps) => {
  return (
    <div className="flex w-full justify-between">
      <BasicButton variant="outline" size="large" onClick={onCancel}>
        취소
      </BasicButton>

      <BasicButton
        variant="secondary"
        size="large"
        onClick={onSave}
        disabled={disabled} // 🔹 저장 버튼 비활성화
      >
        {mode === 'create' ? '기록 저장' : '기록 수정'}
      </BasicButton>
    </div>
  )
}
