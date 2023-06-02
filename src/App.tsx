import { useEffect, useRef, useState } from "react"

import PersonalAccount from "./modules/personal-account/PersonalAccount"
import Products from "./modules/products/Products"
import Header from "./modules/header/Header"
import Auth from "./modules/auth/Auth"

import SkeletonLayout from "./components/SkeletonLayout"

import { useUserProfileQuery } from "./redux/api/profile"
import { useMetamask } from "./hooks/useMetamask"

const App = () => {
  const [isDelayed, setIsDelayed] = useState(true)
  const delay = useRef({ time: 1000 })

  const { isLoading, data, error } = useUserProfileQuery()

  const { dispatch } = useMetamask()

  useEffect(() => {
    setTimeout(() => setIsDelayed(false), delay.current.time)

    if (typeof window !== undefined) {
      // start by checking if window.ethereum is present, indicating a wallet extension
      const ethereumProviderInjected = typeof window.ethereum !== "undefined"
      // this could be other wallets so we can verify if we are dealing with metamask
      // using the boolean constructor to be explecit and not let this be used as a falsy value (optional)
      const isMetamaskInstalled =
        ethereumProviderInjected && Boolean(window.ethereum.isMetaMask)

      const local = window.localStorage.getItem("metamaskState")

      // user was previously connected, start listening to MM
      if (local) {
      }

      // local could be null if not present in LocalStorage
      const { walletAddress } = local
        ? JSON.parse(local)
        : // backup if local storage is empty
          { walletAddress: null }

      dispatch({ type: "pageLoaded", isMetamaskInstalled, walletAddress })
    }
  }, [])

  if (data) {
    console.log("Fetched user data: ", data)
  }

  if (error) {
    console.error("Error happened while fetching GET users/profile: ", error)
  }

  return (
    <div className="w-full min-h-screen font-montserrat text-gray-1 dark:text-gray-5 bg-white bg-background-texture dark:bg-black dark:bg-background-texture-dark">
      <div className="px-7 xl:px-9 py-8">
        <Header />
        <main className="flex flex-col lg:flex-row justify-between gap-20">
          {isLoading || isDelayed ? (
            <SkeletonLayout />
          ) : data ? (
            <>
              <PersonalAccount />
              <Products />
            </>
          ) : (
            error && <Auth />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
