import { BasicInput } from '@/components/basicComponents/input/BasicInput'
import type { StudyGroupForm } from '@/types/StudyGroupTypes'
import { ImageUploadBox } from '@/components/upload/ImageUploadBox'
import { MarkdownWrite } from '@/components/markdown/MarkdownWrite'

interface BasicInfoSectionProps {
  form: StudyGroupForm
  setForm: React.Dispatch<React.SetStateAction<StudyGroupForm>>
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

export const BasicInfoSection = ({
  form,
  setForm,
  handleChange,
}: BasicInfoSectionProps) => {
  const handleFileSelect = (file: File | null) => {
    setForm((prev) => ({ ...prev, image: file }))
  }

  return (
    <section className="space-y-6 border-gray-200 pb-6">
      <h2 className="text-lg font-semibold text-gray-700">기본 정보</h2>

      <div className="w-[766px]">
        <label className="mb-1 block text-sm font-medium text-gray-800">
          스터디 그룹명
          <span className="text-danger-500 ml-1">*</span>
        </label>
        <BasicInput
          name="name"
          placeholder="스터디 그룹의 이름을 입력하세요"
          required
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          스터디 그룹 소개 (선택사항)
        </label>
        <MarkdownWrite
          value={form.description}
          onChange={(action) =>
            setForm((prev) => ({
              ...prev,
              description:
                typeof action === 'function'
                  ? action(prev.description)
                  : action,
            }))
          }
          placeholder="스터디 그룹에 대한 설명을 작성하세요. 마크다운 문법을 사용할 수 있습니다."
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          스터디 그룹 대표 이미지 (선택사항)
        </label>
        <ImageUploadBox
          currentFile={form.image}
          onFileSelect={handleFileSelect}
        />
      </div>
    </section>
  )
}
