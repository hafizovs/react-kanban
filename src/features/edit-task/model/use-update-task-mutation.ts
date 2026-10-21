import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { taskKeys, updateTask, type Task, type UpdateTaskInput } from '@/entities/task'

type UpdateArgs = { id: string; input: UpdateTaskInput }

export function useUpdateTaskMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: UpdateArgs) => updateTask(id, input),
    onSuccess: (_data: Task) => {
      toast.success('Task updated')
      void queryClient.invalidateQueries({ queryKey: taskKeys.list() })
    },
    onError: () => {
      toast.error('Failed to update task')
    },
  })
}
