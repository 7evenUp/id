import { useTranslation } from "react-i18next"

import ResponseSuccessText from "@/components/ResponseSuccessText"
import ResponseErrorText from "@/components/ResponseErrorText"

import Button from "@/shared/ui/Button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/Dialog"

import { useWithdrawMutation } from "@/redux/api/referral"
import { useUserProfileQuery } from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

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
  const { t: tErrorResponses } = useTranslation("reqResponses")

  const scale = useAppSelector((state) => state.scale.value)

  const { data: userProfile } = useUserProfileQuery()
  const [
    requestWithdraw,
    { isLoading, isError, error, isSuccess, reset, originalArgs },
  ] = useWithdrawMutation()

  const {
    referralInfo: { refBalance },
  } = userProfile!

  const withdrawToCrypton = () => {
    requestWithdraw({
      amount: refBalance,
      kind: "TO_CRYPTON_BALANCE",
      wallet_address: "",
    })
  }

  const withdrawToShares = () => {
    requestWithdraw({
      amount: refBalance,
      kind: "TO_SHARES",
      wallet_address: "",
    })
  }

  if (isError) console.log(error)

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open)
        reset()
      }}
    >
      <DialogContent
        className={cn(
          "max-w-[480px] xl:max-w-[540px]",
          scale && "3xl:w-[31.25vw]"
        )}
      >
        <DialogHeader
          className={cn(
            "mb-2 mobile:mb-0 sm:mb-6",
            scale && "3xl:mb-[1.563vw]"
          )}
        >
          <DialogTitle>{t("ref-withdraw.heading")}</DialogTitle>
        </DialogHeader>
        {isSuccess && originalArgs?.kind === "TO_SHARES" && (
          <ResponseSuccessText
            className={cn("max-w-[320px]", scale && "3xl:max-w-[20.833vw]")}
          >
            {t("ref-withdraw.shares-success")}
          </ResponseSuccessText>
        )}
        {error && (
          <ResponseErrorText>
            {tErrorResponses("server-error")}
          </ResponseErrorText>
        )}

        <div
          className={cn(
            "flex flex-col items-center mobile:flex-row gap-5",
            scale && "3xl:gap-[1.302vw]"
          )}
        >
          <Button
            disabled={
              (isSuccess && originalArgs?.kind === "TO_CRYPTON_BALANCE") ||
              refBalance <= 0.0
            }
            appearence={
              isSuccess && originalArgs?.kind === "TO_CRYPTON_BALANCE"
                ? "success"
                : "outlined"
            }
            isLoading={isLoading && originalArgs?.kind === "TO_CRYPTON_BALANCE"}
            className="w-fit"
            onClick={withdrawToCrypton}
          >
            {isSuccess && originalArgs?.kind === "TO_CRYPTON_BALANCE"
              ? t("ref-withdraw.withdraw-success")
              : t("ref-withdraw.personal-account-btn")}
          </Button>

          <Button className="w-fit" onClick={openWallet}>
            {t("ref-withdraw.wallet-btn")}
          </Button>

          <Button
            disabled={
              (isSuccess && originalArgs?.kind === "TO_SHARES") ||
              refBalance <= 0.0
            }
            appearence={
              isSuccess && originalArgs?.kind === "TO_SHARES"
                ? "success"
                : "outlined"
            }
            isLoading={isLoading && originalArgs?.kind === "TO_SHARES"}
            className="w-fit"
            onClick={withdrawToShares}
          >
            {t("ref-withdraw.shares-btn")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default WithdrawMain
