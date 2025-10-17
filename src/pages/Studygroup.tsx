"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
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

// ✅ 스터디 카드
const StudyCard: React.FC<{ study: Studiesdata }> = ({ study }) => (
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
        <div className="text-sm text-gray-600 mb-2 flex items-center">
          <StarIcon size={16} color="#FBBF24" />
          {study.review.toFixed(1)}
          {study.reviewCount && (
            <span className="text-gray-500 text-xs ml-1">
              ({study.reviewCount})
            </span>
          )}
        </div>
      )}
    </div>

    {study.status === "완료" ? (
      <div className="relative border-t border-gray-100 px-5 py-10 flex justify-center items-center">
        <button className="bg-amber-500 text-white text-base font-semibold px-28 py-1.5 rounded-lg hover:bg-amber-600 transition cursor-pointer mt-2">
          리뷰 작성
        </button>
        <button className="absolute top-3 right-5 text-amber-600 text-sm font-medium hover:underline cursor-pointer">
          상세 보기
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

// ✅ 섹션 (3열 × 3행 = 9개씩 페이지네이션)
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
          {studies.length}개{" "}
          {title.includes("진행중") ? "진행중" : "완료"}
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
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
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

        {/* ✅ 각각 독립된 9개 페이지네이션 */}
        <StudySection title="진행중인 스터디" studies={studiesOngoing} />
        <StudySection title="완료된 스터디" studies={studiesCompleted} />
      </main>
    </div>
  );
};

export default Studygroup;
