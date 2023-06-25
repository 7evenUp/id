import type { WindowProvider } from "wagmi/window"

export interface ExtendEthereum extends WindowProvider {
  isTrustWallet?: true
  isMetaMask?: true
}

declare global {
  interface Window {
    ethereum?: ExtendEthereum
  }
}
