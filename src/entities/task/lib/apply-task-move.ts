import type { ColumnId } from '@/entities/column'

import type { Task } from '../model'

export type TaskMove = {
  taskId: string
  columnId: ColumnId
  order: number
}

const COLUMN_ORDER: ColumnId[] = ['todo', 'in_progress', 'done']

function groupByColumn(tasks: Task[]): Map<ColumnId, Task[]> {
  const map = new Map<ColumnId, Task[]>()
  for (const columnId of COLUMN_ORDER) {
    map.set(columnId, [])
  }
  for (const task of tasks) {
    const list = map.get(task.columnId) ?? []
    list.push({ ...task })
    map.set(task.columnId, list)
  }
  for (const list of map.values()) {
    list.sort((a, b) => a.order - b.order)
  }
  return map
}

function normalizeOrders(list: Task[]): Task[] {
  return list.map((task, index) => ({ ...task, order: index }))
}

export function applyTaskMove(tasks: Task[], move: TaskMove): Task[] {
  const columns = groupByColumn(tasks)
  let sourceColumnId: ColumnId | undefined
  let removed: Task | undefined

  for (const [columnId, list] of columns) {
    const index = list.findIndex((task) => task.id === move.taskId)
    if (index === -1) {
      continue
    }
    sourceColumnId = columnId
    removed = list.splice(index, 1)[0]
    columns.set(columnId, normalizeOrders(list))
    break
  }

  if (!removed || sourceColumnId === undefined) {
    return tasks
  }

  const destination =
    sourceColumnId === move.columnId
      ? (columns.get(move.columnId) ?? [])
      : [...(columns.get(move.columnId) ?? [])]

  const insertAt = Math.max(0, Math.min(move.order, destination.length))
  destination.splice(insertAt, 0, {
    ...removed,
    columnId: move.columnId,
    updatedAt: new Date().toISOString(),
  })
  columns.set(move.columnId, normalizeOrders(destination))

  return COLUMN_ORDER.flatMap((columnId) => columns.get(columnId) ?? [])
}
