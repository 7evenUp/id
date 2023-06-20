import { useTranslation } from "react-i18next"

import { ReactComponent as MoveRight} from "@/assets/icons/move-right.svg"

import { DialogFooter } from "@/shared/ui/Dialog"

const SubscriptionModalFooter = () => {
  const { t } = useTranslation("modals")

  return (
    <DialogFooter>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-1 mobile:gap-2">
        <span>{t("buy-subs.footer.need-help")}</span>
        <a
          href="https://t.me/crypton_support"
          target="_blank"
          className="typography-btn-big flex gap-2"
        >
          {t("buy-subs.footer.link")}
          <MoveRight className="w-4 h-4" />
        </a>
      </div>
    </DialogFooter>
  )
}

export default SubscriptionModalFooter
