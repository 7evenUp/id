import React from "react"
import { Provider as ReduxProvider } from "react-redux"

import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import { store } from "@/redux/store"

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react"
import { mainnet } from "wagmi/chains"
import { WagmiConfig } from "wagmi"

const chains = [mainnet]
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID
const metadata = {
  name: "Crypton ID",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
}

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  featuredWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
    "18388be9ac2d02726dbac9777c96efaac06d744b2f6d580fccdd4127a6d01fd1",
  ],
})

const persistor = persistStore(store)

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
      </PersistGate>
    </ReduxProvider>
  )
}

export default Providers
