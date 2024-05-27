import { DialogClose } from "@radix-ui/react-dialog"
import { useTranslation } from "react-i18next"

import ModalHeader from "../components/SubscriptionModalHeader"

import { Dialog, DialogContent } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"
import ExternalLink from "@/shared/ui/ExternalLink"

import Text0 from "@/shared/typography/Text0"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const SecondStep = ({
  open,
  onOpenChange,
  boughtSubDuration,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  boughtSubDuration: number
}) => {
  const { t } = useTranslation("modals")

  const scale = useAppSelector((state) => state.scale.value)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "sm:max-w-[560px] md:max-w-[650px] xmd:max-w-[800px]",
          scale && "3xl:max-w-[52.083vw]"
        )}
      >
        <ModalHeader step={t("buy-subs.calendar.second-step.step")} />
        <div
          className={cn("flex flex-col gap-4", scale && "3xl:gap-[1.042vw]")}
        >
          <h3
            className={cn(
              "typography-head text-transparent bg-gradient-to-r from-corral to-purple bg-clip-text",
              scale && "typography-head_large"
            )}
          >
            {t("buy-subs.calendar.second-step.congrats")}
          </h3>
          <Text0>
            {t("buy-subs.calendar.second-step.congrats-message", {
              count: boughtSubDuration,
            })}
          </Text0>
          <div
            className={cn(
              "flex items-center flex-wrap gap-2",
              scale && "3xl:gap-[0.52vw]"
            )}
          >
            <Text0>
              {t("buy-subs.calendar.second-step.access-available")}:
            </Text0>
            <ExternalLink href="https://calendar.crypton.xyz">
              {t("buy-subs.calendar.second-step.go-to-calendar-btn")}
            </ExternalLink>
          </div>
          <DialogClose asChild>
            <Button className="mt-auto w-fit">
              {t("buy-subs.calendar.second-step.continue-btn")}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SecondStep
