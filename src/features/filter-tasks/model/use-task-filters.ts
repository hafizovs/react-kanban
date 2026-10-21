import { useTaskFiltersStore } from './task-filters-store'

export function useTaskFilters() {
  const search = useTaskFiltersStore((state) => state.search)
  const assigneeId = useTaskFiltersStore((state) => state.assigneeId)
  const setSearch = useTaskFiltersStore((state) => state.setSearch)
  const setAssigneeId = useTaskFiltersStore((state) => state.setAssigneeId)

  return { search, assigneeId, setSearch, setAssigneeId }
}
