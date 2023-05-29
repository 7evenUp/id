import { defineConfig } from "vite"
import path from "path"

import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// PROD CONFIG
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: true
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  }
})

// DEV CONFIG
// import mkcert from 'vite-plugin-mkcert'

// export default defineConfig({
//   plugins: [react(), svgr(), mkcert()],
//   server: {
//     https: true,
//     host: true
//   },
//   resolve: {
//     alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
//   }
// })