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
import { useAppSelector } from "@/redux/hooks"

const ProfileWallet = () => {
  const { t } = useTranslation("profile")

  const scale = useAppSelector((state) => state.scale.value)

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
        <ModalTrigger content={<UpdateWallet />}>
          <button
            className={cn(
              "hidden sm:block absolute right-0 w-5 h-5 cursor-pointer rounded-full hover:shadow-[0_0_0_1px_#333333] dark:hover:shadow-[0_0_0_1px_#BDBDBD] transition-all active:opacity-80 dark:active:opacity-80",
              scale && "3xl:w-[1.302vw] 3xl:h-[1.302vw]"
            )}
          >
            <Plus
              className={cn(
                "absolute top-0 w-5 h-5",
                scale && "3xl:w-[1.302vw] 3xl:h-[1.302vw]"
              )}
            />
          </button>
        </ModalTrigger>
      )}

      {/* Mobile editing */}
      <div className="sm:hidden ml-6">
        <ModalTrigger content={<UpdateWallet />}>
          {wallet ? (
            <EditButton />
          ) : (
            <div
              className={cn(
                "w-5 h-5 cursor-pointer rounded-full hover:shadow-[0_0_0_1px_#333333] dark:hover:shadow-[0_0_0_1px_#BDBDBD] transition-all active:opacity-80 dark:active:opacity-80",
                scale && "3xl:w-[1.302vw] 3xl:h-[1.302vw]"
              )}
            >
              <Plus
                className={cn(
                  "absolute w-5 h-5",
                  scale && "3xl:w-[1.302vw] 3xl:h-[1.302vw]"
                )}
              />
            </div>
          )}
        </ModalTrigger>
      </div>

      {/* Desktop editing */}
      {wallet && (
        <EditContainer className="hidden sm:flex">
          <ModalTrigger content={<UpdateWallet />}>
            <EditButton />
          </ModalTrigger>
        </EditContainer>
      )}
    </RowItem>
  )
}

export default ProfileWallet
