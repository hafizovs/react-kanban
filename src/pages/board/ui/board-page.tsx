import { Board } from '@/widgets/board'
import { FilterBar } from '@/widgets/filter-bar'

export function BoardPage() {
  return (
    <div className="flex min-h-svh flex-col text-left">
      <FilterBar />
      <Board />
    </div>
  )
}
