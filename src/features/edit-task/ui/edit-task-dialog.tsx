import { useQuery } from '@tanstack/react-query'
import { useEffect, useState, type FormEvent } from 'react'

import type { ColumnId } from '@/entities/column'
import { COLUMN_IDS, COLUMN_META } from '@/entities/column'
import { fetchAssignees, taskKeys, type Task } from '@/entities/task'
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/shared/ui'

import { useUpdateTaskMutation } from '../model/use-update-task-mutation'

const UNASSIGNED = '__unassigned__'

type EditTaskDialogProps = {
  task: Task | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditTaskDialog({ task, open, onOpenChange }: EditTaskDialogProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [columnId, setColumnId] = useState<ColumnId>('todo')
  const [assigneeId, setAssigneeId] = useState<string | null>(null)

  const { data: assignees = [] } = useQuery({
    queryKey: taskKeys.assignees,
    queryFn: fetchAssignees,
  })

  const updateMutation = useUpdateTaskMutation()

  useEffect(() => {
    if (!task) {
      return
    }
    setTitle(task.title)
    setDescription(task.description)
    setColumnId(task.columnId)
    setAssigneeId(task.assigneeId)
  }, [task])

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!task) {
      return
    }
    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      return
    }

    updateMutation.mutate(
      {
        id: task.id,
        input: {
          title: trimmedTitle,
          description: description.trim(),
          columnId,
          assigneeId,
        },
      },
      {
        onSuccess: () => {
          onOpenChange(false)
        },
      },
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-column">Column</Label>
              <Select value={columnId} onValueChange={(value) => setColumnId(value as ColumnId)}>
                <SelectTrigger id="edit-column">
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
              <Label htmlFor="edit-assignee">Assignee</Label>
              <Select
                value={assigneeId ?? UNASSIGNED}
                onValueChange={(value) =>
                  setAssigneeId(value === UNASSIGNED ? null : value)
                }
              >
                <SelectTrigger id="edit-assignee">
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
            <Button type="submit" disabled={!task || updateMutation.isPending}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
