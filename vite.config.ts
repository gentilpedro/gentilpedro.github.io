import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * O GitHub Pages serve `404.html` para qualquer caminho desconhecido. Publicando
 * uma cópia do `index.html` com esse nome, o app carrega normalmente e o
 * react-router resolve a rota (mostrando a página 404 quando for o caso).
 */
function githubPagesSpaFallback(outDir: string) {
  return {
    name: 'gh-pages-spa-fallback',
    apply: 'build' as const,
    closeBundle() {
      const dir = resolve(process.cwd(), outDir)
      copyFileSync(resolve(dir, 'index.html'), resolve(dir, '404.html'))
    },
  }
}

// Site de usuário do GitHub Pages (gentilpedro.github.io) serve na raiz do domínio.
export default defineConfig({
  base: '/',
  plugins: [react(), githubPagesSpaFallback('dist')],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
