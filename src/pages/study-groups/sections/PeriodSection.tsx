import { useModal } from '@/hooks/useModal'
import { BasicInput } from '@/components/basicComponents/input/BasicInput'
import type { StudyGroupForm } from '@/types/StudyGroupTypes'
import { CustomSlider } from '@/components/slider/CustomSlider'
import { Calendar } from 'lucide-react'
import dayjs from '@/lib/dayjs'
import { storeDatePicker } from '@/store/storeDatePicker'

interface Props {
  form: StudyGroupForm
  setForm: React.Dispatch<React.SetStateAction<StudyGroupForm>>
}

export const PeriodSection = ({ form, setForm }: Props) => {
  const { openModal } = useModal()
  const { startDate, endDate } = storeDatePicker()

  const studyStartDate = startDate ? dayjs(startDate).format('L') : ''
  const studyEndDate = endDate ? dayjs(endDate).format('L') : ''

  const handleOpenDatePicker = (type: 'start' | 'end') => {
    openModal('DATE_PICKER', {
      title: type === 'start' ? '스터디 시작일 선택' : '스터디 종료일 선택',
      modalProps: { target: type },
    })
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    setForm((prev) => ({ ...prev, maxMembers: newValue }))
  }

  return (
    <section className="space-y-6 pt-2">
      <h2 className="text-lg font-semibold text-gray-800">
        스터디 기간 및 인원
      </h2>

      <div className="flex gap-6">
        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            스터디 시작일
            <span className="text-danger-500 ml-1">*</span>
          </label>
          <div className="relative">
            <BasicInput
              name="startDate"
              placeholder="날짜를 선택하세요"
              value={studyStartDate}
              readOnly
              onClick={() => handleOpenDatePicker('start')}
            />
            <Calendar
              className="absolute top-1/2 right-3 h-[16px] w-[16px] -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
              onClick={() => handleOpenDatePicker('start')}
            />
          </div>
        </div>

        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            스터디 종료일
            <span className="text-danger-500 ml-1">*</span>
          </label>
          <div className="relative">
            <BasicInput
              name="endDate"
              placeholder="날짜를 선택하세요"
              value={studyEndDate}
              readOnly
              onClick={() => handleOpenDatePicker('end')}
            />
            <Calendar
              className="absolute top-1/2 right-3 h-[16px] w-[16px] -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
              onClick={() => handleOpenDatePicker('end')}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          최대 인원 수<span className="text-danger-500 ml-1">*</span>
        </label>

        <div className="mt-3 flex items-center justify-between gap-8">
          <div className="flex-1">
            <CustomSlider
              min={2}
              max={10}
              value={form.maxMembers}
              onChange={handleSliderChange}
              color="#007BFF"
            />
            <div className="mt-2 flex justify-between text-sm text-gray-500">
              <span>2명</span>
              <span>10명</span>
            </div>
          </div>

          <div className="flex items-center gap-[6px] pr-1 text-[15px] font-semibold text-gray-800">
            <img
              src="/icons/group-members-icon.svg"
              alt="인원 아이콘"
              className="h-[16px] w-[16px] select-none"
              draggable="false"
            />
            <span>{form.maxMembers}</span>
            <span className="text-sm font-medium text-gray-500">명</span>
          </div>
        </div>
      </div>
    </section>
  )
}
