import React, { useState } from "react";
import { Plus } from "lucide-react";

interface Study {
  id: number;
  title: string;
  status: "진행중" | "완료";
  period: string;
  members: number;
  tags: string[];
  image: string;
  review?: number;
}

// ✅ 임시 데이터
const studiesOngoing: Study[] = [
  {
    id: 1,
    title: "React 실무 프로젝트 스터디",
    status: "진행중",
    period: "2024년 4월 1일 ~ 2024년 4월 30일",
    members: 8,
    tags: ["React", "Next.js", "프론트엔드"],
    image: "/images/react-study.jpg",
  },
  {
    id: 2,
    title: "Python 데이터 분석 스터디",
    status: "진행중",
    period: "2024년 1월 15일 ~ 2024년 3월 15일",
    members: 6,
    tags: ["Python", "데이터 분석", "머신러닝"],
    image: "/images/python-study.jpg",
  },
  {
    id: 3,
    title: "AI 모델링 스터디",
    status: "진행중",
    period: "2024년 6월 1일 ~ 2024년 7월 31일",
    members: 7,
    tags: ["AI", "딥러닝"],
    image: "/images/ai-study.jpg",
  },
  {
    id: 4,
    title: "Flutter 앱 개발 스터디",
    status: "진행중",
    period: "2024년 8월 1일 ~ 2024년 9월 30일",
    members: 5,
    tags: ["Flutter", "모바일"],
    image: "/images/flutter-study.jpg",
  },
  {
    id: 5,
    title: "SQL 데이터베이스 스터디",
    status: "진행중",
    period: "2024년 5월 1일 ~ 2024년 6월 30일",
    members: 6,
    tags: ["SQL", "DB"],
    image: "/images/sql-study.jpg",
  },
];

const studiesCompleted: Study[] = [
  {
    id: 6,
    title: "Node.js 백엔드 개발반",
    status: "완료",
    period: "2023년 10월 1일 ~ 2023년 12월 31일",
    members: 4,
    tags: ["Node.js", "Express"],
    image: "/images/node-study.jpg",
    review: 4.7,
  },
  {
    id: 7,
    title: "Vue.js 마스터 스터디",
    status: "완료",
    period: "2023년 9월 1일 ~ 2023년 11월 30일",
    members: 5,
    tags: ["Vue", "Vuex"],
    image: "/images/vue-study.jpg",
    review: 4.7,
  },
  {
    id: 8,
    title: "TypeScript 심화 스터디",
    status: "완료",
    period: "2023년 9월 1일 ~ 2023년 12월 15일",
    members: 5,
    tags: ["TypeScript", "프론트엔드"],
    image: "/images/ts-study.jpg",
    review: 4.7,
  },
  {
    id: 9,
    title: "Django 백엔드 스터디",
    status: "완료",
    period: "2023년 7월 1일 ~ 2023년 9월 30일",
    members: 6,
    tags: ["Django", "Python"],
    image: "/images/django-study.jpg",
    review: 4.8,
  },
];

// ✅ 스터디 카드
const StudyCard: React.FC<{ study: Study }> = ({ study }) => (
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md flex flex-col min-h-[360px] transition relative">
    <img
      src={study.image}
      alt={study.title}
      className="h-52 w-full object-cover"
    />
    <div className="p-5 flex flex-col flex-grow">
      <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
        <span
          className={`px-2 py-0.5 rounded-full text-white text-[11px] ${
            study.status === "진행중" ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          {study.status}
        </span>
        <span>{study.members}명 참여</span>
      </div>
      <h3 className="text-lg font-semibold mb-1">{study.title}</h3>
      <p className="text-gray-500 text-sm mb-2">{study.period}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {study.tags.map((tag, i) => (
          <span
            key={i}
            className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600"
          >
            {tag}
          </span>
        ))}
      </div>
      {study.review && (
        <div className="text-sm text-gray-600 mb-2">⭐ {study.review.toFixed(1)}</div>
      )}
    </div>

    {/* 완료 스터디 버튼 영역 */}
    {study.status === "완료" && (
      <div className="relative border-t border-gray-100 px-5 py-8 flex justify-center items-center">
        <button className="bg-amber-500 text-white text-base font-semibold px-6 py-3 rounded-lg hover:bg-amber-600 transition cursor-pointer">
          리뷰 작성
        </button>
        <button className="absolute top-3 right-5 text-amber-600 text-sm font-medium hover:underline cursor-pointer">
          자세히 보기 →
        </button>
      </div>
    )}

    {/* 진행중 스터디 버튼 영역 (기존) */}
    {study.status === "진행중" && (
      <div className="border-t border-gray-100 px-5 py-3 flex justify-end">
        <button className="text-amber-600 text-sm font-medium hover:underline cursor-pointer">
          자세히 보기 →
        </button>
      </div>
    )}
  </div>
);


// ✅ 검색창
const SearchBar: React.FC = () => (
  <div className="w-1/3 mb-8 flex items-center gap-2">
    <input
      type="text"
      placeholder="스터디 그룹 검색..."
      className="w-full border border-gray-300 rounded-xl py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
    />
  </div>
);

// ✅ 섹션
const StudySection: React.FC<{ title: string; studies: Study[] }> = ({
  title,
  studies,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const studiesPerPage = 3;
  const totalPages = Math.ceil(studies.length / studiesPerPage);

  const indexOfLastStudy = currentPage * studiesPerPage;
  const indexOfFirstStudy = indexOfLastStudy - studiesPerPage;
  const currentStudies = studies.slice(indexOfFirstStudy, indexOfLastStudy);

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="text-xs text-gray-500">
          {studies.length}개 {title.includes("진행중") ? "진행중" : "완료"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentStudies.map((study) => (
          <StudyCard key={study.id} study={study} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm rounded-md border border-gray-300 text-gray-600 disabled:opacity-50"
        >
          이전
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-1 text-sm rounded-md border ${
              currentPage === idx + 1
                ? "bg-amber-500 text-white border-amber-500"
                : "border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm rounded-md border border-gray-300 text-gray-600 disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </section>
  );
};

// ✅ 메인 컴포넌트
const Studygroup: React.FC = () => {
  return (
    <div className="min-h-screen bg-white px-8">
      <main className="max-w-7xl mx-auto pt-10 pb-20">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1 text-gray-800">스터디 그룹</h1>
            <p className="text-gray-600 text-sm">
              함께 공부하며 성장하는 스터디 그룹에 참여해보세요
            </p>
          </div>
          <button className="bg-amber-500 text-white flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium hover:bg-amber-600 transition cursor-pointer shadow-sm">
            <Plus size={16} /> 새 스터디 만들기
          </button>
        </div>

        <SearchBar />

        <StudySection title="진행중인 스터디" studies={studiesOngoing} />
        <StudySection title="완료된 스터디" studies={studiesCompleted} />
      </main>
    </div>
  );
};

export default Studygroup;