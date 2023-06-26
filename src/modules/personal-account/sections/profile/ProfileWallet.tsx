import { useTranslation } from "react-i18next"

import { ReactComponent as Plus } from "@/assets/icons/plus.svg"

import UpdateWallet from "../../modals/UpdateWallet"

import EditContainer from "../../components/EditContainer"
import EditButton from "../../components/EditButton"
import ModalTrigger from "../../components/ModalTrigger"

import RowItem from "@/shared/components/RowItem"

import { cutWalletAddr } from "@/utils/cutWalletAddr"

import { cn } from "@/lib/classNames"

import { useUserProfileQuery } from "@/redux/api/profile"

const ProfileWallet = () => {
  const { t } = useTranslation("profile")

  const { data: userProfile } = useUserProfileQuery()
  const { wallet } = userProfile!

  return (
    <RowItem className="relative group justify-end">
      <span
        className={cn(
          "mr-auto",
          wallet ? "text-gray-1 dark:text-gray-4" : "text-gray-3"
        )}
      >
        {t("profile.wallet")}
      </span>
      {wallet ? (
        <span>{cutWalletAddr(wallet)}</span>
      ) : (
        <Plus className="hidden sm:block absolute right-0 w-5 h-5 2xl:w-[1.302vw] 2xl:h-[1.302vw]" />
      )}

      {/* Mobile editing */}
      <div className="sm:hidden ml-6">
        <ModalTrigger content={<UpdateWallet />}>
          <EditButton />
        </ModalTrigger>
      </div>

      {/* Desktop editing */}
      <EditContainer className="hidden sm:flex">
        <ModalTrigger content={<UpdateWallet />}>
          <EditButton />
        </ModalTrigger>
      </EditContainer>
    </RowItem>
  )
}

export default ProfileWallet
