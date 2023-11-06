import React from "react"
import { Provider as ReduxProvider } from "react-redux"

import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import { store } from "@/redux/store"

import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { mainnet } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
)

const config = createConfig({
  publicClient,
  webSocketPublicClient,
})

const persistor = persistStore(store)

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WagmiConfig config={config}>{children}</WagmiConfig>
      </PersistGate>
    </ReduxProvider>
  )
}

export default Providers
