import React, { type PropsWithChildren } from "react"

type PageLoadedAction = {
  type: "pageLoaded"
  isMetamaskInstalled: boolean
}

type Action = PageLoadedAction

type Dispatch = (action: Action) => void

type State = {
  isMetamaskInstalled: boolean
}

const initialState: State = {
  isMetamaskInstalled: false,
} as const

const metamaskReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "pageLoaded": {
      const { isMetamaskInstalled } = action
      return { ...state, isMetamaskInstalled }
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
