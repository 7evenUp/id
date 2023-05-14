import React from "react"
import { Provider } from "react-redux"

import { store } from "@/redux/store"

import { MetamaskProvider } from "@/hooks/useMetamask"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <MetamaskProvider>{children}</MetamaskProvider>
    </Provider>
  )
}

export default Providers
