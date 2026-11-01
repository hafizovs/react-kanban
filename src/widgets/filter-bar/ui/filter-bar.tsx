import { useQuery } from '@tanstack/react-query'

import { CreateTaskDialog } from '@/features/create-task'
import { useTaskFilters } from '@/features/filter-tasks'
import { FailNextMoveToggle } from '@/features/move-task'
import { ThemeToggle } from '@/features/toggle-theme'
import { fetchAssignees, taskKeys } from '@/entities/task'
import { Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui'

const ALL_ASSIGNEES = '__all__'

export function FilterBar() {
  const { search, assigneeId, setSearch, setAssigneeId } = useTaskFilters()

  const { data: assignees = [] } = useQuery({
    queryKey: taskKeys.assignees,
    queryFn: fetchAssignees,
  })

  return (
    <header className="flex flex-col gap-4 border-b border-[var(--border)] px-3 py-4 sm:px-4 md:flex-row md:flex-wrap md:items-end md:justify-between">
      <div className="flex min-w-0 flex-1 flex-col gap-4 md:flex-row md:items-end md:gap-4">
        <div className="grid min-w-0 w-full gap-2 md:max-w-sm md:flex-1">
          <Label htmlFor="task-search">Search tasks</Label>
          <Input
            id="task-search"
            placeholder="Search tasks"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="grid min-w-0 w-full gap-2 md:w-48 md:shrink-0">
          <Label htmlFor="assignee-filter">Assignee</Label>
          <Select
            value={assigneeId ?? ALL_ASSIGNEES}
            onValueChange={(value) =>
              setAssigneeId(value === ALL_ASSIGNEES ? null : value)
            }
          >
            <SelectTrigger id="assignee-filter">
              <SelectValue placeholder="All assignees" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_ASSIGNEES}>All assignees</SelectItem>
              {assignees.map((assignee) => (
                <SelectItem key={assignee.id} value={assignee.id}>
                  {assignee.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex min-w-0 flex-wrap items-center gap-2 md:shrink-0">
        <CreateTaskDialog />
        <ThemeToggle />
        <FailNextMoveToggle />
      </div>
    </header>
  )
}
