import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import {
  useTonConnectModal,
  useTonConnectUI,
  toUserFriendlyAddress,
} from "@tonconnect/ui-react"

import Plus from "@/assets/icons/plus.svg?react"

import EditContainer from "../../components/EditContainer"
import EditButton from "../../components/EditButton"

import UpdateTonWallet from "../../modals/UpdateTonWallet"

import RowItem from "@/shared/components/RowItem"

import { LIMIT_REACHED } from "@/utils/errorCodes"

import { useUpdateTonMutation, useUserProfileQuery } from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

import { cutWalletAddr } from "@/utils/cutWalletAddr"

const ProfileTon = () => {
  const { t } = useTranslation()

  const [dialogOpened, setDialogOpened] = useState(false)

  const scale = useAppSelector((state) => state.scale.value)

  const { data: userProfile } = useUserProfileQuery()
  const [updateTon] = useUpdateTonMutation()
  const [tonConnectUI] = useTonConnectUI()

  const { open } = useTonConnectModal()

  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange((walletAndWalletInfo) => {
      if (walletAndWalletInfo) {
        const address = toUserFriendlyAddress(
          walletAndWalletInfo.account.address
        )

        toast.promise(updateTon({ address }).unwrap(), {
          loading: t("toast-loading"),
          success: t("ton-response-success"),
          error: (error) => {
            if (error.errorCode === LIMIT_REACHED) {
              return t("ton-response-error-limit")
            } else {
              return t("ton-response-error")
            }
          },
        })
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  if (!userProfile) return null

  const { tonWallet } = userProfile

  const onAddClick = async () => {
    if (tonConnectUI.connected) {
      await tonConnectUI.disconnect()
      open()
    } else {
      open()
    }
  }

  return (
    <RowItem className="relative group justify-end">
      <span
        className={cn(
          "mr-auto",
          tonWallet ? "text-gray-1 dark:text-gray-4" : "text-gray-3"
        )}
      >
        ton
      </span>

      {tonWallet ? (
        <span>{cutWalletAddr(tonWallet)}</span>
      ) : (
        <button
          className={cn(
            "hidden sm:block absolute right-0 w-5 h-5 cursor-pointer rounded-full hover:shadow-[0_0_0_1px_#333333] dark:hover:shadow-[0_0_0_1px_#BDBDBD] transition-all active:opacity-80 dark:active:opacity-80",
            scale && "3xl:w-[1.302vw] 3xl:h-[1.302vw]"
          )}
          onClick={onAddClick}
        >
          <Plus
            className={cn(
              "absolute top-0 w-5 h-5",
              scale && "3xl:w-[1.302vw] 3xl:h-[1.302vw]"
            )}
          />
        </button>
      )}

      {/* Mobile editing */}
      <div className="sm:hidden ml-6">
        <UpdateTonWallet
          closeDialog={() => setDialogOpened(false)}
          open={dialogOpened}
          onOpenChange={setDialogOpened}
        >
          {tonWallet ? (
            <EditButton />
          ) : (
            <div
              className={cn(
                "w-5 h-5 cursor-pointer rounded-full hover:shadow-[0_0_0_1px_#333333] dark:hover:shadow-[0_0_0_1px_#BDBDBD] transition-all active:opacity-80 dark:active:opacity-80",
                scale && "3xl:w-[1.302vw] 3xl:h-[1.302vw]"
              )}
              onClick={onAddClick}
            >
              <Plus
                className={cn(
                  "absolute w-5 h-5",
                  scale && "3xl:w-[1.302vw] 3xl:h-[1.302vw]"
                )}
              />
            </div>
          )}
        </UpdateTonWallet>
      </div>

      {/* Desktop editing */}
      {tonWallet && (
        <EditContainer className="hidden sm:flex">
          <UpdateTonWallet
            closeDialog={() => setDialogOpened(false)}
            open={dialogOpened}
            onOpenChange={setDialogOpened}
          >
            <EditButton />
          </UpdateTonWallet>
        </EditContainer>
      )}
    </RowItem>
  )
}

export default ProfileTon
