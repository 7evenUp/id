import { defineConfig } from "vite"
import path from "path"

import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import mkcert from "vite-plugin-mkcert"

// https://vitejs.dev/config/

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      // dev specific config
      plugins: [react(), svgr(), mkcert()],
      server: {
        https: true,
        host: true,
      },
      resolve: {
        alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
      },
    }
  } else {
    // command === 'build'
    return {
      // build specific config
      plugins: [react(), svgr()],
      server: {
        host: true,
      },
      resolve: {
        alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
      },
    }
  }
})
