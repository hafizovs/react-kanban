export type SeedAssignee = {
  id: string
  name: string
}

export type SeedTask = {
  id: string
  title: string
  description: string
  columnId: 'todo' | 'in_progress' | 'done'
  assigneeId: string | null
  order: number
  updatedAt: string
}

export const seedAssignees: SeedAssignee[] = [
  { id: 'a1', name: 'Alex Morgan' },
  { id: 'a2', name: 'Jordan Lee' },
  { id: 'a3', name: 'Sam Rivera' },
]

export const seedColumns = [
  { id: 'todo' as const, label: 'To do' },
  { id: 'in_progress' as const, label: 'In progress' },
  { id: 'done' as const, label: 'Done' },
]

export const seedTasks: SeedTask[] = [
  {
    id: 't1',
    title: 'Set up project board',
    description: 'Initialize the kanban layout and column headers.',
    columnId: 'todo',
    assigneeId: 'a1',
    order: 0,
    updatedAt: '2026-10-01T10:00:00.000Z',
  },
  {
    id: 't2',
    title: 'Wire MSW handlers',
    description: 'Mock CRUD endpoints for tasks and assignees.',
    columnId: 'todo',
    assigneeId: 'a2',
    order: 1,
    updatedAt: '2026-10-02T11:30:00.000Z',
  },
  {
    id: 't3',
    title: 'Implement drag and drop',
    description: 'Move cards between columns with optimistic updates.',
    columnId: 'in_progress',
    assigneeId: 'a1',
    order: 0,
    updatedAt: '2026-10-03T09:15:00.000Z',
  },
  {
    id: 't4',
    title: 'Add task dialog',
    description: 'Create and edit tasks in a modal form.',
    columnId: 'in_progress',
    assigneeId: 'a3',
    order: 1,
    updatedAt: '2026-10-04T14:00:00.000Z',
  },
  {
    id: 't5',
    title: 'Filter by assignee',
    description: 'Search and narrow the board by team member.',
    columnId: 'done',
    assigneeId: 'a2',
    order: 0,
    updatedAt: '2026-10-05T16:45:00.000Z',
  },
  {
    id: 't6',
    title: 'Theme toggle',
    description: 'Switch between light and dark presentation.',
    columnId: 'done',
    assigneeId: null,
    order: 1,
    updatedAt: '2026-10-06T08:20:00.000Z',
  },
]
