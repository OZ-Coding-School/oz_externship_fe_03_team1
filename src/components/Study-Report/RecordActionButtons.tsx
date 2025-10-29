interface RecordActionButtonsProps {
  onCancel: () => void;
  onSave: () => void;
}

export default function RecordActionButtons({ onCancel, onSave }: RecordActionButtonsProps) {
  return (
    <div className="flex justify-end gap-3">
      <button
        type="button"
        onClick={onCancel}
        className="px-5 py-2 rounded-lg border border-[#E5E7EB] text-gray-700 hover:bg-gray-100"
      >
        취소
      </button>
      <button
        type="button"
        onClick={onSave}
        className="px-5 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900"
      >
        기록 저장
      </button>
    </div>
  );
}
