import { useTonConnectModal, useTonConnectUI } from "@tonconnect/ui-react"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { useTranslation } from "react-i18next"

import Text0 from "@/shared/typography/Text0"
import Button from "@/shared/ui/Button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/Dialog"

import { useUserProfileQuery } from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cutWalletAddr } from "@/utils/cutWalletAddr"

import { cn } from "@/lib/classNames"

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

  const scale = useAppSelector((state) => state.scale.value)

  const [tonConnectUI] = useTonConnectUI()
  const { open: openTon } = useTonConnectModal()

  const { data: userProfileData } = useUserProfileQuery()

  const { tonWallet } = userProfileData!

  const handleConnect = async () => {
    closeDialog()
    tonConnectUI.setConnectRequestParameters({
      state: "ready",
      value: { tonProof: "payload to sign" },
    })
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
