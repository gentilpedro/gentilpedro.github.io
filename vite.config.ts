import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Site de usuário do GitHub Pages (gentilpedro.github.io) serve na raiz do domínio.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
