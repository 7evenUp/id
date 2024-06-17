import { useTranslation } from "react-i18next"

import PrimeIcon from "@/assets/icons/products/Prime.svg?react"
import PrimeActiveIcon from "@/assets/icons/products/Prime_Active.svg?react"
import CalendarIcon from "@/assets/icons/products/Calendar.svg?react"
import CalendarActiveIcon from "@/assets/icons/products/Calendar_Active.svg?react"

import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/shared/ui/Dialog"

import Text1 from "@/shared/typography/Text1"
import TextTip from "@/shared/typography/TextTip"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const SelectSubscription = ({
  open,
  onOpenChange,
  openPrime,
  openCalendar,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  openPrime: () => void
  openCalendar: () => void
}) => {
  const { t } = useTranslation("modals")

  const scale = useAppSelector((state) => state.scale.value)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "sm:max-w-[550px] md:max-w-[680px] 2xl:max-w-[800px]",
          scale && "3xl:w-[44.27vw]"
        )}
      >
        <DialogHeader>
          <DialogTitle>{t("buy-subs.selection.title")}</DialogTitle>
        </DialogHeader>

        <div
          className={cn(
            "flex justify-center flex-col sm:flex-row gap-4 sm:gap-10",
            scale && "3xl:gap-[2.6vw]"
          )}
        >
          <Card onClick={openPrime}>
            <div
              className={cn(
                "flex items-center gap-3",
                scale && "3xl:gap-[0.781vw]"
              )}
            >
              <PrimeActiveIcon
                className={cn(
                  "group-hover:block group-hover:scale-105 hidden w-[27px] h-[30px]",
                  scale && "3xl:w-[1.757vw] 3xl:h-[1.953vw]"
                )}
              />
              <PrimeIcon
                className={cn(
                  "group-hover:hidden block dark:fill-gray-5 w-[27px] h-[30px]",
                  scale && "3xl:w-[1.757vw] 3xl:h-[1.953vw]"
                )}
              />
              <span
                className={cn(
                  "text-[22px]/[22px] 2xl:text-2xl tracking-[0.03em] font-semibold",
                  scale && "3xl:text-[1.432vw]/[1.432vw]"
                )}
              >
                Prime
              </span>
            </div>
            <TextTip
              className={cn("mt-2 text-left", scale && "3xl:mt-[0.52vw]")}
            >
              {t("buy-subs.selection.prime-includes")}
            </TextTip>
            <Text1
              className={cn(
                "mt-2 text-left group-hover:translate-y-2 transition-transform duration-500",
                scale && "3xl:group-hover:translate-y-[0.52vw] 3xl:mt-[0.52vw]"
              )}
            >
              {t("buy-subs.selection.prime-text")}
            </Text1>
          </Card>
          <Card onClick={openCalendar}>
            <div
              className={cn(
                "flex items-center gap-3",
                scale && "3xl:gap-[0.781vw]"
              )}
            >
              <CalendarActiveIcon
                className={cn(
                  "group-hover:block hidden w-[30px] h-[30px]",
                  scale && "3xl:w-[1.953vw] 3xl:h-[1.953vw]"
                )}
              />
              <CalendarIcon
                className={cn(
                  "group-hover:hidden block dark:fill-gray-5 w-[30px] h-[30px]",
                  scale && "3xl:w-[1.953vw] 3xl:h-[1.953vw]"
                )}
              />
              <span
                className={cn(
                  "text-[22px]/[22px] 2xl:text-2xl tracking-[0.03em] font-semibold",
                  scale && "3xl:text-[1.432vw]/[1.432vw]"
                )}
              >
                Calendar
              </span>
            </div>
            <Text1
              className={cn(
                "mt-2 text-left group-hover:translate-y-2 transition-transform duration-500",
                scale && "3xl:group-hover:translate-y-[0.52vw] 3xl:mt-[0.52vw]"
              )}
            >
              {t("buy-subs.selection.calendar-text")}
            </Text1>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SelectSubscription

const Card = ({
  onClick,
  children,
}: {
  onClick: () => void
  children: React.ReactNode
}) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <button
      onClick={onClick}
      className={cn(
        "group min-w-[188px] flex-1 flex flex-col items-center rounded-xl border border-gray-1 dark:border-gray-3 p-5 hover:bg-stone-200/30 dark:hover:bg-stone-200/10 active:scale-95 transition-all duration-500",
        scale &&
          "3xl:min-h-[16.08vw] 3xl:min-w-[12.239vw] 3xl:rounded-[0.781vw] 3xl:p-[1.302vw]"
      )}
    >
      {children}
    </button>
  )
}
