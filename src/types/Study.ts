type Lectures = number[]

export type StudyGroup = {
  id: number
  name: string
  introduction: string
  profile_img_url: string
  max_headcount: number
  start_at: string
  end_at: string
  lectures: Lectures
}
export type Study = {
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
  cardWidth?: string;   // ✅ 카드 너비
  cardHeight?: string;  // ✅ 카드 높이
};