import type { Task } from '@/entities/task'

export function filterTasksBySearchAndAssignee(
  tasks: Task[],
  search: string,
  assigneeId: string | null,
): Task[] {
  const query = search.trim().toLowerCase()

  return tasks.filter((task) => {
    if (assigneeId !== null && task.assigneeId !== assigneeId) {
      return false
    }
    if (!query) {
      return true
    }
    return (
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query)
    )
  })
}
