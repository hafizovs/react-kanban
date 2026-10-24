## Live demo

https://hafizovs.github.io/react-kanban/

# Kanban

## About

Optimistic drag-and-drop task board. Three columns start with seeded tasks, and moving a card updates the board optimistically. A dialog creates or edits a task, with an assignee filter, title search, a dark theme, and a **Fail next move** rollback.

## Capabilities

- Three columns of seeded tasks
- Optimistic drag-and-drop between columns
- Create and edit tasks in a dialog
- Filter by assignee and search by title
- Dark theme toggle
- **Fail next move** rollback with an error toast

## Functionality

- Review the seeded three-column board
- Drag a card to another column
- Create or edit a task in the dialog
- Filter by assignee, search by title, and toggle dark theme
- Enable **Fail next move**, drag again, and read the error toast

Optimistic drag-and-drop task board — React 19, Vite, TanStack Query, dnd-kit, Zustand, MSW.

## Scripts

```bash
pnpm install
pnpm dev          # http://localhost:5001
pnpm check
pnpm build
```

## Manual demo

1. Open the board — three columns with seeded tasks.
2. Drag a card to another column (optimistic update).
3. Create / edit a task via the dialog.
4. Filter by assignee and search by title.
5. Toggle dark theme.
6. Enable **Fail next move** and drag again — UI rolls back with an error toast.
