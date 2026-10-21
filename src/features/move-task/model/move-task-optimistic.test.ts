import { describe, expect, it } from 'vitest'

import type { Task } from '@/entities/task'

import { applyOptimisticTaskMove } from './optimistic-task-list'

const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'A',
    description: '',
    columnId: 'todo',
    assigneeId: null,
    order: 0,
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'B',
    description: '',
    columnId: 'todo',
    assigneeId: null,
    order: 1,
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
]

describe('applyOptimisticTaskMove', () => {
  it('returns undefined when tasks are undefined', () => {
    expect(
      applyOptimisticTaskMove(undefined, {
        taskId: '1',
        columnId: 'todo',
        order: 1,
      }),
    ).toBeUndefined()
  })

  it('applies move to the task list', () => {
    const result = applyOptimisticTaskMove(sampleTasks, {
      taskId: '1',
      columnId: 'todo',
      order: 1,
    })

    expect(result).toBeDefined()
    const todoIds = result!
      .filter((task) => task.columnId === 'todo')
      .sort((a, b) => a.order - b.order)
      .map((task) => task.id)

    expect(todoIds).toEqual(['2', '1'])
  })
})
