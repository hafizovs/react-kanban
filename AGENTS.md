# 01-kanban — инструкции для агента

Optimistic Kanban board (Vite + FSD). Родительский канон: `../AGENTS.md`, спека: `../PLAN.md`.

## Команды

- Установка: `pnpm install`
- Разработка: `pnpm dev`
- Проверка: `pnpm check` (= typecheck + test)
- Сборка: `pnpm build`

Только `pnpm`.

## Карта FSD

- `src/app` — providers, styles, корневая композиция
- `src/pages/board` — экран доски
- `src/widgets/board`, `src/widgets/filter-bar`
- `src/features/create-task`, `edit-task`, `move-task`, `filter-tasks`, `toggle-theme`
- `src/entities/task`, `column`, `assignee`
- `src/shared/api`, `ui`, `lib`, `config`, `mocks`

Образец оптимистичного мутационного сценария: `src/features/move-task`.

## Границы

- Импорты только вниз по FSD. Публичный API слайса — `index.ts`.
- Серверное состояние — TanStack Query. UI-фильтры и тема — Zustand.
- MSW обслуживает `/api/tasks`. Fail-режим для демо rollback — флаг в mocks/UI.
- Документацию dnd-kit / Query — через MCP Context7.

## Критерий готовности

`pnpm check` зелёный; сценарий из `../PLAN.md` воспроизводится вручную.
