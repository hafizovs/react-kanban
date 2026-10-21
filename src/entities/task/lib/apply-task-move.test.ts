import { describe, expect, it } from 'vitest'

import type { Task } from '../model'
import { applyTaskMove } from './apply-task-move'

const baseTasks: Task[] = [
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
  {
    id: '3',
    title: 'C',
    description: '',
    columnId: 'in_progress',
    assigneeId: null,
    order: 0,
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
]

describe('applyTaskMove', () => {
  it('reorders within the same column', () => {
    const result = applyTaskMove(baseTasks, {
      taskId: '1',
      columnId: 'todo',
      order: 1,
    })

    const todoIds = result
      .filter((task) => task.columnId === 'todo')
      .sort((a, b) => a.order - b.order)
      .map((task) => task.id)

    expect(todoIds).toEqual(['2', '1'])
  })

  it('moves a task to another column at the given index', () => {
    const result = applyTaskMove(baseTasks, {
      taskId: '1',
      columnId: 'in_progress',
      order: 1,
    })

    const moved = result.find((task) => task.id === '1')
    expect(moved?.columnId).toBe('in_progress')
    expect(moved?.order).toBe(1)

    const inProgressIds = result
      .filter((task) => task.columnId === 'in_progress')
      .sort((a, b) => a.order - b.order)
      .map((task) => task.id)

    expect(inProgressIds).toEqual(['3', '1'])
  })

  it('returns the original list when the task is missing', () => {
    expect(
      applyTaskMove(baseTasks, {
        taskId: 'missing',
        columnId: 'todo',
        order: 0,
      }),
    ).toEqual(baseTasks)
  })
})
