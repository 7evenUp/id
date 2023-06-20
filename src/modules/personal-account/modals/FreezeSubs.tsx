import { useTranslation } from "react-i18next"

import { DialogContent, DialogFooter, DialogHeader } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"

import {
  useFreezeSubsMutation,
  useUnfreezeSubsMutation,
  useUserProfileQuery,
} from "@/redux/api/profile"

import { cn } from "@/lib/classNames"

const FreezeSubs = () => {
  const { t } = useTranslation("modals")

  const { data } = useUserProfileQuery()
  const [freeze, { isLoading: isFreezeLoading, isSuccess: isFreezeSuccess }] =
    useFreezeSubsMutation()
  const [
    unfreeze,
    { isLoading: isUnfreezeLoading, isSuccess: isUnfreezeSuccess },
  ] = useUnfreezeSubsMutation()

  const {
    subscriptionInfo: { status },
  } = data!

  const isFrozen = status === "FROZEN"

  return (
    <DialogContent className="pb-16 max-w-[560px] lg:max-w-[700px] sm:pb-16">
      <DialogHeader className="flex-col mobile:flex-row mobile:items-center mb-4 mobile:mb-6 gap-2">
        <div className="flex flex-col typography-text-1">
          <span className="flex items-center gap-2">
            {t("freeze.status")}:{" "}
            <span
              className={cn(
                "typography-text-1 italic px-1.5 py-0.5 text-gray-6 select-none bg-gradient-to-r rounded-full",
                isFrozen
                  ? "from-frozen-start to-frozen-end"
                  : "from-green to-mint"
              )}
            >
              {isFrozen ? t("freeze.status-frozen") : t("freeze.status-active")}
            </span>
          </span>
          <span className="flex items-baseline gap-2">
            {t("freeze.freeze-available")}:{" "}
            <span className="typography-balance">
              {isFrozen
                ? t("freeze.freeze-available-false")
                : t("freeze.freeze-available-true")}
            </span>
          </span>
        </div>
        {isFrozen ? (
          <Button
            className="w-fit"
            isLoading={isUnfreezeLoading}
            appearence={isUnfreezeSuccess ? "success" : "outlined"}
            onClick={() => unfreeze()}
          >
            {isUnfreezeSuccess
              ? t("freeze.request-success")
              : t("freeze.unfreeze-btn")}
          </Button>
        ) : (
          <Button
            className="w-fit"
            disabled={isFrozen}
            isLoading={isFreezeLoading}
            appearence={isFreezeSuccess ? "success" : "outlined"}
            onClick={() => freeze()}
          >
            {isFreezeSuccess
              ? t("freeze.request-success")
              : t("freeze.confirm-btn")}
          </Button>
        )}
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
