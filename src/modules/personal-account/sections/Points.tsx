import { useTranslation } from "react-i18next"

import CryptonIcon from "@/assets/icons/crypton-logo.svg?react"
import HelpCircle from "@/assets/icons/help-circle.svg?react"

import PointsInfo from "../modals/points/PointsInfo"
import ModalTrigger from "../components/ModalTrigger"

import AccentNumber from "@/shared/typography/AccentNumber"
import Subheading from "@/shared/typography/Subheading"
import Text0 from "@/shared/typography/Text0"

import RowItem from "@/shared/components/RowItem"

import { Skeleton } from "@/shared/ui/Skeleton"

import { useAppSelector } from "@/redux/hooks"
import { useNutcrackersQuery, useUserProfileQuery } from "@/redux/api/profile"

import { cn } from "@/lib/classNames"
import useSendEvent from "@/shared/hooks/useSendEvent"

const Points = () => {
  const { t } = useTranslation("profile")

  const { sendEvent } = useSendEvent()

  const scale = useAppSelector((state) => state.scale.value)

  const { data: profileData } = useUserProfileQuery()
  const { data: nutcrackersData, isLoading } = useNutcrackersQuery()

  const { points } = profileData!

  return (
    <div>
      <div
        className={cn(
          "flex justify-between items-center pb-4",
          scale && "3xl:pb-[1.042vw]"
        )}
      >
        <div
          className={cn("flex items-center gap-2", scale && "3xl:gap-[0.52vw]")}
        >
          <Subheading>{t("points.heading")}</Subheading>
          <CryptonIcon
            className={cn(
              "w-6 h-6",
              scale && "3xl:w-[1.5625vw] 3xl:h-[1.5625vw]"
            )}
          />
        </div>
        <ModalTrigger content={<PointsInfo />}>
          <div
            onClick={() => {
              sendEvent({ name: "crypton_points_modal_open" })
            }}
          >
            <HelpCircle
              className={cn(
                "cursor-pointer stroke-1 hover:fill-gray-1 hover:text-white active:opacity-80 dark:active:opacity-80 dark:text-gray-4 dark:hover:fill-gray-2 w-[26px] h-[26px]",
                scale && "3xl:w-[1.692vw] 3xl:h-[1.692vw]"
              )}
            />
          </div>
        </ModalTrigger>
      </div>

      <div className="flex flex-col border-t border-gray-4 dark:border-gray-1">
        <RowItem className="items-start">
          <Text0 className="flex-shrink-0">
            {t("points.balance")}: <AccentNumber>{points}</AccentNumber>
          </Text0>
        </RowItem>
        {isLoading ? (
          <RowItem
            className={cn("justify-start gap-2", scale && "3xl:gap-[0.52vw]")}
          >
            <Text0 className="flex-shrink-0">{t("points.cashback")}:</Text0>
            <Skeleton
              className={cn(
                "w-5 h-4",
                scale && "3xl:w-[1.302vw] 3xl:h-[1.041vw]"
              )}
            />
          </RowItem>
        ) : (
          nutcrackersData && (
            <RowItem className="items-start">
              <Text0 className="flex-shrink-0">
                {t("points.cashback")}:{" "}
                <AccentNumber>
                  {Math.round(nutcrackersData.pointsCacheBack * 100)}%
                </AccentNumber>
              </Text0>
            </RowItem>
          )
        )}
      </div>
    </div>
  )
}

export default Points
