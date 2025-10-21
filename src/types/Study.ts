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
