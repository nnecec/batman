import path from 'node:path'

import generouted from '@generouted/react-router/plugin'
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  plugins: [react(), generouted()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
  },
}))
