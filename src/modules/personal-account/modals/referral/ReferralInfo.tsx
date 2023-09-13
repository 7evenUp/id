import { useTranslation } from "react-i18next"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import ExternalLink from "@/shared/ui/ExternalLink"

import Text1 from "@/shared/typography/Text1"
import Text0 from "@/shared/typography/Text0"
import TextTip from "@/shared/typography/TextTip"
import TextAccent from "@/shared/typography/TextAccent"

import { useUserProfileQuery } from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const ReferralInfo = () => {
  const { t } = useTranslation("modals")

  const scale = useAppSelector((state) => state.scale.value)

  const { data: profileData } = useUserProfileQuery()

  if (!profileData) return null

  const {
    referralInfo: { refProgramLevel, toNextLevelRemained, refCashBack },
  } = profileData

  return (
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
                "3xl:gap-[0.26vw] 3xl:px-[1.563vw] 3xl:py-[0.781vw] 3xl:rounded-[0.781vw]"
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
  )
}

const LevelsTable = () => {
  const { t } = useTranslation("modals")

  const scale = useAppSelector((state) => state.scale.value)

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
        <tr>
          <td className={cn("text-left py-1", scale && "3xl:py-[0.26vw]")}>
            0
          </td>
          <td className="text-center">0</td>
          <td className="text-right">10%</td>
        </tr>
        <tr>
          <td className={cn("text-left py-1", scale && "3xl:py-[0.26vw]")}>
            1
          </td>
          <td className="text-center">5</td>
          <td className="text-right">11%</td>
        </tr>
        <tr>
          <td className={cn("text-left py-1", scale && "3xl:py-[0.26vw]")}>
            2
          </td>
          <td className="text-center">8</td>
          <td className="text-right">12%</td>
        </tr>
        <tr>
          <td className={cn("text-left py-1", scale && "3xl:py-[0.26vw]")}>
            3
          </td>
          <td className="text-center">10</td>
          <td className="text-right">13%</td>
        </tr>
        <tr>
          <td className={cn("text-left py-1", scale && "3xl:py-[0.26vw]")}>
            4
          </td>
          <td className="text-center">17</td>
          <td className="text-right">14%</td>
        </tr>
        <tr>
          <td className={cn("text-left py-1", scale && "3xl:py-[0.26vw]")}>
            5
          </td>
          <td className="text-center">25</td>
          <td className="text-right">15%</td>
        </tr>
        <tr>
          <td className={cn("text-left py-1", scale && "3xl:py-[0.26vw]")}>
            6
          </td>
          <td className="text-center">30</td>
          <td className="text-right">16%</td>
        </tr>
        <tr>
          <td className={cn("text-left py-1", scale && "3xl:py-[0.26vw]")}>
            7
          </td>
          <td className="text-center">35</td>
          <td className="text-right">17%</td>
        </tr>
        <tr>
          <td className={cn("text-left py-1", scale && "3xl:py-[0.26vw]")}>
            8
          </td>
          <td className="text-center">40</td>
          <td className="text-right">18%</td>
        </tr>
        <tr>
          <td className={cn("text-left py-1", scale && "3xl:py-[0.26vw]")}>
            9
          </td>
          <td className="text-center">45</td>
          <td className="text-right">19%</td>
        </tr>
        <tr>
          <td className={cn("text-left py-1", scale && "3xl:py-[0.26vw]")}>
            10
          </td>
          <td className="text-center">50</td>
          <td className="text-right">20%</td>
        </tr>
      </tbody>
    </table>
  )
}

export default ReferralInfo
