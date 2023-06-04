import { useTranslation } from "react-i18next"

import Button from "@/shared/ui/Button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/Dialog"

import { useWithdrawMutation } from "@/redux/api/referral"
import { useUserProfileQuery } from "@/redux/api/profile"

const WithdrawMain = ({
  open,
  onOpenChange,
  openWallet,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  openWallet: () => void
}) => {
  const { t } = useTranslation("modals")

  const { data: userProfile } = useUserProfileQuery()
  const [trigger, { isLoading, isError, error, isSuccess }] =
    useWithdrawMutation()

  const {
    referralInfo: { refBalance },
  } = userProfile!

  if (isError) console.log(error)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[540px]">
        <DialogHeader className="mb-2 mobile:mb-0 sm:mb-6">
          <DialogTitle>{t("ref-withdraw.heading")}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center mobile:flex-row gap-5">
          <Button
            disabled={isSuccess || refBalance === 0.0}
            appearence={isSuccess ? "success" : "outlined"}
            isLoading={isLoading}
            className="w-fit"
            onClick={() => {
              trigger({
                amount: refBalance,
                kind: "TO_CRYPTON_BALANCE",
                wallet_address: "0x123",
              })
            }}
          >
            {isSuccess ? "Выведено" : t("ref-withdraw.personal-account-btn")}
          </Button>
          <Button className="w-fit" onClick={openWallet}>
            {t("ref-withdraw.wallet-btn")}
          </Button>
          <Button className="w-fit">{t("ref-withdraw.shares-btn")}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default WithdrawMain
