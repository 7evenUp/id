import { useTranslation } from "react-i18next"

import Input from "@/shared/ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/shared/ui/Select"
import Switch from "@/shared/ui/Switch"
import SwitchWithText from "@/shared/ui/SwitchWithText"

const ProjectsSettings = () => {
  const { t } = useTranslation("products")

  return (
    <table className="w-full block px-4 py-3 rounded-xl bg-white dark:bg-gray-1 typography-text-1">
      <thead className="mb-6 block">
        <tr className="flex items-baseline gap-6 text-left">
          <th className="w-[60px] sm:w-[100px] xlg:w-[130px]">
            <Input
              placeholder={t("res-bot.th-search")}
              className="w-full xlg:w-auto"
            />
          </th>
          <th className="w-[65px] typography-text-1 text-gray-3 sm:hidden">
            {t("res-bot.th-projects")}/{t("res-bot.th-subs")}
          </th>
          <th className="w-[65px] typography-text-1 text-gray-3 hidden sm:block">
            {t("res-bot.th-projects")}
          </th>
          <th className="w-[90px] typography-text-1 text-gray-3 hidden sm:block">
            {t("res-bot.th-subs")}
          </th>
          <th className="flex-grow-[2] typography-text-1 text-gray-3">
            {t("res-bot.th-socials")}
          </th>
        </tr>
      </thead>
      <tbody className="flex flex-col divide-y divide-gray-4 dark:divide-gray-2">
        <tr className="py-3 flex gap-6">
          <td className="w-[60px] sm:w-[100px] xlg:w-[130px] flex-shrink-0">
            AirNFTs
          </td>
          <td className="w-[65px] flex flex-col gap-1 sm:hidden">
            <Switch />
            <Select defaultValue="all">
              <SelectTrigger />
              <SelectContent>
                <SelectItem value="all">
                  {t("res-bot.subs-options.all")}
                </SelectItem>
                <SelectItem value="main">
                  {t("res-bot.subs-options.important")}
                </SelectItem>
              </SelectContent>
            </Select>
          </td>
          <td className="w-[65px] flex-shrink-0 hidden sm:block">
            <Switch />
          </td>
          <td className="w-[90px] flex-shrink-0 hidden sm:block">
            <Select defaultValue="all">
              <SelectTrigger />
              <SelectContent>
                <SelectItem value="all">
                  {t("res-bot.subs-options.all")}
                </SelectItem>
                <SelectItem value="main">
                  {t("res-bot.subs-options.important")}
                </SelectItem>
              </SelectContent>
            </Select>
          </td>
          <td className="flex-grow-[2] flex gap-2.5 flex-wrap">
            <SwitchWithText>medium</SwitchWithText>
            <SwitchWithText>twitter</SwitchWithText>
            <SwitchWithText>discord</SwitchWithText>
            <SwitchWithText>telegram</SwitchWithText>
          </td>
        </tr>
        <tr className="py-3 flex gap-6">
          <td className="w-[60px] sm:w-[100px] xlg:w-[130px] flex-shrink-0">
            Binance
          </td>
          <td className="w-[65px] flex flex-col gap-1 sm:hidden">
            <Switch />
            <Select defaultValue="main">
              <SelectTrigger />
              <SelectContent>
                <SelectItem value="all">
                  {t("res-bot.subs-options.all")}
                </SelectItem>
                <SelectItem value="main">
                  {t("res-bot.subs-options.important")}
                </SelectItem>
              </SelectContent>
            </Select>
          </td>
          <td className="w-[65px] flex-shrink-0 hidden sm:block">
            <Switch />
          </td>
          <td className="w-[90px] flex-shrink-0 hidden sm:block">
            <Select defaultValue="main">
              <SelectTrigger />
              <SelectContent>
                <SelectItem value="all">
                  {t("res-bot.subs-options.all")}
                </SelectItem>
                <SelectItem value="main">
                  {t("res-bot.subs-options.important")}
                </SelectItem>
              </SelectContent>
            </Select>
          </td>
          <td className="flex-grow-[2] flex-shrink flex gap-2.5 flex-wrap">
            <SwitchWithText>medium</SwitchWithText>
            <SwitchWithText>twitter</SwitchWithText>
            <SwitchWithText>discord</SwitchWithText>
            <SwitchWithText>telegram</SwitchWithText>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default ProjectsSettings
