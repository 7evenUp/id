import { useTranslation } from "react-i18next"

import { DialogContent, DialogFooter, DialogHeader } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"

const FreezeSubs = () => {
  const { t } = useTranslation("modals")
  return (
    <DialogContent className="pb-16 max-w-[560px] lg:max-w-[700px] sm:pb-16">
      <DialogHeader className="flex-col mobile:flex-row mobile:items-center mb-4 mobile:mb-6 gap-2">
        <div className="flex flex-col typography-text-1">
          <span className="flex items-center gap-2">
            {t("freeze.status")}:{" "}
            <span className="bg-success text-white rounded-full px-1.5">
              Активна
            </span>
          </span>
          <span className="flex items-baseline gap-2">
            {t("freeze.freeze-available")}:{" "}
            <span className="typography-balance">есть</span>
          </span>
        </div>
        <Button className="w-fit">{t("freeze.confirm-btn")}</Button>
      </DialogHeader>
      <div>
        <h3 className="typography-semi-head mb-2.5">
          {t("freeze.sub-freeze-title")}
        </h3>
        <p className="typography-text-0 text-black dark:text-gray-4">
          {t("freeze.sub-freeze-desc")}
        </p>
      </div>
      <div>
        <h3 className="typography-semi-head mb-2.5">
          {t("freeze.how-works-title")}
        </h3>
        <p className="typography-text-0 text-black dark:text-gray-4">
          {t("freeze.how-works-desc")}
        </p>
      </div>
      <DialogFooter>{t("freeze.footer")}</DialogFooter>
    </DialogContent>
  )
}

export default FreezeSubs
