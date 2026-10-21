import { setFailNextMove } from '@/shared/mocks'
import { Button } from '@/shared/ui'

export function FailNextMoveToggle() {
  return (
    <Button type="button" variant="outline" size="sm" onClick={() => setFailNextMove(true)}>
      Fail next move
    </Button>
  )
}
