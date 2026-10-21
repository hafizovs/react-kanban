import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { taskKeys, updateTask, type Task, type TaskMove } from '@/entities/task'

import { applyOptimisticTaskMove } from './optimistic-task-list'

type MoveContext = {
  previous: Task[] | undefined
}

export function useMoveTaskMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ taskId, columnId, order }: TaskMove) =>
      updateTask(taskId, { columnId, order }),
    onMutate: async (move) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.list() })
      const previous = queryClient.getQueryData<Task[]>(taskKeys.list())
      queryClient.setQueryData<Task[]>(taskKeys.list(), (current) =>
        applyOptimisticTaskMove(current, move),
      )
      return { previous } satisfies MoveContext
    },
    onSuccess: () => {
      toast.success('Task moved')
    },
    onError: (_error, _move, context) => {
      if (context?.previous) {
        queryClient.setQueryData(taskKeys.list(), context.previous)
      }
      toast.error('Failed to move task — rolled back')
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: taskKeys.list() })
    },
  })
}
