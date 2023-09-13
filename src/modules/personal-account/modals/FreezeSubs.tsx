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
import Text1 from "@/shared/typography/Text1"
import Text0 from "@/shared/typography/Text0"
import TextAccent from "@/shared/typography/TextAccent"

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
        <div className="flex flex-col">
          <Text1
            className={cn(
              "flex items-center gap-2",
              scale && "3xl:gap-[0.521vw]"
            )}
          >
            {t("freeze.status")}:{" "}
            <span
              className={cn(
                "italic px-1.5 py-0.5 3xl:px-[0.391vw] 3xl:py-[0.13vw] text-gray-6 select-none bg-gradient-to-r rounded-full",
                isFrozen
                  ? "from-frozen-start to-frozen-end"
                  : "from-green to-mint"
              )}
            >
              {isFrozen ? t("freeze.status-frozen") : t("freeze.status-active")}
            </span>
          </Text1>
          <Text1
            className={cn(
              "flex items-baseline gap-2",
              scale && "3xl:gap-[0.521vw]"
            )}
          >
            {t("freeze.freeze-available")}:{" "}
            <TextAccent>
              {isFreezeAllowed
                ? t("freeze.freeze-available-true")
                : t("freeze.freeze-available-false")}
            </TextAccent>
          </Text1>
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
        <Text0 className="text-black dark:text-gray-4">
          {t("freeze.sub-freeze-desc")}
        </Text0>
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
        <Text0 className="text-black dark:text-gray-4">
          {t("freeze.how-works-desc")}
        </Text0>
      </div>
      <DialogFooter>{t("freeze.footer")}</DialogFooter>
    </DialogContent>
  )
}

export default FreezeSubs
