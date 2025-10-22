import { useTranslation } from "react-i18next"

import SharesStore from "../modals/shares/SharesStore"
import SharesHistory from "../modals/shares/SharesHistory"

import ModalTrigger from "../components/ModalTrigger"

import AccentNumber from "@/shared/typography/AccentNumber"
import Subheading from "@/shared/typography/Subheading"
import Text0 from "@/shared/typography/Text0"

import RowItem from "@/shared/components/RowItem"

import Button from "@/shared/ui/Button"
import { Skeleton } from "@/shared/ui/Skeleton"

import { useAppSelector } from "@/redux/hooks"
import { useUserProfileQuery } from "@/redux/api/profile"
import { useGetSharesHistoryQuery } from "@/redux/api/user"

import { cn } from "@/lib/classNames"

const Shares = () => {
  const { t } = useTranslation("profile")

  const scale = useAppSelector((state) => state.scale.value)

  const { data: profileData } = useUserProfileQuery()
  const { isLoading } = useGetSharesHistoryQuery()

  const { investFundBalance } = profileData!

  if (isLoading)
    return (
      <div>
        <Skeleton className="mb-4 h-[22px] w-20" />
        <div className="border-t border-gray-4 dark:border-gray-1">
          <RowItem>
            <Skeleton className="h-5 w-[100px]" />
            <Skeleton className="h-[22px] w-44" />
          </RowItem>
        </div>
      </div>
    )

  return (
    <div>
      <div
        className={cn(
          "flex items-center justify-between pb-4",
          scale && "3xl:pb-[1.042vw]"
        )}
      >
        <Subheading>Shares</Subheading>
      </div>

      <div className="flex flex-col border-t border-gray-4 dark:border-gray-1">
        <RowItem className="items-start">
          <Text0 className="flex-shrink-0">
            {t("shares.balance")}:{" "}
            <AccentNumber>{investFundBalance}</AccentNumber>
          </Text0>
          <div
            className={cn(
              "flex flex-wrap justify-end gap-1.5 xl:gap-3",
              scale && "3xl:gap-[0.781vw]"
            )}
          >
            <ModalTrigger content={<SharesHistory />}>
              <Button>{t("shares.history")}</Button>
            </ModalTrigger>
            <ModalTrigger content={<SharesStore />}>
              <Button>{t("shares.convert")}</Button>
            </ModalTrigger>
          </div>
        </RowItem>
      </div>
    </div>
  )
}

export default Shares
