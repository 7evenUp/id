import { useTranslation } from "react-i18next"

import { ReactComponent as Info } from "@/assets/icons/info.svg"

import ReferralStats from "../modals/referral/ReferralStats"
import ReferralInfo from "../modals/referral/ReferralInfo"
import ReferralWithdraw from "../modals/referral/ReferralWithdraw"

import ModalTrigger from "../components/ModalTrigger"

import RowItem from "@/shared/components/RowItem"

import AccentNumber from "@/shared/typography/AccentNumber"
import Subheading from "@/shared/typography/Subheading"
import Text0 from "@/shared/typography/Text0"

import IconButton from "@/shared/ui/IconButton"
import Button from "@/shared/ui/Button"
import { useToast } from "@/shared/ui/Toast/useToast"

import { useUserProfileQuery } from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const Referral = () => {
  const { t } = useTranslation("profile")

  const scale = useAppSelector((state) => state.scale.value)

  const { toast } = useToast()

  const { data: profileData } = useUserProfileQuery()

  const {
    referralInfo: { refCode, refLink, refBalance, refCashBack },
  } = profileData!

  const onPromoClick = () => {
    navigator.clipboard.writeText(refCode)

    toast({
      title: t("referral.toast-title"),
      description: t("referral.promo-copied"),
    })
  }

  const onRefLinkClick = () => {
    navigator.clipboard.writeText(refLink)

    toast({
      title: t("referral.toast-title"),
      description: t("referral.link-copied"),
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
          <IconButton className="transition-all bg-gray-2 hover:bg-gray-1 dark:bg-gray-4 dark:hover:bg-gray-5 active:bg-opacity-80 dark:active:bg-opacity-80 rounded-full focus:opacity-100">
            <Info
              className={cn(
                "w-3 h-3 fill-white dark:fill-gray-1",
                scale && "3xl:w-[0.781vw] 3xl:h-[0.781vw]"
              )}
            />
          </IconButton>
        </ModalTrigger>
      </div>
      <div className="flex flex-col border-t border-gray-4 dark:border-gray-1">
        <RowItem className="items-start">
          <Text0 className="w-full xl:w-auto">
            {t("referral.cashback")}:{" "}
            <AccentNumber>{refCashBack * 100}%</AccentNumber>
          </Text0>
          <div
            className={cn(
              "flex gap-1.5 xl:gap-3 flex-wrap justify-end flex-shrink",
              scale && "3xl:gap-[0.781vw]"
            )}
          >
            <Button onClick={onPromoClick}>{t("referral.promo-btn")}</Button>
            <Button onClick={onRefLinkClick}>{t("referral.link-btn")}</Button>
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
