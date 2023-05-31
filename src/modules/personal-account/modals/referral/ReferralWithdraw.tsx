import { useState } from "react"
import { useTranslation } from "react-i18next"

import { HiOutlineArrowNarrowLeft } from "react-icons/hi"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"
import Chip from "@/shared/ui/Chip"
import Input from "@/shared/ui/Input"

type WithdrawType = "USDC (ERC-20)" | "USDT (ERC-20)" | "USDT (TRC-20)"

const ReferralWithdraw = ({ triggerText }: { triggerText: string }) => {
  const { t } = useTranslation("modals")

  const [mainModalOpened, setMainModalOpened] = useState(false)
  const [withdrawToWalletModalOpened, setWithdrawToWalletModalOpened] =
    useState(false)
  const [wallet, setWallet] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [withdrawType, setWithdrawType] =
    useState<WithdrawType>("USDC (ERC-20)")

  return (
    <>
      <Button onClick={() => setMainModalOpened(true)}>{triggerText}</Button>

      <Dialog open={mainModalOpened} onOpenChange={setMainModalOpened}>
        <DialogContent className="max-w-[540px]">
          <DialogHeader className="mb-2 mobile:mb-0 sm:mb-6">
            <DialogTitle>{t("ref-withdraw.heading")}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center mobile:flex-row gap-5">
            <Button className="w-fit">
              {t("ref-withdraw.personal-account-btn")}
            </Button>
            <Button
              className="w-fit"
              onClick={() => {
                setMainModalOpened(false)
                setWithdrawToWalletModalOpened(true)
              }}
            >
              {t("ref-withdraw.wallet-btn")}
            </Button>
            <Button className="w-fit">{t("ref-withdraw.shares-btn")}</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={withdrawToWalletModalOpened}
        onOpenChange={setWithdrawToWalletModalOpened}
      >
        <DialogContent className="max-w-[550px]">
          <DialogHeader>
            <button
              className="typography-btn-big dark:text-gray-5 flex items-center gap-2 hover:text-gray-3 dark:hover:text-gray-3"
              onClick={() => {
                setMainModalOpened(true)
                setWithdrawToWalletModalOpened(false)
              }}
            >
              <HiOutlineArrowNarrowLeft /> {t("ref-withdraw.back-btn")}
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
                {t("ref-withdraw.available")}: $62
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
    </>
  )
}

export default ReferralWithdraw
