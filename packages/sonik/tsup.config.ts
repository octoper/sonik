// eslint-disable-next-line node/no-extraneous-import
import glob from 'glob'
import { defineConfig } from 'tsup'

const entryPoints = glob.sync('./src/**/*.+(ts|tsx)', {
  ignore: ['./src/**/*.test.+(ts|tsx)'],
})

export default defineConfig({
  entry: entryPoints,
  dts: true,
  tsconfig: './tsconfig.build.json',
  splitting: false,
  minify: true,
  format: ['esm'],
  bundle: false,
  platform: 'node',
})
