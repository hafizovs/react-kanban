import {
  DndContext,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

import { COLUMN_IDS } from '@/entities/column'
import { EditTaskDialog } from '@/features/edit-task'
import { filterTasksBySearchAndAssignee, useTaskFilters } from '@/features/filter-tasks'
import { resolveTaskMoveFromDragEnd, useMoveTaskMutation } from '@/features/move-task'
import { fetchAssignees, fetchTasks, taskKeys, type Task } from '@/entities/task'
import { Button } from '@/shared/ui'

import { BoardColumn } from './board-column'

export function Board() {
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [editOpen, setEditOpen] = useState(false)

  const { search, assigneeId } = useTaskFilters()

  const tasksQuery = useQuery({
    queryKey: taskKeys.list(),
    queryFn: fetchTasks,
  })

  const assigneesQuery = useQuery({
    queryKey: taskKeys.assignees,
    queryFn: fetchAssignees,
  })

  const moveMutation = useMoveTaskMutation()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  )

  const assigneeNameById = useMemo(() => {
    const map = new Map<string, string>()
    for (const assignee of assigneesQuery.data ?? []) {
      map.set(assignee.id, assignee.name)
    }
    return map
  }, [assigneesQuery.data])

  const filteredTasks = useMemo(() => {
    if (!tasksQuery.data) {
      return []
    }
    return filterTasksBySearchAndAssignee(tasksQuery.data, search, assigneeId)
  }, [tasksQuery.data, search, assigneeId])

  const tasksByColumn = useMemo(() => {
    const map = new Map<string, Task[]>()
    for (const columnId of COLUMN_IDS) {
      map.set(columnId, [])
    }
    for (const task of filteredTasks) {
      const list = map.get(task.columnId) ?? []
      list.push(task)
      map.set(task.columnId, list)
    }
    for (const list of map.values()) {
      list.sort((a, b) => a.order - b.order)
    }
    return map
  }, [filteredTasks])

  function handleDragEnd(event: DragEndEvent) {
    if (!tasksQuery.data) {
      return
    }
    const move = resolveTaskMoveFromDragEnd(event, tasksQuery.data)
    if (!move) {
      return
    }
    moveMutation.mutate(move)
  }

  function handleSelectTask(task: Task) {
    setEditingTask(task)
    setEditOpen(true)
  }

  if (tasksQuery.isPending || assigneesQuery.isPending) {
    return (
      <p className="px-4 py-8 text-left text-sm text-[var(--text)]">Loading board…</p>
    )
  }

  if (tasksQuery.isError || assigneesQuery.isError) {
    return (
      <div className="flex flex-col items-start gap-3 px-4 py-8 text-left">
        <p className="text-sm text-red-600">Failed to load the board.</p>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            void tasksQuery.refetch()
            void assigneesQuery.refetch()
          }}
        >
          Retry
        </Button>
      </div>
    )
  }

  const hasTasks = (tasksQuery.data?.length ?? 0) > 0
  const hasFilteredResults = filteredTasks.length > 0

  return (
    <>
      {!hasFilteredResults ? (
        <p className="px-4 py-6 text-left text-sm text-[var(--text)]">
          {hasTasks ? 'No tasks match your filters.' : 'No tasks yet. Create one to get started.'}
        </p>
      ) : null}
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="grid flex-1 gap-4 px-4 pb-6 md:grid-cols-3">
          {COLUMN_IDS.map((columnId) => (
            <BoardColumn
              key={columnId}
              columnId={columnId}
              tasks={tasksByColumn.get(columnId) ?? []}
              assigneeNameById={assigneeNameById}
              onSelectTask={handleSelectTask}
            />
          ))}
        </div>
      </DndContext>
      <EditTaskDialog
        task={editingTask}
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open)
          if (!open) {
            setEditingTask(null)
          }
        }}
      />
    </>
  )
}
