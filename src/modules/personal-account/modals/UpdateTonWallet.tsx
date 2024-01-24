import { useEffect } from "react"
import {
  toUserFriendlyAddress,
  useTonConnectModal,
  useTonConnectUI,
} from "@tonconnect/ui-react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

import Text0 from "@/shared/typography/Text0"
import Button from "@/shared/ui/Button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/Dialog"

import { useUpdateTonMutation, useUserProfileQuery } from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cutWalletAddr } from "@/utils/cutWalletAddr"

import { LIMIT_REACHED } from "@/utils/errorCodes"

import { cn } from "@/lib/classNames"
import { DialogTrigger } from "@radix-ui/react-dialog"

const UpdateTonWallet = ({
  children,
  open,
  onOpenChange,
  closeDialog,
}: {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
  closeDialog: () => void
}) => {
  const { t } = useTranslation("modals")
  const { t: tBase } = useTranslation()

  const scale = useAppSelector((state) => state.scale.value)

  const [tonConnectUI] = useTonConnectUI()

  const { open: openTon } = useTonConnectModal()

  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange((walletAndWalletInfo) => {
      if (walletAndWalletInfo) {
        const address = toUserFriendlyAddress(
          walletAndWalletInfo.account.address
        )

        toast.promise(updateTon({ address }).unwrap(), {
          loading: tBase("toast-loading"),
          success: tBase("ton-response-success"),
          error: (error) => {
            if (error.errorCode === LIMIT_REACHED) {
              return tBase("ton-response-error-limit")
            } else {
              return tBase("ton-response-error")
            }
          },
        })
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const { data: userProfileData } = useUserProfileQuery()
  const [updateTon] = useUpdateTonMutation()

  const { tonWallet } = userProfileData!

  const handleConnect = async () => {
    closeDialog()
    if (tonConnectUI.connected) {
      await tonConnectUI.disconnect()
      openTon()
    } else {
      openTon()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          "mobile:w-[370px] sm:w-[500px]",
          scale && "3xl:w-[32.552vw]"
        )}
        onCloseAutoFocus={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t("change-ton.heading")}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col">
          <Text0>{t("change-ton.status")}</Text0>{" "}
          <span
            className={cn(
              "text-base font-mono text-black dark:text-gray-5",
              scale && "3xl:text-[1.0417vw]/[1.5625vw]"
            )}
          >
            {cutWalletAddr(tonWallet ? tonWallet : "")}
          </span>
        </div>
        <Text0>
          {t(
            "change-ton.Для изменения, подключите к сайту кошелёк с другим адресом."
          )}
        </Text0>
        <Button className="w-fit" onClick={handleConnect}>
          {t("change-ton.подключить")}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateTonWallet
