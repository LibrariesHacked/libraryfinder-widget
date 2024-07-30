import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'libraryfinder-widget.js'
      },
      external: ['/govuk-frontend-5.4.0.min.js?url']
    }
  }
})
