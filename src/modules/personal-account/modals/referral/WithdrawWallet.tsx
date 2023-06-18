import { useState } from "react"
import { useTranslation } from "react-i18next"

import { ReactComponent as MoveLeft } from "@/assets/icons/move-left.svg"

import { Dialog, DialogContent, DialogHeader } from "@/shared/ui/Dialog"
import Input from "@/shared/ui/Input"
import Button from "@/shared/ui/Button"
import Chip from "@/shared/ui/Chip"

import { useUserProfileQuery } from "@/redux/api/profile"

type WithdrawType = "USDC (ERC-20)" | "USDT (ERC-20)" | "USDT (TRC-20)"

const WithdrawWallet = ({
  open,
  onOpenChange,
  openMain,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  openMain: () => void
}) => {
  const { t } = useTranslation("modals")

  const [wallet, setWallet] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [withdrawType, setWithdrawType] =
    useState<WithdrawType>("USDC (ERC-20)")

  const { data: userProfile } = useUserProfileQuery()
  const {
    referralInfo: { refBalance },
  } = userProfile!

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[550px]">
        <DialogHeader>
          <button
            className="typography-btn-big dark:text-gray-5 flex items-center gap-2 hover:text-gray-3 dark:hover:text-gray-3"
            onClick={openMain}
          >
            <MoveLeft className="w-3.5 h-3.5" /> {t("ref-withdraw.back-btn")}
          </button>
        </DialogHeader>
        <div className="flex flex-col">
          <Input
            className="mb-5 w-[260px]"
            placeholder={t("ref-withdraw.address-placeholder")}
            value={wallet}
            onChange={(evt) => setWallet(evt.currentTarget.value)}
          />
          <div className="flex gap-2 flex-wrap mb-8">
            <Chip onClick={() => setWithdrawType("USDC (ERC-20)")}>
              USDC Polygon (ERC20)
            </Chip>
            <Chip onClick={() => setWithdrawType("USDT (ERC-20)")}>
              USDT Polygon (ERC20)
            </Chip>
            <Chip onClick={() => setWithdrawType("USDT (TRC-20)")}>
              USDT Tron (TRC20)
            </Chip>
          </div>
          <div className="mb-5">
            <div className="relative w-[260px]">
              <Input
                className="mb-2 w-[260px]"
                placeholder={t("ref-withdraw.amount-placeholder")}
                value={withdrawAmount}
                onChange={(evt) => setWithdrawAmount(evt.currentTarget.value)}
              />
              <span className="typography-text-1 absolute right-0 top-2">
                {withdrawType}
              </span>
            </div>
            <span className="typography-tip block">
              {t("ref-withdraw.available")}: ${refBalance}
            </span>
          </div>
          <Button
            className="w-fit"
            disabled={!wallet.length || !withdrawAmount.length}
          >
            {t("ref-withdraw.confirm-btn")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default WithdrawWallet
