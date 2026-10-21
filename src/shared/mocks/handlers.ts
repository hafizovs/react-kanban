import { http, HttpResponse } from 'msw'

import {
  getAssignees,
  getFailNextMove,
  getTaskById,
  getTasks,
  setFailNextMove,
  setTasks,
} from './db'
import type { SeedTask } from './seed'

const COLUMN_SORT_ORDER = ['todo', 'in_progress', 'done'] as const

function sortTasks(tasks: SeedTask[]): SeedTask[] {
  return [...tasks].sort((a, b) => {
    const columnDiff =
      COLUMN_SORT_ORDER.indexOf(a.columnId) - COLUMN_SORT_ORDER.indexOf(b.columnId)
    if (columnDiff !== 0) {
      return columnDiff
    }
    return a.order - b.order
  })
}

type CreateTaskBody = {
  title: string
  description: string
  columnId: SeedTask['columnId']
  assigneeId: string | null
  order?: number
}

type UpdateTaskBody = Partial<Omit<SeedTask, 'id'>>

export const handlers = [
  http.get('/api/tasks', () => {
    return HttpResponse.json(sortTasks(getTasks()))
  }),

  http.get('/api/assignees', () => {
    return HttpResponse.json(getAssignees())
  }),

  http.post('/api/tasks', async ({ request }) => {
    const body = (await request.json()) as CreateTaskBody
    const tasks = getTasks()
    const orderInColumn =
      body.order ??
      tasks.filter((task) => task.columnId === body.columnId).length

    const task: SeedTask = {
      id: crypto.randomUUID(),
      title: body.title,
      description: body.description,
      columnId: body.columnId,
      assigneeId: body.assigneeId,
      order: orderInColumn,
      updatedAt: new Date().toISOString(),
    }

    setTasks([...tasks, task])
    return HttpResponse.json(task, { status: 201 })
  }),

  http.patch('/api/tasks/:id', async ({ params, request }) => {
    const id = String(params.id)
    const existing = getTaskById(id)
    if (!existing) {
      return HttpResponse.json({ message: 'Task not found' }, { status: 404 })
    }

    const body = (await request.json()) as UpdateTaskBody
    const columnIdChanging =
      body.columnId !== undefined && body.columnId !== existing.columnId

    if (columnIdChanging && getFailNextMove()) {
      setFailNextMove(false)
      return HttpResponse.json(
        { message: 'Simulated move failure' },
        { status: 500 },
      )
    }

    const updated: SeedTask = {
      ...existing,
      ...body,
      id: existing.id,
      updatedAt: new Date().toISOString(),
    }

    setTasks(getTasks().map((task) => (task.id === id ? updated : task)))
    return HttpResponse.json(updated)
  }),

  http.delete('/api/tasks/:id', ({ params }) => {
    const id = String(params.id)
    const existing = getTaskById(id)
    if (!existing) {
      return HttpResponse.json({ message: 'Task not found' }, { status: 404 })
    }

    setTasks(getTasks().filter((task) => task.id !== id))
    return new HttpResponse(null, { status: 204 })
  }),
]
