import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { MouseEvent } from 'react'

import { TaskCard, type Task } from '@/entities/task'
import { cn } from '@/shared/lib/cn'

type SortableTaskCardProps = {
  task: Task
  assigneeName?: string
  onSelect: (task: Task) => void
}

export function SortableTaskCard({ task, assigneeName, onSelect }: SortableTaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    if (isDragging) {
      return
    }
    event.stopPropagation()
    onSelect(task)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn('cursor-grab touch-none active:cursor-grabbing', isDragging && 'z-10 opacity-60')}
      {...attributes}
      {...listeners}
      onClick={handleClick}
    >
      <TaskCard task={task} assigneeName={assigneeName} />
    </div>
  )
}
