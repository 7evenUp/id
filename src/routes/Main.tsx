import { useEffect, useRef, useState } from "react"

import SkeletonLayout from "@/components/SkeletonLayout"

import Auth from "@/modules/auth/Auth"
import PersonalAccount from "@/modules/personal-account/PersonalAccount"
import Products from "@/modules/products/Products"

import { useAppSelector } from "@/redux/hooks"
import { useUserProfileQuery } from "@/redux/api/profile"

import { cn } from "@/lib/classNames"

const Main = () => {
  const [isDelayed, setIsDelayed] = useState(true)
  const delay = useRef({ time: 1000 })

  const scale = useAppSelector((state) => state.scale.value)

  const { isLoading, data, error } = useUserProfileQuery()

  console.log("4")

  useEffect(() => {
    setTimeout(() => setIsDelayed(false), delay.current.time)
    console.log("5")
  }, [])

  return (
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
  )
}

export default Main
