import { useTranslation } from "react-i18next"

import { DialogContent, DialogFooter, DialogHeader } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"

import {
  useFreezeSubsMutation,
  useUnfreezeSubsMutation,
  useUserProfileQuery,
} from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const FreezeSubs = () => {
  const { t } = useTranslation("modals")

  const scale = useAppSelector((state) => state.scale.value)

  const { data } = useUserProfileQuery()
  const [freeze, { isLoading: isFreezeLoading, isSuccess: isFreezeSuccess }] =
    useFreezeSubsMutation()
  const [
    unfreeze,
    { isLoading: isUnfreezeLoading, isSuccess: isUnfreezeSuccess },
  ] = useUnfreezeSubsMutation()

  const {
    subscriptionInfo: { status, isFreezeAllowed },
  } = data!

  const isFrozen = status === "FROZEN"

  return (
    <DialogContent className="pb-16 max-w-[560px] lg:max-w-[700px] 3xl:max-w-[45.572vw] sm:pb-16 3xl:pb-[4.166vw]">
      <DialogHeader className="flex-col mobile:flex-row mobile:items-center mb-4 mobile:mb-6 3xl:mb-[1.563vw] gap-2 3xl:gap-[0.521vw]">
        <div className="flex flex-col typography-text-1">
          <span className="flex items-center gap-2 3xl:gap-[0.521vw]">
            {t("freeze.status")}:{" "}
            <span
              className={cn(
                "typography-text-1 italic px-1.5 py-0.5 3xl:px-[0.391vw] 3xl:py-[0.13vw] text-gray-6 select-none bg-gradient-to-r rounded-full",
                isFrozen
                  ? "from-frozen-start to-frozen-end"
                  : "from-green to-mint"
              )}
            >
              {isFrozen ? t("freeze.status-frozen") : t("freeze.status-active")}
            </span>
          </span>
          <span className="flex items-baseline gap-2 3xl:gap-[0.521vw]">
            {t("freeze.freeze-available")}:{" "}
            <span className="typography-balance">
              {isFreezeAllowed
                ? t("freeze.freeze-available-true")
                : t("freeze.freeze-available-false")}
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
            disabled={!isFreezeAllowed}
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
        <h3
          className={cn(
            "typography-semi-head mb-2.5",
            scale && "typography-semi-head_large 3xl:mb-[0.651vw]"
          )}
        >
          {t("freeze.sub-freeze-title")}
        </h3>
        <p
          className={cn(
            "typography-text-0 text-black dark:text-gray-4",
            scale && "typography-text-0_large"
          )}
        >
          {t("freeze.sub-freeze-desc")}
        </p>
      </div>
      <div>
        <h3
          className={cn(
            "typography-semi-head mb-2.5",
            scale && "typography-semi-head_large 3xl:mb-[0.651vw]"
          )}
        >
          {t("freeze.how-works-title")}
        </h3>
        <p
          className={cn(
            "typography-text-0 text-black dark:text-gray-4",
            scale && "typography-text-0_large"
          )}
        >
          {t("freeze.how-works-desc")}
        </p>
      </div>
      <DialogFooter>{t("freeze.footer")}</DialogFooter>
    </DialogContent>
  )
}

export default FreezeSubs
