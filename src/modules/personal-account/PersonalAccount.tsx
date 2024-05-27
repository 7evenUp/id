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
import Shares from "./sections/Shares"

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
      <div className="flex justify-between sm:max-lg:px-12=">
        <h1
          className={cn(
            "text-[22px]/[22px] 2xl:text-2xl tracking-[0.03em] font-semibold uppercase dark:text-gray-5 text-center w-full sm:text-left mb-10 sm:mb-0",
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
          "flex flex-col gap-10 w-full sm:px-12 lg:px-0 lg:w-[350px] xl:w-[433px] 2xl:w-[100%]",
          scale && "3xl:gap-[2.604vw] 3xl:w-[28.19vw]"
        )}
      >
        <Profile />
        <Subscription />
        <Shares />
        <Points />
        <Referral />

        <div className="hidden sm:flex justify-between">
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
