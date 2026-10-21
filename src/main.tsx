import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from '@/app/App'

import './index.css'

async function enableMocking() {
  if (import.meta.env.MODE === 'test') {
    return
  }
  try {
    const { worker } = await import('@/shared/mocks/browser')
    await worker.start({
      onUnhandledFrame: 'bypass',
      quiet: true,
      serviceWorker: {
        url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
      },
    })
  } catch (error) {
    console.error('[msw] Failed to start worker; app will still render.', error)
  }
}

function renderApp() {
  const root = document.getElementById('root')
  if (!root) {
    throw new Error('Root element #root not found')
  }
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

void enableMocking().finally(renderApp)
