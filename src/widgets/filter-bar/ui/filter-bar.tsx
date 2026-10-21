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
    <header className="flex flex-col gap-4 border-b border-[var(--border)] px-4 py-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
      <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-end">
        <div className="grid w-full max-w-sm gap-2 sm:w-auto">
          <Label htmlFor="task-search">Search tasks</Label>
          <Input
            id="task-search"
            placeholder="Search tasks"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="grid w-full max-w-xs gap-2 sm:w-48">
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
      <div className="flex flex-wrap items-center gap-2">
        <CreateTaskDialog />
        <ThemeToggle />
        <FailNextMoveToggle />
      </div>
    </header>
  )
}
