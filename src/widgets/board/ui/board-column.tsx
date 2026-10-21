import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { COLUMN_META, type ColumnId } from '@/entities/column'
import type { Task } from '@/entities/task'
import { SortableTaskCard } from '@/features/move-task'
import { cn } from '@/shared/lib/cn'

type BoardColumnProps = {
  columnId: ColumnId
  tasks: Task[]
  assigneeNameById: Map<string, string>
  onSelectTask: (task: Task) => void
}

export function BoardColumn({
  columnId,
  tasks,
  assigneeNameById,
  onSelectTask,
}: BoardColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: columnId })
  const taskIds = tasks.map((task) => task.id)

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col">
      <h2 className="mb-3 text-left text-sm font-semibold text-[var(--text-h)]">
        {COLUMN_META[columnId].label}
      </h2>
      <div
        ref={setNodeRef}
        className={cn(
          'flex min-h-[12rem] flex-1 flex-col gap-2 rounded-lg border border-dashed border-[var(--border)] bg-[var(--muted)]/30 p-2 transition-colors',
          isOver && 'border-[var(--accent-border)] bg-[var(--accent-bg)]',
        )}
      >
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <SortableTaskCard
              key={task.id}
              task={task}
              assigneeName={
                task.assigneeId ? assigneeNameById.get(task.assigneeId) : undefined
              }
              onSelect={onSelectTask}
            />
          ))}
        </SortableContext>
        {tasks.length === 0 ? (
          <p className="py-8 text-center text-xs text-[var(--text)]">Drop tasks here</p>
        ) : null}
      </div>
    </section>
  )
}
