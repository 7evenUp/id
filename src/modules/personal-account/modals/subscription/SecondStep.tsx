import { useState } from "react"
import { useTranslation } from "react-i18next"

import { ReactComponent as Telegram } from "@/assets/icons/telegram.svg"
import { ReactComponent as Discord } from "@/assets/icons/discord.svg"
import { ReactComponent as Ethereum } from "@/assets/icons/ethereum.svg"
import { ReactComponent as Loader } from "@/assets/icons/loader.svg"

import UpdateTelegram from "../UpdateTelegram"
import UpdateWallet from "../UpdateWallet"

import ModalHeader from "../../components/SubscriptionModalHeader"
import SubscriptionModalFooter from "../../components/SubscriptionModalFooter"
import ModalTrigger from "../../components/ModalTrigger"
import ConfirmButton from "../../components/ConfirmButton"

import { Dialog, DialogContent } from "@/shared/ui/Dialog"
import Input from "@/shared/ui/Input"
import Button from "@/shared/ui/Button"

import {
  useUpdateDiscordMutation,
  useUserProfileQuery,
} from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cutWalletAddr } from "@/utils/cutWalletAddr"

import { cn } from "@/lib/classNames"
import Text0 from "@/shared/typography/Text0"
import TextTip from "@/shared/typography/TextTip"

const SecondStep = ({
  open,
  onOpenChange,
  openThirdStep,
  boughtSubDuration,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  openThirdStep: () => void
  boughtSubDuration: number
}) => {
  const { t } = useTranslation("modals")

  const scale = useAppSelector((state) => state.scale.value)

  const [inputValue, setInputValue] = useState("")

  const { data: userProfile } = useUserProfileQuery()
  const [updateDiscord, { isSuccess, isLoading }] = useUpdateDiscordMutation()

  const { telegramUsername, discordUsername, wallet } = userProfile!

  const onUpdateDiscord = () => {
    updateDiscord({ discordUsername: inputValue })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="pb-14 sm:pb-14 3xl:pb-[3.645vw] sm:max-w-[560px] md:max-w-[650px] xmd:max-w-[800px] 3xl:max-w-[52.083vw]">
        <ModalHeader step={t("buy-subs.second-step.step")} />

        <div className="flex flex-col-reverse md:flex-row justify-between gap-6 md:gap-10 lg:gap-[140px] 3xl:gap-[9.114vw]">
          <div className="flex flex-col">
            <div className="flex flex-col gap-4 w-[270px] 3xl:gap-[1.042vw] 3xl:w-[17.578vw]">
              <div className="flex items-center">
                <Telegram className="w-[18px] h-[18px] 3xl:w-[1.172vw] 3xl:h-[1.172vw]" />
                <Text0 className={cn("ml-2.5", scale && "3xl:ml-[0.651vw]")}>
                  Telegram
                </Text0>
                {telegramUsername ? (
                  <Text0 className="ml-auto">@{telegramUsername}</Text0>
                ) : (
                  <ModalTrigger content={<UpdateTelegram />}>
                    <Button className="ml-auto">
                      {t("buy-subs.second-step.connect-btn")}
                    </Button>
                  </ModalTrigger>
                )}
              </div>
              <div className="flex items-center">
                <Discord className="w-[18px] h-[20px] 3xl:w-[1.172vw] 3xl:h-[1.302vw]" />
                <Text0 className={cn("ml-2.5", scale && "3xl:ml-[0.651vw]")}>
                  Discord
                </Text0>
                {discordUsername ? (
                  <Text0 className="ml-auto">@{discordUsername}</Text0>
                ) : (
                  <div className="ml-auto relative">
                    <Input
                      className="peer"
                      placeholder={t("buy-subs.second-step.ds-placeholder")}
                      value={inputValue}
                      onChange={(evt) => setInputValue(evt.currentTarget.value)}
                    />
                    <div
                      className={cn(
                        "opacity-0 absolute -right-6 top-1 3xl:-right-[1.563vw] 3xl:top-[0.26vw] transition-opacity",
                        inputValue.length && "opacity-100"
                      )}
                    >
                      {isLoading ? (
                        <Loader className="animate-spin w-5 h-5 3xl:w-[1.302vw] 3xl:h-[1.302vw]" />
                      ) : (
                        <ConfirmButton
                          onClick={onUpdateDiscord}
                          className={cn(
                            isSuccess && "bg-success dark:bg-success"
                          )}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <Ethereum className="w-[18px] h-[21px] 3xl:w-[1.172vw] 3xl:h-[1.367vw]" />
                <Text0 className={cn("ml-2.5", scale && "3xl:ml-[0.651vw]")}>
                  {t("buy-subs.second-step.wallet")}
                </Text0>
                {wallet ? (
                  <Text0 className="ml-auto">{cutWalletAddr(wallet)}</Text0>
                ) : (
                  <ModalTrigger content={<UpdateWallet />}>
                    <Button className="ml-auto">
                      {t("buy-subs.second-step.connect-btn")}
                    </Button>
                  </ModalTrigger>
                )}
              </div>
            </div>
            <TextTip className="mt-4 3xl:mt-[0.911vw]">
              {t("buy-subs.second-step.later")}
            </TextTip>

            {/* Vissible on Mobile */}
            <Button
              className="md:hidden mt-6 3xl:mt-[1.563vw] w-fit self-end"
              onClick={openThirdStep}
            >
              {t("buy-subs.second-step.continue-btn")}
            </Button>
          </div>
          <div className="flex flex-col gap-4 3xl:gap-[1.042vw]">
            <h3
              className={cn(
                "typography-head text-transparent bg-gradient-to-r from-corral to-purple bg-clip-text",
                scale && "typography-head_large"
              )}
            >
              {t("buy-subs.second-step.congrats")}
            </h3>
            <Text0>
              {t("buy-subs.second-step.congrats-message", {
                count: boughtSubDuration,
              })}
            </Text0>
            <Button
              className="mt-auto w-fit hidden md:flex"
              onClick={openThirdStep}
            >
              {t("buy-subs.second-step.continue-btn")}
            </Button>
          </div>
        </div>
        <SubscriptionModalFooter />
      </DialogContent>
    </Dialog>
  )
}

export default SecondStep
