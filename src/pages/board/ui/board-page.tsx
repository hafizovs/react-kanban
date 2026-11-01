import { Board } from '@/widgets/board'
import { FilterBar } from '@/widgets/filter-bar'

export function BoardPage() {
  return (
    <div className="flex min-h-svh w-full min-w-0 flex-col overflow-x-clip text-left">
      <FilterBar />
      <Board />
    </div>
  )
}
