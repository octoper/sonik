import mdx from '@mdx-js/rollup'
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    exclude: ['node_modules', 'dist', '.git', '.cache', 'test-presets', 'sandbox'],
  },
  plugins: [
    {
      ...mdx({
        jsxImportSource: 'hono/jsx',
      }),
    },
  ],
})
