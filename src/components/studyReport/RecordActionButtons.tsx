import { BasicButton } from '../basicComponents/BasicButton/BasicButton.tsx'

interface RecordActionButtonsProps {
  onCancel: () => void
  onSave: () => void
<<<<<<< HEAD
  mode?: 'create' | 'edit'
  disabled?: boolean
=======
  mode: 'create' | 'edit'
  disabled?: boolean // 🔹 추가 (비활성화 상태를 전달받기 위해)
>>>>>>> 37fa9d6 (feat: RecordActionButtons에 비활성화 상태 전달 기능 추가 및 StudyRecord에서 저장 로직 검증 추가)
}

export const RecordActionButtons = ({
  onCancel,
  onSave,
<<<<<<< HEAD
  mode = 'create',
  disabled = false,
=======
  mode,
  disabled = false, // 기본값 false
>>>>>>> 37fa9d6 (feat: RecordActionButtons에 비활성화 상태 전달 기능 추가 및 StudyRecord에서 저장 로직 검증 추가)
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
<<<<<<< HEAD
        disabled={disabled}
=======
        disabled={disabled} // 🔹 저장 버튼 비활성화
>>>>>>> 37fa9d6 (feat: RecordActionButtons에 비활성화 상태 전달 기능 추가 및 StudyRecord에서 저장 로직 검증 추가)
      >
        {mode === 'create' ? '기록 저장' : '기록 수정'}
      </BasicButton>
    </div>
  )
}
