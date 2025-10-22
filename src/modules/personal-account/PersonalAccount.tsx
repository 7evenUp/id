import { useEffect } from "react"
import { useDisconnect } from "wagmi"
import { useTranslation } from "react-i18next"

import Deactivation from "./modals/Deactivation"

import Avatar from "./components/Avatar"
import ModalTrigger from "./components/ModalTrigger"

import Profile from "./sections/profile/Profile"
import Subscription from "./sections/Subscription"
import Referral from "./sections/Referral"
import Points from "./sections/Points"
// import Shares from "./sections/Shares"

import Button from "@/shared/ui/Button"

import { useLazyLogoutQuery } from "@/redux/api/auth"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const PersonalAccount = () => {
  const { t } = useTranslation()

  const { disconnect } = useDisconnect()

  const scale = useAppSelector((state) => state.scale.value)

  const [logout, { isSuccess, isError }] = useLazyLogoutQuery()

  useEffect(() => {
    if (isSuccess) location.reload()
  }, [isSuccess])

  if (isError) console.error("Error!")

  const onLogout = () => {
    disconnect()
    logout()
  }

  return (
    <div className="2xl:flex-1">
      <div className="sm:max-lg:px-12= flex justify-between">
        <h1
          className={cn(
            "mb-10 w-full text-center text-[22px]/[22px] font-semibold uppercase tracking-[0.03em] dark:text-gray-5 sm:mb-0 sm:text-left 2xl:text-2xl",
            scale && "3xl:text-[1.432vw]/[1.432vw]"
          )}
        >
          {t("heading")}
        </h1>
        <div className="hidden sm:block">
          <Avatar />
        </div>
      </div>
      <div
        className={cn(
          "flex w-full flex-col gap-10 sm:px-12 lg:w-[350px] lg:px-0 xl:w-[433px] 2xl:w-[100%]",
          scale && "3xl:w-[28.19vw] 3xl:gap-[2.604vw]"
        )}
      >
        <Profile />
        <Subscription />
        {/* <Shares /> */}
        <Points />
        <Referral />

        <div className="hidden justify-between sm:flex">
          <Button appearence="text" onClick={onLogout}>
            {t("logout")}
          </Button>
          <ModalTrigger content={<Deactivation />}>
            <Button appearence="text">{t("deactivate")}</Button>
          </ModalTrigger>
        </div>
      </div>
    </div>
  )
}

export default PersonalAccount
