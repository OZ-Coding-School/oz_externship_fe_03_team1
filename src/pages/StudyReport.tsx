import { useState } from "react";
import MarkdownWrite from "../components/markdown/MarkdownWrite";

export default function StudyRecordForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="flex flex-col items-center w-full bg-gray-50 min-h-screen pt-[65px] pb-20 px-20">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-200 p-10">
        {/* 경로 표시 */}
        <div className="text-sm text-gray-500 mb-4">
          홈 <span className="mx-1 text-gray-400">{">"}</span>
          스터디 그룹 <span className="mx-1 text-gray-400">{">"}</span>
          스터디 상세 <span className="mx-1 text-gray-400">{">"}</span>
          <span className="text-gray-700 font-medium">기록 작성</span>
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
            className="w-full border border-[#E5E7EB] rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-300 outline-none"
          />
          <div className="text-right text-sm text-gray-400 mt-1">
            {title.length}/100자
          </div>
        </div>

        {/* 마크다운 작성 영역 */}
        <div className="mb-8">
          <label className="block font-semibold mb-2">
            내용 <span className="text-red-500">*</span>
          </label>
          <MarkdownWrite
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="학습한 내용을 마크다운 형식으로 작성하세요..."
          />
        </div>

        {/* 파일 첨부 */}
        <div className="mb-10">
          <label className="block font-semibold mb-2">첨부 파일</label>
          <div className="border-2 border-dashed border-[#E5E7EB] text-center py-10 rounded-xl">
            <label className="cursor-pointer flex flex-col items-center gap-2 text-gray-500">
              {/* public 폴더 이미지 사용 */}
              <img
                src="/images/Vector@2x.png"
                alt="파일 업로드"
                className="w-10 h-10"
              />
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
            className="px-5 py-2 rounded-lg border border-[#E5E7EB] text-gray-700 hover:bg-gray-100"
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
