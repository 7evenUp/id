import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import CryptonIcon from "@/assets/icons/crypton-logo.svg?react"

import {
  useSetAdvertisingConsentMutation,
  useUserProfileQuery,
} from "@/redux/api/profile"

import Text0 from "@/shared/typography/Text0"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const Newsletter = () => {
  const { t } = useTranslation()

  const [opened, setOpened] = useState(false)

  const scale = useAppSelector((state) => state.scale.value)

  const { data: profileData } = useUserProfileQuery()
  const [mutate, { isLoading }] = useSetAdvertisingConsentMutation()

  const {
    advertisingConsent,
    subscriptionInfo: { status, subscriptionType },
  } = profileData!

  useEffect(() => {
    setTimeout(() => {
      if (
        advertisingConsent === null &&
        status === "ACTIVE" &&
        subscriptionType === "Prime"
      ) {
        setOpened(true)
      }
    }, 1000)
  }, [])

  const onConfirmClick = () => {
    if (isLoading) return

    mutate({ advertising_consent: true })

    setOpened(false)
  }

  const onCancelClick = () => {
    if (isLoading) return

    mutate({ advertising_consent: false })

    setOpened(false)
  }

  if (advertisingConsent !== null) return null

  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogContent
        className={cn(
          "sm:max-w-[500px] md:max-w-[500px] 2xl:max-w-[600px] sm:p-6",
          scale && "3xl:w-[39.06vw] 3xl:p-[1.5625vw]"
        )}
      >
        <DialogHeader>
          <div
            className={cn("flex flex-col mb-4", scale && "3xl:mb-[1.042vw]")}
          >
            <DialogTitle>{t("Подписка на рассылку")}</DialogTitle>
          </div>
        </DialogHeader>

        <Text0>
          {t(
            "Подписаться на рассылку, чтобы получать информацию об акциях и новостях экосистемы Crypton."
          )}
        </Text0>

        <div className="flex items-center gap-6 ml-auto">
          <Button
            appearence="text"
            className={cn(
              "w-fit mt-6 focus:outline-none focus:underline",
              scale && "3xl:mt-[1.5625vw]"
            )}
            onClick={onCancelClick}
          >
            <Text0>{t("Нет, спасибо")}</Text0>
          </Button>
          <Button
            className={cn("w-fit mt-6 pr-1", scale && "3xl:mt-[1.5625vw]")}
            onClick={onConfirmClick}
          >
            {t("Подписаться")}
            <div className="inline-flex items-center gap-1 rounded-full bg-gray-5/50 dark:bg-gray-3/50 pl-2 pr-1 py-1">
              +40
              <CryptonIcon
                className={cn(
                  "w-4 h-4 inline",
                  scale && "3xl:w-[1.3vw] 3xl:h-[1.3vw]"
                )}
              />
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Newsletter
