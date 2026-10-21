# react-kanban

Optimistic drag-and-drop task board for a React CV portfolio.

**CV line:** optimistic UI and drag-and-drop task board with TanStack Query and dnd-kit

**Live:** https://hafizovs.github.io/react-kanban/

## How to run

```bash
pnpm install
pnpm dev
```

Open **http://localhost:5001**

## Stack

Vite, React 19, TypeScript, Tailwind CSS, shadcn-style UI, TanStack Query, Zustand, dnd-kit, Zod, MSW, sonner. Architecture: Feature-Sliced Design.

## Scripts

```bash
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

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Blank page | Ensure `public/mockServiceWorker.js` exists (`pnpm exec msw init public/ --save`). Check browser console. App should still mount if MSW fails. |
| Wrong port | Dev is pinned to **5001** (`strictPort`). Free the port or change the script. |

## Interview talking points

- Server state (Query) vs client UI state (Zustand)
- `onMutate` / snapshot / rollback on mutation error
- FSD layer boundaries and public slice APIs
