import { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import type { StudyGroupForm } from '@/types/StudyGroupTypes'
import { BasicInfoSection } from './sections/BasicInfoSection'
import { PeriodSection } from './sections/PeriodSection'
import { LectureSection } from './sections/LectureSection'
import { studyGroupFormMock } from '@/assets/dummyData/dummyStudyGroup'
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton'
import dayjs from '@/lib/dayjs'
import { useNavigate } from 'react-router'
import { storeDatePicker } from '@/store/storeDatePicker'

export const CreateStudyGroup = () => {
  const [form, setForm] = useState<StudyGroupForm>({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    maxMembers: 2,
    lectures: [],
    image: null,
  })

  const [isEdit, setIsEdit] = useState(false)
  const { startDate, endDate, reset } = storeDatePicker()
  const navigate = useNavigate()

  useEffect(() => {
    if (window.location.pathname.includes('edit')) {
      setIsEdit(true)
      setForm(studyGroupFormMock)
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (!form.name || !form.startDate) {
      alert('필수 항목을 모두 입력해주세요.')
      return
    }

    if (isEdit) {
      alert('스터디 그룹이 수정되었습니다.')
    } else {
      alert('스터디 그룹이 생성되었습니다.')
    }

    setForm({
      ...form,
      startDate: dayjs(startDate).format('YYYY-MM-DD'),
      endDate: dayjs(endDate).format('YYYY-MM-DD'),
    })
    reset()
  }

  const handleBack = () => {
    reset()
    navigate('/')
  }

  return (
    <div className="relative min-h-screen w-full bg-[#FAFAFA] py-10">
      <div className="mx-auto mb-8 flex h-[96px] w-[832px] items-center gap-4">
        <button
          onClick={handleBack}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
        >
          <ArrowLeft size={20} strokeWidth={2} />
        </button>

        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {isEdit ? '스터디 그룹 수정' : '새 스터디 그룹 만들기'}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {isEdit
              ? '스터디 그룹 정보를 수정해주세요.'
              : '함께 공부할 멤버들과 스터디 그룹을 시작해보세요.'}
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-[832px] space-y-6">
        <section className="rounded-2xl bg-white p-10 shadow-sm">
          <BasicInfoSection
            form={form}
            setForm={setForm}
            handleChange={handleChange}
          />
        </section>

        <section className="rounded-2xl bg-white p-10 shadow-sm">
          <PeriodSection form={form} setForm={setForm} />
        </section>

        <section className="rounded-2xl bg-white p-10 shadow-sm">
          <LectureSection />
        </section>

        <div className="flex justify-end gap-3 pt-8">
          <BasicButton
            variant="outline"
            onClick={handleBack}
            className="h-[50px] min-w-[80px] px-6 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            취소
          </BasicButton>

          <BasicButton variant="primary" onClick={handleSubmit}>
            {isEdit ? '스터디 그룹 수정하기' : '스터디 그룹 만들기'}
          </BasicButton>
        </div>
      </main>
    </div>
  )
}
