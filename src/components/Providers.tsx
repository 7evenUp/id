import React from "react"
import { Provider as ReduxProvider } from "react-redux"

import { TonConnectUIProvider } from "@tonconnect/ui-react"

import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import { store } from "@/redux/store"

// import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react"
import { createWeb3Modal } from "@web3modal/wagmi/react"
import { walletConnectProvider, EIP6963Connector } from "@web3modal/wagmi"
import { mainnet } from "wagmi/chains"
import { WagmiConfig, configureChains, createConfig } from "wagmi"
import { publicProvider } from "wagmi/providers/public"
import { InjectedConnector } from "wagmi/connectors/injected"
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"

// const chains = [mainnet]
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID

const { chains, publicClient } = configureChains(
  [mainnet],
  [walletConnectProvider({ projectId }), publicProvider()]
)

const metadata = {
  name: "Crypton ID",
  description: "Personal Cabinet for Crypton",
  url: "https://id.crypton.xyz",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
}

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: { projectId, showQrModal: false, metadata },
    }),
    new EIP6963Connector({ chains }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
  ],
  publicClient,
})

// const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

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
        <TonConnectUIProvider manifestUrl="https://id-dev.crypton.xyz/tonconnect-manifest.json">
        <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
        </TonConnectUIProvider>
      </PersistGate>
    </ReduxProvider>
  )
}

export default Providers
