import { useTranslation } from "react-i18next"
import { toast } from "sonner"

import InfoCircle from "@/assets/icons/info-circle.svg?react"
import CopyIcon from "@/assets/icons/copy.svg?react"

import ReferralStats from "../modals/referral/ReferralStats"
import ReferralInfo from "../modals/referral/ReferralInfo"
import ReferralWithdraw from "../modals/referral/ReferralWithdraw"

import ModalTrigger from "../components/ModalTrigger"

import RowItem from "@/shared/components/RowItem"

import AccentNumber from "@/shared/typography/AccentNumber"
import Subheading from "@/shared/typography/Subheading"
import Text0 from "@/shared/typography/Text0"

import Button from "@/shared/ui/Button"

import { useUserProfileQuery } from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const Referral = () => {
  const { t } = useTranslation("profile")

  const scale = useAppSelector((state) => state.scale.value)

  const { data: profileData } = useUserProfileQuery()

  const {
    referralInfo: { refCode, refBalance, refCashBack },
  } = profileData!

  const onPromoClick = () => {
    navigator.clipboard.writeText(refCode)

    toast(t("referral.toast-title"), {
      description: t("referral.promo-copied"),
    })
  }

  const onPrimeClick = () => {
    navigator.clipboard.writeText("https://in-prime.crypton.xyz?ref=" + refCode)

    toast(t("referral.toast-title"), {
      description: t("referral.prime-copied"),
    })
  }

  const onCalendarClick = () => {
    navigator.clipboard.writeText(
      "https://calendar.crypton.xyz?ref_code=" + refCode
    )

    toast(t("referral.toast-title"), {
      description: t("referral.calendar-copied"),
    })
  }

  return (
    <div>
      <div
        className={cn(
          "flex justify-between items-center pb-4",
          scale && "3xl:pb-[1.042vw]"
        )}
      >
        <Subheading>{t("referral.heading")}</Subheading>
        <ModalTrigger content={<ReferralInfo />}>
          <div>
            <InfoCircle
              className={cn(
                "cursor-pointer hover:fill-gray-1 hover:text-white active:opacity-80 dark:active:opacity-80 dark:text-gray-4 dark:hover:fill-gray-2 w-[26px] h-[26px]",
                scale && "3xl:w-[1.692vw] 3xl:h-[1.692vw]"
              )}
            />
          </div>
        </ModalTrigger>
      </div>
      <div className="flex flex-col border-t border-gray-4 dark:border-gray-1">
        <RowItem className="items-start">
          <Text0 className="w-full xl:w-auto">
            {t("referral.cashback")}:{" "}
            <AccentNumber>{(refCashBack * 100).toFixed()}%</AccentNumber>
          </Text0>
          <Button onClick={onPromoClick}>
            {t("referral.promo-btn")}{" "}
            <CopyIcon
              className={cn(
                "w-3.5 h-3.5",
                scale && "3xl:w-[0.911vw] 3xl:h-[0.911vw]"
              )}
            />
          </Button>
        </RowItem>
        <RowItem>
          <Text0 className="dark:text-gray-4">
            {t("referral.referral-links")}
          </Text0>
          <div
            className={cn(
              "flex gap-1.5 xl:gap-3 flex-wrap justify-end flex-shrink",
              scale && "3xl:gap-[0.781vw]"
            )}
          >
            <Button onClick={onPrimeClick}>
              Prime
              <CopyIcon
                className={cn(
                  "w-3.5 h-3.5",
                  scale && "3xl:w-[0.911vw] 3xl:h-[0.911vw]"
                )}
              />
            </Button>
            <Button onClick={onCalendarClick}>
              Calendar
              <CopyIcon
                className={cn(
                  "w-3.5 h-3.5",
                  scale && "3xl:w-[0.911vw] 3xl:h-[0.911vw]"
                )}
              />
            </Button>
          </div>
        </RowItem>
        <RowItem>
          <Text0 className="dark:text-gray-4">
            {t("referral.balance")}: <AccentNumber>${refBalance}</AccentNumber>
          </Text0>
          <ReferralWithdraw triggerText={t("referral.withdraw-btn")} />
        </RowItem>
        <RowItem>
          <Text0 className="dark:text-gray-4">{t("referral.stats")}</Text0>
          <ModalTrigger content={<ReferralStats />}>
            <Button>{t("referral.view-btn")}</Button>
          </ModalTrigger>
        </RowItem>
      </div>
    </div>
  )
}

export default Referral
