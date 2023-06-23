import React from "react"
import { Provider as ReduxProvider } from "react-redux"

import { persistStore } from "redux-persist"
import { store } from "@/redux/store"

import { MetamaskProvider } from "@/hooks/useMetamask"

import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum"
import { Web3Modal } from "@web3modal/react"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { arbitrum, mainnet, polygon } from "wagmi/chains"
import { PersistGate } from "redux-persist/integration/react"

const chains = [arbitrum, mainnet, polygon]
const projectId = "9869f436bc873846db37f90c8cfc8ee9"

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient,
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

let persistor = persistStore(store)

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WagmiConfig config={wagmiConfig}>
          <MetamaskProvider>{children}</MetamaskProvider>
        </WagmiConfig>
      </PersistGate>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </ReduxProvider>
  )
}

export default Providers
