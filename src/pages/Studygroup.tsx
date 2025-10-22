"use client";
import React from "react";
import { Plus, Search } from "lucide-react";
import { studiesOngoing, studiesCompleted } from "../assets/dummyData/studiesData";
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
