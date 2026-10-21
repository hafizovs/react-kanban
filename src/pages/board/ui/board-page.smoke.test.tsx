import { render, screen, waitFor } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import { Providers } from '@/app/providers'
import { handlers } from '@/shared/mocks/handlers'
import { resetMockDb } from '@/shared/mocks'

import { BoardPage } from './board-page'

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen({ onUnhandledFrame: 'error' })
})

afterEach(() => {
  server.resetHandlers()
  resetMockDb()
})

afterAll(() => {
  server.close()
})

describe('BoardPage smoke', () => {
  it('renders filter bar and three columns with seeded tasks', async () => {
    render(
      <Providers>
        <BoardPage />
      </Providers>,
    )

    expect(screen.getByLabelText(/search tasks/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText(/to do/i)).toBeInTheDocument()
      expect(screen.getByText(/in progress/i)).toBeInTheDocument()
      expect(screen.getByText(/done/i)).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText(/set up project board/i)).toBeInTheDocument()
    })
  })
})
