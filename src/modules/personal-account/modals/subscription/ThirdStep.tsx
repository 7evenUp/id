import { DialogClose } from "@radix-ui/react-dialog"
import { useTranslation } from "react-i18next"

import SubscriptionModalHeader from "../../components/SubscriptionModalHeader"
import SubscriptionModalFooter from "../../components/SubscriptionModalFooter"

import { Dialog, DialogContent } from "@/shared/ui/Dialog"
import ExternalLink from "@/shared/ui/ExternalLink"
import Button from "@/shared/ui/Button"

const ThirdStep = ({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  const { t } = useTranslation("modals")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="pb-14 sm:pb-14 2xl:pb-[3.645vw] sm:max-w-[560px] md:max-w-[650px] xmd:max-w-[820px] lg:max-w-[940px] 2xl:max-w-[61.197vw]">
        <SubscriptionModalHeader step={t("buy-subs.third-step.step")} />
        <div className="flex flex-col h-[400px] lg:h-auto overflow-auto pr-2 2xl:pr-[0.521vw] divide-y divide-gray-4 dark:divide-gray-2">
          <div className="flex flex-col-reverse md:flex-row justify-between gap-10 py-5 2xl:gap-[2.604vw] 2xl:py-[1.302vw]">
            <div className="md:w-[350px] 2xl:w-[22.786vw]">
              <div className="flex flex-wrap gap-3 2xl:gap-[0.781vw]">
                <ExternalLink withTgIcon href="#">
                  канал Prime
                </ExternalLink>
                <ExternalLink withTgIcon href="#">
                  основной чат
                </ExternalLink>
                <ExternalLink withTgIcon href="#">
                  NFT чат
                </ExternalLink>
                <ExternalLink href="#">сервер в Discord</ExternalLink>
              </div>
              <p className="typography-tip mt-5 2xl:mt-[1.302vw]">
                {t("buy-subs.third-step.find-links")}
              </p>
            </div>
            <div className="md:w-[450px] 2xl:w-[29.296vw]">
              <h3 className="typography-head text-transparent bg-gradient-to-r from-corral to-purple bg-clip-text mb-4 2xl:mb-[1.042vw]">
                {t("buy-subs.third-step.part-1-heading")}
              </h3>
              <p className="typography-text-0 mb-2 2xl:mb-[0.521vw]">
                {t("buy-subs.third-step.part-1-text-1")}
              </p>
              <p className="typography-text-0">
                {t("buy-subs.third-step.part-1-text-2")}
              </p>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-between gap-10 py-5 2xl:gap-[2.604vw] 2xl:py-[1.302vw]">
            <div className="md:w-[350px] 2xl:w-[22.786vw]">
              <ExternalLink href="#" className="w-fit">
                Crypton Lobby
              </ExternalLink>
            </div>
            <div className="md:w-[450px] 2xl:w-[29.296vw]">
              <h3 className="typography-head text-transparent bg-gradient-to-r from-corral to-purple bg-clip-text mb-4 2xl:mb-[1.042vw]">
                {t("buy-subs.third-step.part-2-heading")}
              </h3>
              <p className="typography-text-0">
                {t("buy-subs.third-step.part-2-text")}
              </p>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-between gap-10 py-5 2xl:gap-[2.604vw] 2xl:py-[1.302vw]">
            <div className="md:w-[350px] 2xl:w-[22.786vw]">
              <ExternalLink href="#" className="w-fit">
                Calendar
              </ExternalLink>
            </div>
            <div className="md:w-[450px] 2xl:w-[29.296vw]">
              <h3 className="typography-head text-transparent bg-gradient-to-r from-corral to-purple bg-clip-text mb-4 2xl:mb-[1.042vw]">
                {t("buy-subs.third-step.part-3-heading")}
              </h3>
              <p className="typography-text-0 md:mb-6 2xl:mb-[1.563vw]">
                {t("buy-subs.third-step.part-3-text")}
              </p>
              <DialogClose asChild className="hidden md:flex">
                <Button>{t("buy-subs.third-step.okay-btn")}</Button>
              </DialogClose>
            </div>
          </div>
        </div>

        {/* Vissible on Mobile */}
        <div className="pb-2 text-right block md:hidden">
          <DialogClose asChild className="w-fit">
            <Button>{t("buy-subs.third-step.okay-btn")}</Button>
          </DialogClose>
        </div>
        <SubscriptionModalFooter />
      </DialogContent>
    </Dialog>
  )
}

export default ThirdStep
