import React, { useState } from "react";
import { BasicButton } from "@/components/basicComponents/BasicButton/BasicButton";
import StudyCard from "./StudyCard";
import type { Study } from "../../assets/dummyData/studiesData"; // ✅ 타입 전용 import

const StudySection: React.FC<{ title: string; studies: Study[] }> = ({
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

export default StudySection;
