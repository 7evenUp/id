import { defineConfig, loadEnv } from "vite"
import path from "path"

import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import { nodePolyfills } from "vite-plugin-node-polyfills"
import mkcert from "vite-plugin-mkcert"

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  // local
  if (command === "serve") {
    return {
      plugins: [react(), svgr(), mkcert(), nodePolyfills()],
      resolve: {
        alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
      },
    }
  } else {
    // build
    return {
      plugins: [react(), svgr(), nodePolyfills()],
      resolve: {
        alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
      },
    }
  }
})
