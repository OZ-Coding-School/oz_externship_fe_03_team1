"use client";
import React, { useState } from "react";
import { Plus, Search, Calendar, Book } from "lucide-react";
import { studiesOngoing, studiesCompleted } from "./studiesData";
import { BasicButton } from "@/components/basicComponents/BasicButton/BasicButton";
import { BasicInput } from "@/components/basicComponents/input/BasicInput";
import StudySection from "../components/studyGroup/StudySection";

const SearchBar: React.FC = () => (
  <div className="w-1/3 mb-8">
    <BasicInput
      placeholder="스터디 그룹 검색..."
      status="default"
      iconPosition="left"
    >
      <Search className="text-gray-400" size={18} />
    </BasicInput>
  </div>
);

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

  const isOngoing = title.includes("진행중");

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>

        {/* ✅ 개수 뱃지 스타일 변경 */}
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full border ${
            isOngoing
              ? "border-green-300 bg-green-200 text-green-700"
              : "border-gray-300 bg-gray-200 text-gray-700"
          }`}
        >
          {studies.length}개 {isOngoing ? "진행중" : "완료"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentStudies.map((study) => (
          <StudyCard key={study.id} study={study} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <BasicButton
            type="secondary"
            size="small"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          >
            이전
          </BasicButton>
          {[...Array(totalPages)].map((_, idx) => (
            <BasicButton
              key={idx}
              type={currentPage === idx + 1 ? "primary" : "outline"}
              size="small"
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </BasicButton>
          ))}
          <BasicButton
            type="secondary"
            size="small"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          >
            다음
          </BasicButton>
        </div>
      )}
    </section>
  );
};

const Studygroup: React.FC = () => {
  const ongoingWithLeader = studiesOngoing.map((s, i) =>
    i === 0 ? { ...s, isLeader: true } : s
  );
  const completedWithLeader = studiesCompleted.map((s, i) =>
    i === 0 ? { ...s, isLeader: true } : s
  );

  return (
    <div className="min-h-screen bg-white px-20 pt-[65px] pb-20">
      <main className="max-w-7xl mx-auto">
        {/* 헤더 영역 */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1 text-gray-800">스터디 그룹</h1>
            <p className="text-gray-600 text-sm">
              함께 공부하며 성장하는 스터디 그룹에 참여해보세요
            </p>
          </div>
          <BasicButton type="primary" size="medium">
            <Plus size={16} /> 새 스터디 만들기
          </BasicButton>
        </div>

        {/* 검색창 */}
        <SearchBar />

        {/* 스터디 섹션 */}
        <StudySection title="진행중인 스터디" studies={ongoingWithLeader} />
        <StudySection title="완료된 스터디" studies={completedWithLeader} />
      </main>
    </div>
  );
};

export default Studygroup;
