import { useEffect, useState } from "react"

import SkeletonLayout from "@/components/SkeletonLayout"
import SiteUsesCookiesMessage from "@/components/SiteUsesCookiesMessage"
import Newsletter from "@/components/Newsletter"
// import IntroModal from "@/components/IntroModal"

import Auth from "@/modules/auth/Auth"
import NewAuth from "@/modules/newAuth"
import PersonalAccount from "@/modules/personal-account/PersonalAccount"
import Products from "@/modules/products/Products"

import { useAppSelector } from "@/redux/hooks"
import { useUserProfileQuery } from "@/redux/api/profile"
import { useSubscriptionsQuery } from "@/redux/api/subscription"

import { cn } from "@/lib/classNames"

const Main = () => {
  const [isDelayed, setIsDelayed] = useState(true)
  const [isCookieDelayed, setIsCookieDelayed] = useState(true)

  const scale = useAppSelector((state) => state.scale.value)
  const isCookieShown = useAppSelector((state) => state.cookie.isShown)

  const { isLoading: isProfileLoading, data, error } = useUserProfileQuery()
  const { isLoading: isSubscriptionsLoading } = useSubscriptionsQuery()

  // console.log(error)
  // error.originalStatus === 502

  useEffect(() => {
    setTimeout(() => setIsDelayed(false), 1000)
  }, [])

  useEffect(() => {
    if (isCookieShown) {
      setIsCookieDelayed(true)
    } else {
      setTimeout(() => setIsCookieDelayed(false), 3000)
    }
  }, [isCookieShown])

  return (
    <>
      <main
        className={cn(
          "flex-1 flex flex-col lg:flex-row justify-between pb-32 md:pb-10 lg:pb-0 gap-20",
          scale && "3xl:gap-[5.208vw]"
        )}
      >
        {error ? (
          <NewAuth />
        ) : isProfileLoading || isSubscriptionsLoading || isDelayed ? (
          <SkeletonLayout />
        ) : data ? (
          <>
            <PersonalAccount />
            <Products />
            {/* <IntroModal /> */}
            <Newsletter />
          </>
        ) : null}
      </main>

      {!isCookieDelayed && <SiteUsesCookiesMessage />}
    </>
  )
}

export default Main
