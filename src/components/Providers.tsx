import React from "react"
import { Provider as ReduxProvider } from "react-redux"

import { TonConnectUIProvider } from "@tonconnect/ui-react"

import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import { store } from "@/redux/store"

import { createAppKit } from "@reown/appkit/react"
import { WagmiProvider } from "wagmi"
import { mainnet } from "@reown/appkit/networks"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"

const queryClient = new QueryClient()

const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID

const metadata = {
  name: "Crypton ID",
  description: "Personal Cabinet for Crypton",
  url: "https://id.crypton.xyz",
  icons: ["https://id.crypton.xyz/apple-touch-icon.png"],
}

const wagmiAdapter = new WagmiAdapter({
  networks: [mainnet],
  projectId,
  ssr: false,
})

createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet],
  projectId,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    email: false,
    emailShowWallets: false,
    socials: false,
  },
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
        <TonConnectUIProvider manifestUrl="https://id.crypton.xyz/tonconnect-manifest.json">
          <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </WagmiProvider>
        </TonConnectUIProvider>
      </PersistGate>
    </ReduxProvider>
  )
}

export default Providers
