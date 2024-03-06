import { useTranslation } from "react-i18next"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"

import Text1 from "@/shared/typography/Text1"
import Text0 from "@/shared/typography/Text0"
import TextAccent from "@/shared/typography/TextAccent"

import { useUserProfileQuery } from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const PointsInfo = () => {
  const { t } = useTranslation("modals")

  const scale = useAppSelector((state) => state.scale.value)

  const { data: profileData } = useUserProfileQuery()

  if (!profileData) return null

  return (
    <DialogContent
      className={cn(
        "sm:max-w-[550px] md:max-w-[680px] 2xl:max-w-[800px]",
        scale && "3xl:w-[44.27vw]"
      )}
      onCloseAutoFocus={(event) => event.preventDefault()}
    >
      <DialogHeader>
        <DialogTitle>{t("points-info.heading")}</DialogTitle>
      </DialogHeader>
      <div
        className={cn(
          "flex flex-col md:flex-row justify-between items-center mobile:items-start md:items-stretch h-[400px] md:h-auto overflow-auto pr-2 gap-6",
          scale && "3xl:pr-[0.521vw] 3xl:gap-[1.563vw]"
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-6 basis-1/2",
            scale && "3xl:gap-[1.563vw]"
          )}
        >
          <Text0>
            {t("points-info.text-1")} (<TextAccent>Crypton Points</TextAccent>).
          </Text0>
          <Text0>
            {t("points-info.text-2-1")} <TextAccent>Crypton Points</TextAccent>{" "}
            {t("points-info.text-2-2")}
          </Text0>
          <Text0>
            {t("points-info.text-3-1")} <TextAccent>Crypton Points</TextAccent>{" "}
            {t("points-info.text-3-2")}
          </Text0>
        </div>
        <div
          className={cn(
            "w-full mobile:w-[210px] 2xl:w-[270px] flex flex-col gap-5",
            scale && "3xl:w-[13.671vw] 3xl:gap-[1.302vw]"
          )}
        >
          <TextAccent>{t("points-info.table-title")}</TextAccent>
          <RarityTable />
          <Text1>{t("points-info.base-cashback")}</Text1>
        </div>
      </div>
    </DialogContent>
  )
}

const rarityData = [
  {
    rarity: "common",
    cashback: "10%",
  },
  {
    rarity: "uncommon",
    cashback: "12%",
  },
  {
    rarity: "rare",
    cashback: "14%",
  },
  {
    rarity: "mythical",
    cashback: "16%",
  },
  {
    rarity: "epic",
    cashback: "18%",
  },
  {
    rarity: "legendary",
    cashback: "20%",
  },
]

const RarityTable = () => {
  const { t } = useTranslation("modals")

  const scale = useAppSelector((state) => state.scale.value)

  const { data: profileData } = useUserProfileQuery()

  if (!profileData) return null

  return (
    <table>
      <thead
        className={cn(
          "text-gray-3 typography-text-2",
          scale && "typography-text-2_large"
        )}
      >
        <tr>
          <th className={cn("text-left pb-3", scale && "3xl:pb-[0.781vw]")}>
            {t("points-info.rarity")}
          </th>
          <th className={cn("text-right pb-3", scale && "3xl:pb-[0.781vw]")}>
            {t("points-info.cashback")}
          </th>
        </tr>
      </thead>
      <tbody
        className={cn(
          "typography-accent divide-y divide-gray-4 dark:divide-gray-2",
          scale && "typography-accent_large"
        )}
      >
        {rarityData.map((el) => (
          <tr
            key={el.rarity}
            className={cn(
              el.rarity === "uncommon"
                ? "text-tools-green"
                : el.rarity === "rare"
                ? "text-res-bot-blue"
                : el.rarity === "mythical"
                ? "text-prime-pink"
                : el.rarity === "epic"
                ? "text-university-velvet"
                : el.rarity === "legendary" && "text-academy-gold"
            )}
          >
            <td
              className={cn(
                "text-left py-1 capitalize",
                scale && "3xl:py-[0.26vw]"
              )}
            >
              {/* {el.lvl === refProgramLevel ? (
                <AccentNumber>{el.lvl}</AccentNumber>
              ) : (
                el.lvl
              )} */}
              {el.rarity}
            </td>
            <td className="text-right tabular-nums">
              {/* {el.lvl === refProgramLevel ? (
                <AccentNumber>{el.cashback}</AccentNumber>
              ) : (
                el.cashback
              )} */}
              {el.cashback}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default PointsInfo
