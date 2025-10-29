import { useState } from "react";
import RecordBreadcrumb from "@/components/studyReport/RecordBreadcrumb";
import RecordTitleInput from "@/components/studyReport/RecordTitleInput";
import RecordMarkdownEditor from "@/components/studyReport/RecordMarkdownEditor";
import RecordFileUpload from "@/components/studyReport/RecordFileUpload";
import RecordActionButtons from "@/components/studyReport/RecordActionButtons";

export default function StudyRecordForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleCancel = () => {
    // TODO: 라우팅 or 입력 초기화 로직 추가
  };

  const handleSave = () => {
    // TODO: 저장 로직 추가
  };

  return (
    <div className="flex flex-col items-center w-full bg-gray-50 min-h-screen pt-[65px] pb-20 px-20">
      {/* 제목, 설명문 카드 밖으로 이동 */}
      <div className="w-full max-w-3xl mb-6">
        <RecordBreadcrumb />
        <h1 className="text-2xl font-bold mb-2">스터디 기록 작성</h1>
        <p className="text-gray-600">학습한 내용을 자세히 기록해보세요</p>
      </div>

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-200 p-10">
        <RecordTitleInput title={title} setTitle={setTitle} />
        <RecordMarkdownEditor content={content} setContent={setContent} />
        <RecordFileUpload file={file} onFileChange={handleFileChange} />
      </div>

      {/* 카드 바깥에 버튼 추가 */}
      <div className="w-full max-w-3xl flex justify-between mt-6 px-10">
        <RecordActionButtons onCancel={handleCancel} onSave={handleSave} />
      </div>
    </div>
  );
}
