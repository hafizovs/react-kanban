# 01-kanban architecture

Optimistic Kanban board. Server state via TanStack Query + MSW; UI filters/theme via Zustand; DnD via dnd-kit.

```mermaid
flowchart LR
  ui[Board UI]
  move[features/move-task]
  query[TanStack Query]
  msw[MSW]
  ui --> move --> query --> msw
```

Dual-mode: standalone on port **5001**, and Module Federation remote `kanban/App` for `00-mfe-shell`.
