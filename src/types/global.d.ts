import type { WindowProvider } from "wagmi/window"

export interface ExtendEthereum extends WindowProvider {
  isTrustWallet?: true
}

declare global {
  interface Window {
    ethereum?: ExtendEthereum
  }
}

type InjectedProviders = {
  isMetaMask?: true
}
