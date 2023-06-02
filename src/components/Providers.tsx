import React from "react"
import { Provider as ReduxProvider } from "react-redux"

import { store } from "@/redux/store"

import { MetamaskProvider } from "@/hooks/useMetamask"

import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi"
import { publicProvider } from "wagmi/providers/public"
import { InjectedConnector } from "wagmi/connectors/injected"

const { chains, publicClient } = configureChains([mainnet], [publicProvider()])

const config = createConfig({
  connectors: [new InjectedConnector({ chains })],
  publicClient,
})

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <WagmiConfig config={config}>
        <MetamaskProvider>{children}</MetamaskProvider>
      </WagmiConfig>
    </ReduxProvider>
  )
}

export default Providers
