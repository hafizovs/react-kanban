import { create } from 'zustand'

type TaskFiltersState = {
  search: string
  assigneeId: string | null
  setSearch: (search: string) => void
  setAssigneeId: (assigneeId: string | null) => void
}

export const useTaskFiltersStore = create<TaskFiltersState>((set) => ({
  search: '',
  assigneeId: null,
  setSearch: (search) => set({ search }),
  setAssigneeId: (assigneeId) => set({ assigneeId }),
}))
