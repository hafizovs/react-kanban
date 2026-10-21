import { z } from 'zod'

import { ColumnIdSchema } from '@/entities/column'

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string(),
  columnId: ColumnIdSchema,
  assigneeId: z.string().nullable(),
  order: z.number().int().nonnegative(),
  updatedAt: z.string(),
})

export type Task = z.infer<typeof TaskSchema>
