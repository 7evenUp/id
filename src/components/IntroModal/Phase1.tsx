import IntroModalHeader from "./IntroModalHeader"
import IntroModalFooter from "./IntroModalFooter"

import Text0 from "@/shared/typography/Text0"

import { Dialog, DialogContent } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const Phase1 = ({
  open,
  onOpenChange,
  openSecondPhase,
  close,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  openSecondPhase: () => void
  close: (forever?: boolean) => void
}) => {
  const scale = useAppSelector((state) => state.scale.value)

  const onNextClick = () => {
    openSecondPhase()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "sm:max-w-[500px] md:max-w-[500px] 2xl:max-w-[600px] sm:p-6",
          scale && "3xl:w-[39.06vw] 3xl:p-[1.5625vw]"
        )}
      >
        <IntroModalHeader phase="Этап 1/4" />

        <Text0>
          Для того, чтобы начать работу с Prime, сперва активируйте{" "}
          <a
            className="text-res-bot-blue underline underline-offset-4 hover:opacity-70"
            href={import.meta.env.VITE_TG_BOT_LINK}
            target="_blank"
          >
            телеграм бота
          </a>
          .
        </Text0>
        <Text0>После активации, переходите к следующему шагу.</Text0>

        <Button
          onClick={onNextClick}
          className={cn("w-fit mt-6", scale && "3xl:mt-[1.5625vw]")}
        >
          Далее
        </Button>

        <IntroModalFooter close={close} />
      </DialogContent>
    </Dialog>
  )
}

export default Phase1
