import { useTranslation } from "react-i18next"

import ModalHeader from "../../components/SubscriptionModalHeader"
import SubscriptionModalFooter from "../../components/SubscriptionModalFooter"

import { Dialog, DialogContent } from "@/shared/ui/Dialog"
import Input from "@/shared/ui/Input"
import Button from "@/shared/ui/Button"

const SecondStep = ({
  open,
  onOpenChange,
  openThirdStep,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  openThirdStep: () => void
}) => {
  const { t } = useTranslation("modals")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="pb-14 sm:pb-14 sm:max-w-[560px] md:max-w-[650px] xmd:max-w-[800px]">
        <ModalHeader step={t("buy-subs.second-step.step")} />

        <div className="flex flex-col-reverse md:flex-row justify-between gap-6 md:gap-10 lg:gap-[140px]">
          <div className="flex flex-col">
            <div className="flex flex-col gap-4 w-[270px]">
              <div className="flex items-center justify-between gap-10">
                <span className="typography-text-0">
                  {t("buy-subs.second-step.email-label")}
                </span>
                <Input
                  type="email"
                  placeholder={t("buy-subs.second-step.email-placeholder")}
                />
              </div>
              <div className="flex items-center justify-between gap-10">
                <span className="typography-text-0">Telegram</span>
                <Input
                  type="email"
                  placeholder={t("buy-subs.second-step.tg-placeholder")}
                />
              </div>
              <div className="flex items-center justify-between gap-10">
                <span className="typography-text-0">Discord</span>
                <Input
                  type="email"
                  placeholder={t("buy-subs.second-step.ds-placeholder")}
                />
              </div>
              <div className="flex items-center justify-between gap-10">
                <span className="typography-text-0">
                  {t("buy-subs.second-step.wallet")}
                </span>
                <Button>{t("buy-subs.second-step.connect-btn")}</Button>
              </div>
            </div>
            <p className="typography-tip mt-4">
              {t("buy-subs.second-step.later")}
            </p>

            {/* Vissible on Mobile */}
            <Button
              className="md:hidden mt-6 w-fit self-end"
              onClick={openThirdStep}
            >
              {t("buy-subs.second-step.continue-btn")}
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="typography-head text-transparent bg-gradient-to-r from-corral to-purple bg-clip-text">
              {t("buy-subs.second-step.congrats")}
            </h3>
            <p className="typography-text-0">
              {t("buy-subs.second-step.congrays-message")}
            </p>
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
