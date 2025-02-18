import mdx from '@mdx-js/rollup'
import sonik from 'sonik/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  ssr: {
    external: ['react', 'react-dom'],
  },
  plugins: [
    sonik({
      entry: './app/server.ts',
    }),
    {
      ...mdx({
        jsxImportSource: 'react',
      }),
    },
  ],
})
