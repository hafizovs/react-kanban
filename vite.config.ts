/// <reference types="vitest/config" />
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(() => ({
  base: process.env.GITHUB_PAGES === 'true' ? '/react-kanban/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    port: 5001,
    strictPort: true,
    origin: 'http://localhost:5001',
  },
  build: {
    target: 'chrome89',
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/shared/config/test-setup.ts'],
    globals: true,
  },
}))
