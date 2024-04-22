import IntroModalHeader from "./IntroModalHeader"
import IntroModalFooter from "./IntroModalFooter"

import Text0 from "@/shared/typography/Text0"

import { Dialog, DialogContent } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"
import ExternalLink from "@/shared/ui/ExternalLink"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const Phase4 = ({
  open,
  onOpenChange,
  openThirdPhase,
  close,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  openThirdPhase: () => void
  close: (forever?: boolean) => void
}) => {
  const scale = useAppSelector((state) => state.scale.value)

  const onPrevClick = () => {
    openThirdPhase()
  }

  const onClose = () => {
    close(true)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "sm:max-w-[500px] md:max-w-[500px] 2xl:max-w-[600px] sm:p-6",
          scale && "3xl:w-[39.06vw] 3xl:p-[1.5625vw]"
        )}
      >
        <IntroModalHeader phase="Этап 4/4" />

        <div>
          <Text0 className={cn("mb-1", scale && "3xl:mb-[0.26vw]")}>
            Не знаете с чего начать? Посмотрите наглядный план действий:
          </Text0>
          <ExternalLink
            className="w-fit"
            href="https://www.notion.so/crypton-prime/acfd7a937ae941e1a5082316b5a81e70"
          >
            план действий
          </ExternalLink>
        </div>
        <div>
          <Text0 className={cn("mb-1", scale && "3xl:mb-[0.26vw]")}>
            Так же предоставляем к вашему просмотрю обучающие видеоролики:
          </Text0>

          <div
            className={cn("flex flex-wrap gap-2", scale && "3xl:gap-[0.52vw]")}
          >
            <ExternalLink
              href="https://youtu.be/8lmqgO7VILw"
              className="w-fit tabular-nums"
            >
              Урок 1
            </ExternalLink>
            <ExternalLink
              href="https://youtu.be/uOwecThZboQ"
              className="w-fit tabular-nums"
            >
              Урок 2
            </ExternalLink>
            <ExternalLink
              href="https://youtu.be/NMPa_lWONGw"
              className="w-fit tabular-nums"
            >
              Урок 3
            </ExternalLink>
          </div>
        </div>

        <div
          className={cn(
            "flex gap-2 mt-6",
            scale && "3xl:gap-[0.52vw] 3xl:mt-[1.5625vw]"
          )}
        >
          <Button onClick={onPrevClick}>Назад</Button>
          <Button onClick={onClose}>Закончить</Button>
        </div>

        <IntroModalFooter close={close} />
      </DialogContent>
    </Dialog>
  )
}

export default Phase4
