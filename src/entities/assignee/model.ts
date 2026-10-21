import { z } from 'zod'

export const AssigneeSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
})

export type Assignee = z.infer<typeof AssigneeSchema>
