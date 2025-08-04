import React from "react"
import ReactDOM from "react-dom/client"

import { init } from "web-analytics-crypton"

import Providers from "./components/Providers.tsx"
import AppToaster from "./components/AppToaster.tsx"

import App from "./App.tsx"

import "./lib/i18n.ts"
import "./index.css"

init({
  url: "https://api.metrics.crypton.xyz",
  client: "web",
  clientType: "site",
  serviceName: "id",
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <App />
      <AppToaster />
    </Providers>
  </React.StrictMode>
)
