import { useEffect, useRef, useState } from "react"

import PersonalAccount from "./modules/personal-account/PersonalAccount"
import Products from "./modules/products/Products"
import Header from "./modules/header/Header"
import Auth from "./modules/auth/Auth"

import SkeletonLayout from "./components/SkeletonLayout"

import { useUserProfileQuery } from "./redux/api/profile"
import { useAppSelector } from "./redux/hooks"

import { cn } from "./lib/classNames"

const App = () => {
  const [isDelayed, setIsDelayed] = useState(true)
  const delay = useRef({ time: 1000 })

  const scale = useAppSelector((state) => state.scale.value)

  const { isLoading, data, error } = useUserProfileQuery()

  useEffect(() => {
    setTimeout(() => setIsDelayed(false), delay.current.time)
  }, [])

  useEffect(() => {
    if (data) {
      console.log("Fetched user data: ", data)
    }
  }, [data])

  useEffect(() => {
    if (error) {
      console.error("Error happened while fetching GET users/profile: ", error)
    }
  }, [error])

  return (
    <div className="w-full min-h-screen font-montserrat text-gray-1 dark:text-gray-5 bg-white bg-background-texture dark:bg-black dark:bg-background-texture-dark">
      <div
        className={cn(
          "px-3 mobile-sm:px-7 xl:px-9 py-8 max-w-[1400px] 2xl:w-[90%] 2xl:max-w-[1728px] mx-auto",
          scale && "3xl:px-[2.344vw] 3xl:py-[2.083vw] 3xl:max-w-[90%]"
        )}
      >
        <Header />
        <main
          className={cn(
            "flex flex-col lg:flex-row justify-between gap-20",
            scale && "3xl:gap-[5.208vw]"
          )}
        >
          {error ? (
            <Auth />
          ) : isLoading || isDelayed ? (
            <SkeletonLayout />
          ) : data ? (
            <>
              <PersonalAccount />
              <Products />
            </>
          ) : null}
        </main>
      </div>
    </div>
  )
}

export default App
