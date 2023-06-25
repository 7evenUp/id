import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App.tsx"
import Providers from "./components/Providers.tsx"
import { Toaster } from "./shared/ui/Toast.tsx"

import "./lib/i18n.ts"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <App />
      <Toaster position="top-right" containerStyle={{ inset: "1.2%" }} />
    </Providers>
  </React.StrictMode>
)
