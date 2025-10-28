export default function RecordBreadcrumb() {
  return (
    <div className="text-sm text-gray-500 mb-4 flex items-center gap-1">
      <span className="hover:text-gray-700 cursor-pointer">홈</span>
      <span className="text-gray-400">{">"}</span>
      
      <span className="hover:text-gray-700 cursor-pointer">스터디 그룹</span>
      <span className="text-gray-400">{">"}</span>
      
      <span className="hover:text-gray-700 cursor-pointer">스터디 상세</span>
      <span className="text-gray-400">{">"}</span>
      
      <span className="text-gray-700 font-medium">기록 작성</span>
    </div>
  );
}
