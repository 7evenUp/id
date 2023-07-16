import { useTranslation } from "react-i18next"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import ExternalLink from "@/shared/ui/ExternalLink"

import { useUserProfileQuery } from "@/redux/api/profile"

const ReferralInfo = () => {
  const { t } = useTranslation("modals")

  const { data: profileData } = useUserProfileQuery()

  if (!profileData) return null

  const {
    referralInfo: { refProgramLevel, toNextLevelRemained, refCashBack },
  } = profileData

  return (
    <DialogContent className="sm:max-w-[550px] md:max-w-[680px] 2xl:w-[44.27vw]">
      <DialogHeader>
        <DialogTitle>{t("ref-info.heading")}</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col md:flex-row justify-between items-center mobile:items-start md:items-stretch h-[400px] md:h-auto overflow-auto pr-2 gap-6 2xl:pr-[0.521vw] 2xl:gap-[1.563vw]">
        <div className="flex flex-col gap-6 2xl:gap-[1.563vw] basis-1/2">
          <p className="typography-text-0">{t("ref-info.text-1")}</p>
          <p className="typography-text-0">{t("ref-info.text-2")}</p>
          <div className="flex flex-col gap-1 2xl:gap-[0.26vw] bg-gray-6 dark:bg-gray-2 px-6 py-3 rounded-xl 2xl:px-[1.563vw] 2xl:py-[0.781vw] 2xl:rounded-[0.781vw] mt-auto typography-text-1 w-fit">
            <span>
              {t("ref-info.level")}: {refProgramLevel}
            </span>
            <span>
              {t("ref-info.to-next-level")}: {toNextLevelRemained}
            </span>
            <span>
              {t("ref-info.cashback")}: {refCashBack * 100}%
            </span>
          </div>
        </div>
        <div className="w-full mobile:w-[210px] 2xl:w-[13.671vw] flex flex-col gap-5 2xl:gap-[1.302vw]">
          <h2 className="typography-balance">{t("ref-info.table-heading")}</h2>
          <LevelsTable />
          <p className="typography-tip">{t("ref-info.after-10")}</p>
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

  return (
    <table>
      <thead className="text-gray-3 typography-tip">
        <tr>
          <th className="text-left pb-3 2xl:pb-[0.781vw]">
            {t("ref-info.th-lvl")}
          </th>
          <th className="pb-3 2xl:pb-[0.781vw]">{t("ref-info.th-refs")}</th>
          <th className="text-right pb-3 2xl:pb-[0.781vw]">
            {t("ref-info.th-profit")}
          </th>
        </tr>
      </thead>
      <tbody className="typography-text-2 divide-y divide-gray-4 dark:divide-gray-2">
        <tr>
          <td className="text-left py-1 2xl:py-[0.26vw]">0</td>
          <td className="text-center">0</td>
          <td className="text-right">10%</td>
        </tr>
        <tr>
          <td className="text-left py-1 2xl:py-[0.26vw]">1</td>
          <td className="text-center">5</td>
          <td className="text-right">11%</td>
        </tr>
        <tr>
          <td className="text-left py-1 2xl:py-[0.26vw]">2</td>
          <td className="text-center">8</td>
          <td className="text-right">12%</td>
        </tr>
        <tr>
          <td className="text-left py-1 2xl:py-[0.26vw]">3</td>
          <td className="text-center">10</td>
          <td className="text-right">13%</td>
        </tr>
        <tr>
          <td className="text-left py-1 2xl:py-[0.26vw]">4</td>
          <td className="text-center">17</td>
          <td className="text-right">14%</td>
        </tr>
        <tr>
          <td className="text-left py-1 2xl:py-[0.26vw]">5</td>
          <td className="text-center">25</td>
          <td className="text-right">15%</td>
        </tr>
        <tr>
          <td className="text-left py-1 2xl:py-[0.26vw]">6</td>
          <td className="text-center">30</td>
          <td className="text-right">16%</td>
        </tr>
        <tr>
          <td className="text-left py-1 2xl:py-[0.26vw]">7</td>
          <td className="text-center">35</td>
          <td className="text-right">17%</td>
        </tr>
        <tr>
          <td className="text-left py-1 2xl:py-[0.26vw]">8</td>
          <td className="text-center">40</td>
          <td className="text-right">18%</td>
        </tr>
        <tr>
          <td className="text-left py-1 2xl:py-[0.26vw]">9</td>
          <td className="text-center">45</td>
          <td className="text-right">19%</td>
        </tr>
        <tr>
          <td className="text-left py-1 2xl:py-[0.26vw]">10</td>
          <td className="text-center">50</td>
          <td className="text-right">20%</td>
        </tr>
      </tbody>
    </table>
  )
}

export default ReferralInfo
