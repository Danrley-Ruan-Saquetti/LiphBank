import { defineConfig } from 'vitest/config'
import swc from 'unplugin-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname
    }
  },
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
    alias: {
      '@': './src'
    },
  },
  plugins: [
    tsconfigPaths(),
    swc.vite(),
  ],
})