import { applyTaskMove, type Task, type TaskMove } from '@/entities/task'

export function applyOptimisticTaskMove(
  tasks: Task[] | undefined,
  move: TaskMove,
): Task[] | undefined {
  if (!tasks) {
    return tasks
  }
  return applyTaskMove(tasks, move)
}
