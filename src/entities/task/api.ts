import { apiFetch } from '@/shared/api'

import type { Assignee } from '@/entities/assignee'

import type { ColumnId } from '@/entities/column'

import { TaskSchema, type Task } from './model'

export const taskKeys = {
  all: ['tasks'] as const,
  list: () => [...taskKeys.all, 'list'] as const,
  assignees: ['assignees'] as const,
}

export type CreateTaskInput = {
  title: string
  description: string
  columnId: ColumnId
  assigneeId: string | null
  order?: number
}

export type UpdateTaskInput = Partial<Omit<Task, 'id'>>

export async function fetchTasks(): Promise<Task[]> {
  const data = await apiFetch<Task[]>('/api/tasks')
  return data.map((task) => TaskSchema.parse(task))
}

export async function fetchAssignees(): Promise<Assignee[]> {
  return apiFetch<Assignee[]>('/api/assignees')
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const data = await apiFetch<Task>('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(input),
  })
  return TaskSchema.parse(data)
}

export async function updateTask(id: string, input: UpdateTaskInput): Promise<Task> {
  const data = await apiFetch<Task>(`/api/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  })
  return TaskSchema.parse(data)
}

export async function deleteTask(id: string): Promise<void> {
  await apiFetch<void>(`/api/tasks/${id}`, { method: 'DELETE' })
}
