import { FaInfo } from "react-icons/fa"

import ReferralStats from "../modals/referral/ReferralStats"
import ReferralInfo from "../modals/referral/ReferralInfo"
import ReferralWithdraw from "../modals/referral/ReferralWithdraw"

import ModalTrigger from "../components/ModalTrigger"

import RowItem from "@/shared/components/RowItem"

import AccentNumber from "@/shared/typography/AccentNumber"
import Subheading from "@/shared/typography/Subheading"

import IconButton from "@/shared/ui/IconButton"
import Button from "@/shared/ui/Button"
import { toast } from "@/shared/ui/Toast"
import { useUserProfileQuery } from "@/redux/api/core"

const Referral = () => {
  const { data: profileData } = useUserProfileQuery()

  const onPromoClick = () => {
    if (profileData) {
      navigator.clipboard.writeText(profileData.referralInfo.refCode)

      toast({
        providedId: "promo",
        title: "Скопированно",
        message: "Промокод успешно скопирован в буфер обмена",
        type: "default",
      })
    }
  }

  const onRefLinkClick = () => {
    if (profileData) {
      navigator.clipboard.writeText(profileData.referralInfo.refLink)

      toast({
        title: "Скопированно",
        message: "Реферальная ссылка успешно скопирована в буфер обмена",
        type: "default",
        withProgress: true,
      })
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Subheading>Реферальная система</Subheading>
        <ModalTrigger content={<ReferralInfo />}>
          <IconButton className="bg-gray-1 hover:bg-gray-2 active:bg-opacity-80 rounded-full">
            <FaInfo className="w-3 h-3 fill-gray-5" />
          </IconButton>
        </ModalTrigger>
      </div>
      <div className="flex flex-col border-t border-gray-4 dark:border-gray-1">
        <RowItem className="items-start">
          <span className="w-full xl:w-auto">
            реферальная система: <AccentNumber>15%</AccentNumber>
          </span>
          <div className="flex gap-1.5 xl:gap-3 flex-wrap justify-end flex-shrink">
            <Button onClick={onPromoClick}>промокод</Button>
            <Button onClick={onRefLinkClick}>ссылка</Button>
          </div>
        </RowItem>
        <RowItem>
          <span className="typography-text-0 dark:text-gray-4">
            реферальный баланс: <AccentNumber>$250</AccentNumber>
          </span>
          <ReferralWithdraw />
        </RowItem>
        <RowItem>
          <span className="typography-text-0 dark:text-gray-4">статистика</span>
          <ModalTrigger content={<ReferralStats />}>
            <Button>посмотреть</Button>
          </ModalTrigger>
        </RowItem>
      </div>
    </div>
  )
}

export default Referral
