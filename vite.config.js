import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true, filename: 'bundle-visualization.html' })
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'libraryfinder-widget.js'
      },
      treeshake: true,
      external: ['/govuk-frontend-5.4.0.min.js?url']
    }
  }
})
