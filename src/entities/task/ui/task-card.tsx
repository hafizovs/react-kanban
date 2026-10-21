import type { HTMLAttributes } from 'react'

import { cn } from '@/shared/lib/cn'

import type { Task } from '../model'

export type TaskCardProps = {
  task: Task
  assigneeName?: string
  className?: string
  dragHandleProps?: HTMLAttributes<HTMLDivElement>
}

const DESCRIPTION_LIMIT = 120

function truncate(text: string, limit: number): string {
  if (text.length <= limit) {
    return text
  }
  return `${text.slice(0, limit).trimEnd()}…`
}

export function TaskCard({
  task,
  assigneeName,
  className,
  dragHandleProps,
}: TaskCardProps) {
  return (
    <article
      className={cn(
        'rounded-lg border border-[var(--border)] bg-[var(--bg)] p-3 text-left shadow-sm',
        className,
      )}
    >
      <div className="flex items-start gap-2">
        {dragHandleProps ? (
          <div
            {...dragHandleProps}
            className={cn(
              'mt-0.5 cursor-grab text-[var(--text)] active:cursor-grabbing',
              dragHandleProps.className,
            )}
            aria-hidden
          />
        ) : null}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-medium text-[var(--text-h)]">
            {task.title}
          </h3>
          {assigneeName ? (
            <p className="mt-1 text-xs text-[var(--text)]">{assigneeName}</p>
          ) : null}
          {task.description ? (
            <p className="mt-2 line-clamp-3 text-xs text-[var(--text)]">
              {truncate(task.description, DESCRIPTION_LIMIT)}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  )
}
