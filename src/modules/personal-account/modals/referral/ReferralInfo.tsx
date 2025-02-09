import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/Dialog"
import ExternalLink from "@/shared/ui/ExternalLink"

import Text1 from "@/shared/typography/Text1"
import Text0 from "@/shared/typography/Text0"
import TextTip from "@/shared/typography/TextTip"
import TextAccent from "@/shared/typography/TextAccent"
import AccentNumber from "@/shared/typography/AccentNumber"

import { useUserProfileQuery } from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import {
  SEARCH_PARAM_KEYS,
  SEARCH_PARAM_VALUES,
} from "@/constants/searchParams"

import { cn } from "@/lib/classNames"

const ReferralInfo = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation("modals")

  const [modalOpened, setModalOpened] = useState(false)

  const scale = useAppSelector((state) => state.scale.value)

  const { data: profileData } = useUserProfileQuery()

  useEffect(() => {
    const url = new URL(location.href)
    const openModalParam = url.searchParams.get(SEARCH_PARAM_KEYS.open_modal)

    if (!openModalParam) return

    if (openModalParam === SEARCH_PARAM_VALUES.open_modal.referral_system) {
      setModalOpened(true)
    }
  }, [])

  if (!profileData) return null

  const {
    referralInfo: { refProgramLevel, toNextLevelRemained, refCashBack },
  } = profileData

  return (
    <Dialog open={modalOpened} onOpenChange={setModalOpened}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          "sm:max-w-[550px] md:max-w-[680px] 2xl:max-w-[800px]",
          scale && "3xl:w-[44.27vw]"
        )}
        onCloseAutoFocus={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t("ref-info.heading")}</DialogTitle>
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
            <Text0>{t("ref-info.text-1")}</Text0>
            <Text0>{t("ref-info.text-2")}</Text0>
            <div
              className={cn(
                "flex flex-col gap-1 bg-gray-6 dark:bg-gray-2 px-6 py-3 rounded-xl mt-auto w-fit",
                scale &&
                  "3xl:gap-[0.26vw] 3xl:px-[1.4vw] 3xl:py-[0.781vw] 3xl:rounded-[0.781vw]"
              )}
            >
              <Text1>
                {t("ref-info.level")}: {refProgramLevel}
              </Text1>
              <Text1>
                {t("ref-info.to-next-level")}: {toNextLevelRemained}
              </Text1>
              <Text1>
                {t("ref-info.cashback")}: {refCashBack * 100}%
              </Text1>
            </div>
          </div>
          <div
            className={cn(
              "w-full mobile:w-[210px] 2xl:w-[270px] flex flex-col gap-5",
              scale && "3xl:w-[13.671vw] 3xl:gap-[1.302vw]"
            )}
          >
            <TextAccent>{t("ref-info.table-heading")}</TextAccent>
            <LevelsTable />
            <TextTip>{t("ref-info.after-10")}</TextTip>
            <ExternalLink
              withTgIcon
              href="https://t.me/crypton_support"
              className="w-fit"
            >
              {t("ref-info.link")}
            </ExternalLink>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const levelsData = [
  {
    lvl: 0,
    referralNeeded: 0,
    cashback: "10%",
  },
  {
    lvl: 1,
    referralNeeded: 5,
    cashback: "11%",
  },
  {
    lvl: 2,
    referralNeeded: 8,
    cashback: "12%",
  },
  {
    lvl: 3,
    referralNeeded: 10,
    cashback: "13%",
  },
  {
    lvl: 4,
    referralNeeded: 17,
    cashback: "14%",
  },
  {
    lvl: 5,
    referralNeeded: 25,
    cashback: "15%",
  },
  {
    lvl: 6,
    referralNeeded: 30,
    cashback: "16%",
  },
  {
    lvl: 7,
    referralNeeded: 35,
    cashback: "17%",
  },
  {
    lvl: 8,
    referralNeeded: 40,
    cashback: "18%",
  },
  {
    lvl: 9,
    referralNeeded: 45,
    cashback: "19%",
  },
  {
    lvl: 10,
    referralNeeded: 50,
    cashback: "20%",
  },
]

const LevelsTable = () => {
  const { t } = useTranslation("modals")

  const scale = useAppSelector((state) => state.scale.value)

  const { data: profileData } = useUserProfileQuery()

  if (!profileData) return null

  const {
    referralInfo: { refProgramLevel },
  } = profileData

  return (
    <table>
      <thead
        className={cn(
          "text-gray-3 typography-tip",
          scale && "typography-tip_large"
        )}
      >
        <tr>
          <th className={cn("text-left pb-3", scale && "3xl:pb-[0.781vw]")}>
            {t("ref-info.th-lvl")}
          </th>
          <th className={cn("pb-3", scale && "3xl:pb-[0.781vw]")}>
            {t("ref-info.th-refs")}
          </th>
          <th className={cn("text-right pb-3", scale && "3xl:pb-[0.781vw]")}>
            {t("ref-info.th-profit")}
          </th>
        </tr>
      </thead>
      <tbody
        className={cn(
          "typography-text-2 divide-y divide-gray-4 dark:divide-gray-2",
          scale && "typography-text-2_large"
        )}
      >
        {levelsData.map((el) => (
          <tr key={el.lvl}>
            <td className={cn("text-left py-1", scale && "3xl:py-[0.26vw]")}>
              {el.lvl === refProgramLevel ? (
                <AccentNumber>{el.lvl}</AccentNumber>
              ) : (
                el.lvl
              )}
            </td>
            <td className="text-center">
              {el.lvl === refProgramLevel ? (
                <AccentNumber>{el.referralNeeded}</AccentNumber>
              ) : (
                el.referralNeeded
              )}
            </td>
            <td className="text-right">
              {el.lvl === refProgramLevel ? (
                <AccentNumber>{el.cashback}</AccentNumber>
              ) : (
                el.cashback
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ReferralInfo
