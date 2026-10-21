import type { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { COLUMN_IDS, type ColumnId } from '@/entities/column'
import type { Task, TaskMove } from '@/entities/task'

function isColumnId(id: string): id is ColumnId {
  return (COLUMN_IDS as readonly string[]).includes(id)
}

function sortedColumnTasks(tasks: Task[], columnId: ColumnId): Task[] {
  return tasks
    .filter((task) => task.columnId === columnId)
    .sort((a, b) => a.order - b.order)
}

export function resolveTaskMoveFromDragEnd(
  event: DragEndEvent,
  tasks: Task[],
): TaskMove | null {
  const { active, over } = event
  if (!over) {
    return null
  }

  const taskId = String(active.id)
  const task = tasks.find((item) => item.id === taskId)
  if (!task) {
    return null
  }

  const overId = String(over.id)

  if (isColumnId(overId)) {
    const targetColumnId = overId
    const columnTasks = sortedColumnTasks(
      tasks.filter((item) => item.id !== taskId),
      targetColumnId,
    )
    return {
      taskId,
      columnId: targetColumnId,
      order: columnTasks.length,
    }
  }

  const overTask = tasks.find((item) => item.id === overId)
  if (!overTask) {
    return null
  }

  const targetColumnId = overTask.columnId

  if (task.columnId !== targetColumnId) {
    const columnTasks = sortedColumnTasks(
      tasks.filter((item) => item.id !== taskId),
      targetColumnId,
    )
    const overIndex = columnTasks.findIndex((item) => item.id === overId)
    return {
      taskId,
      columnId: targetColumnId,
      order: overIndex >= 0 ? overIndex : columnTasks.length,
    }
  }

  const columnTasks = sortedColumnTasks(tasks, targetColumnId)
  const oldIndex = columnTasks.findIndex((item) => item.id === taskId)
  const newIndex = columnTasks.findIndex((item) => item.id === overId)

  if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
    return null
  }

  const reordered = arrayMove(columnTasks, oldIndex, newIndex)
  const order = reordered.findIndex((item) => item.id === taskId)

  return {
    taskId,
    columnId: targetColumnId,
    order,
  }
}
