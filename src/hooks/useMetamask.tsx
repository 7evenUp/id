import React, { type PropsWithChildren } from "react"

type ConnectAction = { type: "connect"; walletAddress: string }
type DisconnectAction = { type: "disconnect" }
type PageLoadedAction = {
  type: "pageLoaded"
  isMetamaskInstalled: boolean
  walletAddress: string | null
}
type LoadingAction = { type: "loading" }
type IdleAction = { type: "idle" }

type Action =
  | ConnectAction
  | DisconnectAction
  | PageLoadedAction
  | LoadingAction
  | IdleAction

type Dispatch = (action: Action) => void

type Status = "loading" | "idle" | "pageNotLoaded"

type State = {
  walletAddress: string | null
  isMetamaskInstalled: boolean
  status: Status
}

const initialState: State = {
  walletAddress: null,
  isMetamaskInstalled: false,
  status: "loading",
} as const

function metamaskReducer(state: State, action: Action): State {
  switch (action.type) {
    case "connect": {
      const { walletAddress } = action
      const newState = { ...state, walletAddress, status: "idle" } as State
      const info = JSON.stringify(newState)
      window.localStorage.setItem("metamaskState", info)

      return newState
    }
    case "disconnect": {
      window.localStorage.removeItem("metamaskState")
      if (typeof window.ethereum !== undefined) {
        window.ethereum.removeAllListeners(["accountsChanged"])
      }
      return { ...state, walletAddress: null }
    }

    case "pageLoaded": {
      const { isMetamaskInstalled, walletAddress } = action
      return { ...state, isMetamaskInstalled, status: "idle", walletAddress }
    }
    case "loading": {
      return { ...state, status: "loading" }
    }
    case "idle": {
      return { ...state, status: "idle" }
    }
    default: {
      throw new Error("Unhandled action type")
    }
  }
}

const MetamaskContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined)

const MetamaskProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = React.useReducer(metamaskReducer, initialState)
  const value = { state, dispatch }

  return (
    <MetamaskContext.Provider value={value}>
      {children}
    </MetamaskContext.Provider>
  )
}

const useMetamask = () => {
  const context = React.useContext(MetamaskContext)
  if (context === undefined) {
    throw new Error("useMetamask must be used within a MetamaskProvider")
  }
  return context
}

export { MetamaskProvider, useMetamask }
