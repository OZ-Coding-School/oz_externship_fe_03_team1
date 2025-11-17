import { useMutation } from '@tanstack/react-query'
import { queryKeys } from '@/hooks/api/queryKeys'
import { queryClient } from '@/hooks/api/queryClient'
import { toast } from 'react-toastify'
import { api } from '@/api/api'

interface CreateStudyRecordParams {
  startDate?: string
  endDate?: string
}

export const useStudyRecordMutation = (groupId: string) => {
  const createRecordMutation = useMutation({
    mutationFn: (params: CreateStudyRecordParams) =>
      api.v1.studies.groups(groupId).schedules.GET(undefined, { params }),
    onSuccess: () => {
      // 스터디 기록 목록 새로고침
      queryClient.invalidateQueries({
        queryKey: queryKeys.studies.groups.notes(groupId),
      })
      toast.success('스터디 기록이 작성되었습니다.')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return {
    createRecordMutation,
  }
}
