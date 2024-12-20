import { defineConfig } from 'vitest/config'
import swc from 'unplugin-swc'

export default defineConfig({
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname
    }
  },
  test: {
    include: ['**/*.spec.ts'],
    globals: true,
    root: './',
    alias: {
      '@': './src'
    },
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})