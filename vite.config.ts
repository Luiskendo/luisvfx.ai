import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Despliegue en GitHub Pages (página de proyecto):
// https://luiskendo.github.io/luisvfx.ai/
export default defineConfig({
  base: '/luisvfx.ai/',
  plugins: [react()],
  server: { host: true },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        privacidad: 'privacidad.html',
      },
    },
  },
})
