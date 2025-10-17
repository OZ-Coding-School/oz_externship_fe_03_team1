<<<<<<< HEAD
// studiesData.ts

=======
// src/data/studiesData.ts
>>>>>>> 6aa0c7f (fix : 한 화면에 9개 카드를 담은 후, 스터디 카드 더미데이터 분리 작업)
export interface Study {
  id: number;
  title: string;
  status: "진행중" | "완료";
  period: string;
  members: number;
  maxMembers: number;
  tags: string[];
  image: string;
  review?: number;
  reviewCount?: number;
<<<<<<< HEAD
  cardWidth?: string;   // ✅ 카드 너비
  cardHeight?: string;  // ✅ 카드 높이
}

// 진행중 스터디
=======
}

>>>>>>> 6aa0c7f (fix : 한 화면에 9개 카드를 담은 후, 스터디 카드 더미데이터 분리 작업)
export const studiesOngoing: Study[] = [
  {
    id: 1,
    title: "React 실무 프로젝트 스터디",
    status: "진행중",
    period: "2024년 4월 1일 ~ 2024년 4월 30일",
    members: 8,
    maxMembers: 10,
    tags: ["React", "Next.js", "프론트엔드"],
<<<<<<< HEAD
    image: "../images/IMG-76.png",
    cardWidth: "320px",
    cardHeight: "600px",
=======
    image: "/images/react-study.jpg",
>>>>>>> 6aa0c7f (fix : 한 화면에 9개 카드를 담은 후, 스터디 카드 더미데이터 분리 작업)
  },
  {
    id: 2,
    title: "Python 데이터 분석 스터디",
    status: "진행중",
    period: "2024년 1월 15일 ~ 2024년 3월 15일",
    members: 6,
    maxMembers: 8,
    tags: ["Python", "데이터 분석", "머신러닝"],
<<<<<<< HEAD
    image: "../images/IMG-136.png",
    cardWidth: "320px",
    cardHeight: "600px",
=======
    image: "/images/python-study.jpg",
>>>>>>> 6aa0c7f (fix : 한 화면에 9개 카드를 담은 후, 스터디 카드 더미데이터 분리 작업)
  },
  {
    id: 3,
    title: "AI 모델링 스터디",
    status: "진행중",
    period: "2024년 6월 1일 ~ 2024년 7월 31일",
    members: 7,
    maxMembers: 10,
    tags: ["AI", "딥러닝"],
<<<<<<< HEAD
    image: "../images/IMG-206.png",
    cardWidth: "340px",
    cardHeight: "600px",
=======
    image: "/images/ai-study.jpg",
>>>>>>> 6aa0c7f (fix : 한 화면에 9개 카드를 담은 후, 스터디 카드 더미데이터 분리 작업)
  },
  {
    id: 4,
    title: "Flutter 앱 개발 스터디",
    status: "진행중",
    period: "2024년 8월 1일 ~ 2024년 9월 30일",
    members: 5,
    maxMembers: 10,
    tags: ["Flutter", "모바일"],
<<<<<<< HEAD
    image: "../images/IMG-287.png",
    cardWidth: "340px",
    cardHeight: "600px",
=======
    image: "/images/flutter-study.jpg",
>>>>>>> 6aa0c7f (fix : 한 화면에 9개 카드를 담은 후, 스터디 카드 더미데이터 분리 작업)
  },
  {
    id: 5,
    title: "SQL 데이터베이스 스터디",
    status: "진행중",
    period: "2024년 5월 1일 ~ 2024년 6월 30일",
    members: 6,
    maxMembers: 10,
    tags: ["SQL", "DB"],
<<<<<<< HEAD
    image: "../images/IMG-363.png",
    cardWidth: "320px",
    cardHeight: "600px",
  },
];

// 완료된 스터디
=======
    image: "/images/sql-study.jpg",
  },
];

>>>>>>> 6aa0c7f (fix : 한 화면에 9개 카드를 담은 후, 스터디 카드 더미데이터 분리 작업)
export const studiesCompleted: Study[] = [
  {
    id: 6,
    title: "Node.js 백엔드 개발반",
    status: "완료",
    period: "2023년 10월 1일 ~ 2023년 12월 31일",
    members: 4,
    maxMembers: 6,
    tags: ["Node.js", "Express"],
<<<<<<< HEAD
    image: "../images/IMG-76.png",
    review: 4.7,
    reviewCount: 12,
    cardWidth: "320px",
    cardHeight: "600px",
=======
    image: "/images/node-study.jpg",
    review: 4.7,
    reviewCount: 12,
>>>>>>> 6aa0c7f (fix : 한 화면에 9개 카드를 담은 후, 스터디 카드 더미데이터 분리 작업)
  },
  {
    id: 7,
    title: "Vue.js 마스터 스터디",
    status: "완료",
    period: "2023년 9월 1일 ~ 2023년 11월 30일",
    members: 5,
    maxMembers: 6,
    tags: ["Vue", "Vuex"],
<<<<<<< HEAD
    image: "../images/IMG-136.png",
    review: 4.6,
    reviewCount: 8,
    cardWidth: "320px",
    cardHeight: "600px",
=======
    image: "/images/vue-study.jpg",
    review: 4.6,
    reviewCount: 8,
>>>>>>> 6aa0c7f (fix : 한 화면에 9개 카드를 담은 후, 스터디 카드 더미데이터 분리 작업)
  },
  {
    id: 8,
    title: "TypeScript 심화 스터디",
    status: "완료",
    period: "2023년 9월 1일 ~ 2023년 12월 15일",
    members: 5,
    maxMembers: 6,
    tags: ["TypeScript", "프론트엔드"],
<<<<<<< HEAD
    image: "../images/IMG-206.png",
    review: 4.8,
    reviewCount: 15,
    cardWidth: "320px",
    cardHeight: "600px",
=======
    image: "/images/ts-study.jpg",
    review: 4.8,
    reviewCount: 15,
>>>>>>> 6aa0c7f (fix : 한 화면에 9개 카드를 담은 후, 스터디 카드 더미데이터 분리 작업)
  },
];