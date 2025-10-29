import { BasicButton } from '../basicComponents/BasicButton/BasicButton.tsx'

interface RecordActionButtonsProps {
  onCancel: () => void
  onSave: () => void
}

export default function RecordActionButtons({
  onCancel,
  onSave,
}: RecordActionButtonsProps) {
  return (
    <div className="flex justify-between w-full">
      <BasicButton
        type="outline"
        size="medium"
        onClick={onCancel}
      >
        취소
      </BasicButton>

      <BasicButton
        type="primary"
        size="medium"
        onClick={onSave}
      >
        기록 저장
      </BasicButton>
    </div>
  )
}
