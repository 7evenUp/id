import { useTranslation } from "react-i18next"

import { ReactComponent as Info } from "@/assets/icons/info.svg"

import ReferralStats from "../modals/referral/ReferralStats"
import ReferralInfo from "../modals/referral/ReferralInfo"
import ReferralWithdraw from "../modals/referral/ReferralWithdraw"

import ModalTrigger from "../components/ModalTrigger"

import RowItem from "@/shared/components/RowItem"

import AccentNumber from "@/shared/typography/AccentNumber"
import Subheading from "@/shared/typography/Subheading"

import IconButton from "@/shared/ui/IconButton"
import Button from "@/shared/ui/Button"
import { useToast } from "@/shared/ui/Toast/useToast"

import { useUserProfileQuery } from "@/redux/api/profile"

const Referral = () => {
  const { t } = useTranslation("profile")

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
      <div className="flex justify-between items-center pb-4 2xl:pb-[1.042vw] group">
        <Subheading>{t("referral.heading")}</Subheading>
        <ModalTrigger content={<ReferralInfo />}>
          <IconButton className="sm:opacity-0 group-hover:opacity-100 transition-all bg-gray-1 hover:bg-gray-2 dark:bg-gray-4 dark:hover:bg-gray-5 active:bg-opacity-80 dark:active:bg-opacity-80 rounded-full focus:opacity-100">
            <Info className="w-3 h-3 2xl:w-[0.781vw] 2xl:h-[0.781vw] fill-white dark:fill-gray-1" />
          </IconButton>
        </ModalTrigger>
      </div>
      <div className="flex flex-col border-t border-gray-4 dark:border-gray-1">
        <RowItem className="items-start">
          <span className="w-full xl:w-auto">
            {t("referral.cashback")}:{" "}
            <AccentNumber>{refCashBack}%</AccentNumber>
          </span>
          <div className="flex gap-1.5 xl:gap-3 2xl:gap-[0.781vw] flex-wrap justify-end flex-shrink">
            <Button onClick={onPromoClick}>{t("referral.promo-btn")}</Button>
            <Button onClick={onRefLinkClick}>{t("referral.link-btn")}</Button>
          </div>
        </RowItem>
        <RowItem>
          <span className="typography-text-0 dark:text-gray-4">
            {t("referral.balance")}: <AccentNumber>${refBalance}</AccentNumber>
          </span>
          <ReferralWithdraw triggerText={t("referral.withdraw-btn")} />
        </RowItem>
        <RowItem>
          <span className="typography-text-0 dark:text-gray-4">
            {t("referral.stats")}
          </span>
          <ModalTrigger content={<ReferralStats />}>
            <Button>{t("referral.view-btn")}</Button>
          </ModalTrigger>
        </RowItem>
      </div>
    </div>
  )
}

export default Referral
