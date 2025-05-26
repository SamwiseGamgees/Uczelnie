import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // <projectRoot>/src  as @
      { find: '@',      replacement: path.resolve(__dirname, 'src') },
      // <projectRoot>/src/config as config
      { find: 'config', replacement: path.resolve(__dirname, 'src/config') },
      // (optional) map your types folder, if you need imports like 'types/foo'
      { find: 'types',  replacement: path.resolve(__dirname, 'src/types') },
    ],
  },
})




