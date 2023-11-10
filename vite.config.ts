import { defineConfig, loadEnv } from "vite"
import path from "path"

import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"

// PROD CONFIG
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  return {
    plugins: [react(), svgr()],
    server: {
      host: true,
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: true,
        },
      },
    },
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
  }
})

// DEV CONFIG
// import mkcert from 'vite-plugin-mkcert'

// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), "")

//   return {
//     plugins: [react(), svgr(), mkcert()],
//     server: {
//       https: true,
//       host: true,
//       proxy: {
//         "/api": {
//           target: env.VITE_API_BASE_URL,
//           changeOrigin: true,
//           secure: true,
//         },
//       },
//     },
//     resolve: {
//       alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
//     },
//   }
// })
