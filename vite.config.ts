// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import Path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  test: {
    environment: 'jsdom',
    setupFiles: Path.resolve(__dirname, './vitest.setup.js')
  },
  resolve: {
    alias: {
      src: Path.resolve(__dirname, './src')
    }
  }
})
