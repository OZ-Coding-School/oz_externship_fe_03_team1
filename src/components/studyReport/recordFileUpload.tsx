interface RecordFileUploadProps {
  file: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RecordFileUpload({ file, onFileChange }: RecordFileUploadProps) {
  return (
    <div className="mb-10">
      <label className="block font-semibold mb-2">첨부 파일</label>
      <div className="border-2 border-dashed border-[#E5E7EB] text-center py-10 rounded-xl">
        <label className="cursor-pointer flex flex-col items-center gap-2 text-gray-500">
          <img
            src="/images/Vector@2x.png"
            alt="파일 업로드"
            className="w-10 h-10"
          />
          <span>
            파일을 여기에 드래그하거나{" "}
            <span className="text-yellow-600">클릭하여 선택</span>
          </span>
          <input type="file" className="hidden" onChange={onFileChange} />
          {file && (
            <p className="text-gray-700 text-sm mt-2">
              선택된 파일: {file.name}
            </p>
          )}
        </label>
        <p className="text-xs text-gray-400 mt-2">
          모든 파일 형식 지원 (최대 10MB)
        </p>
      </div>
    </div>
  );
}