
import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import svgr from "vite-plugin-svgr"
import mkcert from "vite-plugin-mkcert"
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === "production") {
    return {
      plugins: [react(), svgr()],
      resolve: {
        alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
      },
    }
  } else if (mode === "development") {
    return {
      plugins: [react(), svgr(), mkcert()],
      resolve: {
        alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
      },
    }
  }
})
