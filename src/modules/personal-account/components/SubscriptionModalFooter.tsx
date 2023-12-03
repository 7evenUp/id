import { useTranslation } from "react-i18next"

import MoveRight from "@/assets/icons/move-right.svg?react"

import { DialogFooter } from "@/shared/ui/Dialog"
import { useAppSelector } from "@/redux/hooks"
import { cn } from "@/lib/classNames"

const SubscriptionModalFooter = () => {
  const { t } = useTranslation("modals")

  const scale = useAppSelector((state) => state.scale.value)

  return (
    <DialogFooter>
      <div
        className={cn(
          "flex flex-col sm:flex-row justify-between items-center gap-1 mobile:gap-2",
          scale && "3xl:gap-[0.521vw]"
        )}
      >
        <span>{t("buy-subs.footer.need-help")}</span>
        <a
          href="https://t.me/crypton_support"
          target="_blank"
          className={cn(
            "typography-btn-big flex gap-2",
            scale && "typography-btn-big_large 3xl:gap-[0.521vw]"
          )}
        >
          {t("buy-subs.footer.link")}
          <MoveRight
            className={cn(
              "w-4 h-4",
              scale && "3xl:w-[1.042vw] 3xl:h-[1.042vw]"
            )}
          />
        </a>
      </div>
    </DialogFooter>
  )
}

export default SubscriptionModalFooter
