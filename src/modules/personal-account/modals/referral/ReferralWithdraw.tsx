import { useState } from "react"
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

const ReferralWithdraw = () => {
  const [mainModalOpened, setMainModalOpened] = useState(false)
  const [withdrawToWalletModalOpened, setWithdrawToWalletModalOpened] =
    useState(false)
  const [wallet, setWallet] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [withdrawType, setWithdrawType] =
    useState<WithdrawType>("USDC (ERC-20)")

  return (
    <>
      <Button onClick={() => setMainModalOpened(true)}>вывести</Button>

      <Dialog open={mainModalOpened} onOpenChange={setMainModalOpened}>
        <DialogContent className="max-w-[540px]">
          <DialogHeader className="mb-2 mobile:mb-0 sm:mb-6">
            <DialogTitle>Вывести средства</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center mobile:flex-row gap-5">
            <Button className="w-fit">на баланс ЛК</Button>
            <Button
              className="w-fit"
              onClick={() => {
                setMainModalOpened(false)
                setWithdrawToWalletModalOpened(true)
              }}
            >
              на кошелёк
            </Button>
            <Button className="w-fit">в SHARES</Button>
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
              <HiOutlineArrowNarrowLeft /> назад
            </button>
          </DialogHeader>
          <div className="flex flex-col">
            <Input
              className="mb-5 w-[260px]"
              placeholder="Адрес кошелька"
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
                  placeholder="Сумма вывода"
                  value={withdrawAmount}
                  onChange={(evt) => setWithdrawAmount(evt.currentTarget.value)}
                />
                <span className="typography-text-1 absolute right-0 top-2">
                  {withdrawType}
                </span>
              </div>
              <span className="typography-tip block">Доступная сумма: $62</span>
            </div>
            <Button
              className="w-fit"
              disabled={!wallet.length || !withdrawAmount.length}
            >
              подтвердить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ReferralWithdraw
