import { describe, expect, it } from 'vitest'

import { TaskSchema } from './model'

const validTask = {
  id: 't1',
  title: 'Example',
  description: 'Details',
  columnId: 'todo',
  assigneeId: 'a1',
  order: 0,
  updatedAt: '2026-10-01T10:00:00.000Z',
}

describe('TaskSchema', () => {
  it('parses a valid task', () => {
    expect(TaskSchema.parse(validTask)).toEqual(validTask)
  })

  it('rejects invalid column ids', () => {
    expect(() =>
      TaskSchema.parse({ ...validTask, columnId: 'backlog' }),
    ).toThrow()
  })

  it('rejects empty titles', () => {
    expect(() => TaskSchema.parse({ ...validTask, title: '' })).toThrow()
  })
})
