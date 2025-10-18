"use client";
import React, { useState } from "react";
import { Plus, Search, Calendar, Book } from "lucide-react"; // ✅ 아이콘 추가
import { studiesOngoing, studiesCompleted } from "./studiesData";

// ✅ 스터디 데이터 타입 정의
export interface Studiesdata {
  id: number;
  title: string;
  status: "진행중" | "완료";
  image: string;
  period: string;
  tags: string[];
  members: number;
  maxMembers: number;
  review?: number;
  reviewCount?: number;
}

// ✅ 강의 관련 학습 목표 매핑
const lectureMapping: Record<string, string[]> = {
  "Node.js": ["Node.js 백엔드 완주", "Express.js 심화"],
  "Vue.js": ["Vue.js 완벽 마스터", "Vuex 상태관리"],
  "TypeScript": ["TypeScript 마스터"],
  "프론트엔드": ["HTML/CSS/JS 심화", "반응형 웹 구현"],
  "백엔드": ["API 설계", "데이터베이스 연동"],
  "데이터 분석": ["Python 기반 데이터 처리", "시각화 및 분석"],
  "머신러닝": ["ML 모델 학습", "평가 및 튜닝"],
  "AI": ["AI 프로젝트 실습", "모델 배포"],
  "딥러닝": ["딥러닝 모델 구현", "TensorFlow/PyTorch 실습"],
  "모바일": ["React Native/Flutter 실습", "앱 배포"],
  "DB": ["SQL/NoSQL 데이터베이스", "최적화 및 쿼리 작성"]
};

// ✅ 커스텀 별 아이콘
const StarIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 16,
  color = "#FBBF24",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    className="inline-block mr-1"
  >
    <path d="M12 .587l3.668 7.431L24 9.748l-6 5.853L19.336 24 12 19.897 4.664 24 6 15.601 0 9.748l8.332-1.73z" />
  </svg>
);

// ✅ 리뷰 별 계산 함수 (소수점 버림)
const getStars = (review?: number) => {
  const stars: { filled: boolean }[] = [];
  const fullStars = review ? Math.floor(review) : 0;

  for (let i = 0; i < fullStars; i++) stars.push({ filled: true });
  while (stars.length < 5) stars.push({ filled: false });

  return stars;
};

// ✅ 스터디 카드
const StudyCard: React.FC<{ study: Studiesdata }> = ({ study }) => {
  // 스터디 태그 기반으로 학습 목표 매핑
  const lecturesMapped = study.tags.flatMap((tag) => lectureMapping[tag] || []);
  const lecturesFinal = lecturesMapped.length > 0 ? lecturesMapped : ["기타 학습 내용 작성"];

  const stars = getStars(study.review);

  return (
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
          <span>
            {study.members}/{study.maxMembers}명 참여
          </span>
        </div>

        <h3 className="text-lg font-semibold mb-2">{study.title}</h3>

        {/* ✅ 스터디 기간 (Calendar 아이콘 사용) */}
        <p className="text-sm text-gray-600 mb-3">
          <span className="font-medium text-gray-800 flex items-center gap-1">
            <Calendar size={16} className="text-gray-700" /> 스터디 기간
          </span>
          <span className="mt-1 block">{study.period}</span>
        </p>

        {/* ✅ 스터디 강의 (Book 아이콘 사용, 닫힌 책) */}
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium text-gray-800 flex items-center gap-1">
            <Book size={16} className="text-gray-700" /> 스터디 강의
          </span>
          {lecturesFinal.map((lec, idx) => (
            <span key={idx} className="block mt-0.5">
              - {lec}
            </span>
          ))}
        </p>
      </div>

      {study.status === "완료" ? (
        <div className="relative border-t border-gray-100 px-5 py-5 flex flex-col items-center">
          {/* 평점과 상세보기 텍스트 좌/우 상단 */}
          <div className="w-full flex justify-between mb-2">
            <div className="flex items-center">
              {stars.map((star, idx) => (
                <StarIcon key={idx} color={star.filled ? "#FBBF24" : "#E5E7EB"} />
              ))}
              {study.review && (
                <span className="text-gray-500 text-xs ml-1">
                  {study.review.toFixed(1)}
                </span>
              )}
            </div>
            <button className="text-amber-600 text-sm font-medium hover:underline cursor-pointer">
              상세보기
            </button>
          </div>

          {/* 리뷰 작성 버튼 (중앙 아래, 색상 연하게) */}
          <button className="bg-amber-300 text-white text-base font-semibold px-28 py-1.5 rounded-lg hover:bg-amber-400 transition cursor-pointer mt-6">
            리뷰 작성
          </button>
        </div>
      ) : (
        <div className="border-t border-gray-100 px-5 py-3 flex justify-end">
          <button className="text-amber-600 text-sm font-medium hover:underline cursor-pointer">
            자세히 보기 →
          </button>
        </div>
      )}
    </div>
  );
};

// ✅ 검색창
const SearchBar: React.FC = () => (
  <div className="w-1/3 mb-8 flex items-center gap-2">
    <div className="relative w-full">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />
      <input
        type="text"
        placeholder="스터디 그룹 검색..."
        className="w-full border border-gray-300 rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
    </div>
  </div>
);

// ✅ 섹션
const StudySection: React.FC<{ title: string; studies: Studiesdata[] }> = ({
  title,
  studies,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const studiesPerPage = 9;
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

      {totalPages > 1 && (
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
      )}
    </section>
  );
};

// ✅ 메인 페이지
const Studygroup: React.FC = () => {
  return (
    <div className="min-h-screen bg-white px-8">
      <main className="max-w-7xl mx-auto pt-10 pb-20">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1 text-gray-800">
              스터디 그룹
            </h1>
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
