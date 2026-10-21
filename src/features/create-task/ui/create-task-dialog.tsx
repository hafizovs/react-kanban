import { useQuery } from '@tanstack/react-query'
import { useState, type FormEvent } from 'react'

import type { ColumnId } from '@/entities/column'
import { COLUMN_IDS, COLUMN_META } from '@/entities/column'
import { fetchAssignees, taskKeys } from '@/entities/task'
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/shared/ui'

import { useCreateTaskMutation } from '../model/use-create-task-mutation'

const UNASSIGNED = '__unassigned__'

export function CreateTaskDialog() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [columnId, setColumnId] = useState<ColumnId>('todo')
  const [assigneeId, setAssigneeId] = useState<string | null>(null)

  const { data: assignees = [] } = useQuery({
    queryKey: taskKeys.assignees,
    queryFn: fetchAssignees,
  })

  const createMutation = useCreateTaskMutation()

  function resetForm() {
    setTitle('')
    setDescription('')
    setColumnId('todo')
    setAssigneeId(null)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      return
    }

    createMutation.mutate(
      {
        title: trimmedTitle,
        description: description.trim(),
        columnId,
        assigneeId,
      },
      {
        onSuccess: () => {
          setOpen(false)
          resetForm()
        },
      },
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button">New task</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>New task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="create-title">Title</Label>
              <Input
                id="create-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="create-description">Description</Label>
              <Textarea
                id="create-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="create-column">Column</Label>
              <Select value={columnId} onValueChange={(value) => setColumnId(value as ColumnId)}>
                <SelectTrigger id="create-column">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COLUMN_IDS.map((id) => (
                    <SelectItem key={id} value={id}>
                      {COLUMN_META[id].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="create-assignee">Assignee</Label>
              <Select
                value={assigneeId ?? UNASSIGNED}
                onValueChange={(value) =>
                  setAssigneeId(value === UNASSIGNED ? null : value)
                }
              >
                <SelectTrigger id="create-assignee">
                  <SelectValue placeholder="Unassigned" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UNASSIGNED}>Unassigned</SelectItem>
                  {assignees.map((assignee) => (
                    <SelectItem key={assignee.id} value={assignee.id}>
                      {assignee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={createMutation.isPending}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
