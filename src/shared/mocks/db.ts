import { seedAssignees, seedTasks, type SeedAssignee, type SeedTask } from './seed'

let tasks: SeedTask[] = structuredClone(seedTasks)
let assignees: SeedAssignee[] = structuredClone(seedAssignees)
let failNextMove = false

export function getAssignees(): SeedAssignee[] {
  return assignees
}

export function getTasks(): SeedTask[] {
  return tasks
}

export function setTasks(next: SeedTask[]): void {
  tasks = next
}

export function getTaskById(id: string): SeedTask | undefined {
  return tasks.find((task) => task.id === id)
}

export function getFailNextMove(): boolean {
  return failNextMove
}

export function setFailNextMove(value: boolean): void {
  failNextMove = value
}

export function resetMockDb(): void {
  tasks = structuredClone(seedTasks)
  assignees = structuredClone(seedAssignees)
  failNextMove = false
}
