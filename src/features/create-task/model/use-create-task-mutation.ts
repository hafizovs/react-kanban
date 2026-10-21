import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createTask, taskKeys, type CreateTaskInput } from '@/entities/task'

export function useCreateTaskMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateTaskInput) => createTask(input),
    onSuccess: () => {
      toast.success('Task created')
      void queryClient.invalidateQueries({ queryKey: taskKeys.list() })
    },
    onError: () => {
      toast.error('Failed to create task')
    },
  })
}
