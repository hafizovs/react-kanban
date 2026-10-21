import { z } from 'zod'

export const ColumnIdSchema = z.enum(['todo', 'in_progress', 'done'])

export type ColumnId = z.infer<typeof ColumnIdSchema>

export const COLUMN_META: Record<ColumnId, { label: string }> = {
  todo: { label: 'To do' },
  in_progress: { label: 'In progress' },
  done: { label: 'Done' },
}

export const COLUMN_IDS = ColumnIdSchema.options
