import { useState } from "react";

export default function StudyRecordForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="flex flex-col items-center w-full py-10 bg-gray-50 min-h-screen">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-200 p-10">
        <div className="text-sm text-gray-500 mb-4">
          홈 / 스터디 그룹 / 스터디 상세 /{" "}
          <span className="text-gray-700">기록 작성</span>
        </div>

        <h1 className="text-2xl font-bold mb-2">스터디 기록 작성</h1>
        <p className="text-gray-600 mb-6">
          학습한 내용을 자세히 기록해보세요
        </p>

        {/* 제목 */}
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
            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-300 outline-none"
          />
          <div className="text-right text-sm text-gray-400 mt-1">
            {title.length}/100자
          </div>
        </div>

        {/* 내용 */}
        <div className="mb-8">
          <label className="block font-semibold mb-2">
            내용 <span className="text-red-500">*</span>
          </label>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex space-x-4 border-b border-gray-200 p-2 text-gray-500 text-sm bg-gray-50">
              <button
                type="button"
                className="font-semibold text-gray-900 focus:outline-none"
              >
                작성
              </button>
              <button
                type="button"
                className="hover:text-gray-700 focus:outline-none"
              >
                미리보기
              </button>
            </div>
            <textarea
              placeholder="학습한 내용을 마크다운 형식으로 작성하세요..."
              rows={10}
              className="w-full p-3 border-0 focus:ring-0 outline-none resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="text-xs text-gray-400 border-t border-gray-200 p-2 bg-gray-50">
              마크다운 문법을 사용할 수 있습니다. **굵게**, *기울임*, `코드`,
              [링크](URL), # 제목<br />
              이미지는 드래그 앤 드롭으로 첨부할 수 있습니다.
            </div>
          </div>
        </div>

        {/* 파일 첨부 */}
        <div className="mb-10">
          <label className="block font-semibold mb-2">첨부 파일</label>
          <div className="border-2 border-dashed border-gray-200 text-center py-10 rounded-xl">
            <label className="cursor-pointer flex flex-col items-center gap-2 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>
                파일을 여기에 드래그하거나{" "}
                <span className="text-yellow-600">클릭하여 선택</span>
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
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

        {/* 버튼 */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-5 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100"
          >
            취소
          </button>
          <button
            type="button"
            className="px-5 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900"
          >
            기록 저장
          </button>
        </div>
      </div>
    </div>
  );
}