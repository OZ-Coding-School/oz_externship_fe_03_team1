interface RecordTitleInputProps {
  title: string;
  setTitle: (value: string) => void;
}

export default function RecordTitleInput({ title, setTitle }: RecordTitleInputProps) {
  return (
    <div className="mb-8">
      <label className="block font-semibold mb-2">
        제목 <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        placeholder="스터디 기록의 제목을 입력하세요"
        maxLength={100}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-[#E5E7EB] rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-300 outline-none"
      />
      <div className="text-right text-sm text-gray-400 mt-1">
        {title.length}/100자
      </div>
    </div>
  );
}