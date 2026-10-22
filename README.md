## Live demo

https://hafizovs.github.io/react-kanban/

# Kanban

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
