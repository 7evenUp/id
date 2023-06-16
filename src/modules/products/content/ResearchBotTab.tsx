import { useState } from "react"
import { useTranslation } from "react-i18next"

import TabHeader from "../components/TabHeader"
import TabTitle from "../components/TabTitle"
import TextSizeSlider from "../components/TextSizeSlider"
import BackgroundPicker from "../components/BackgroundPicker"
import ProjectsTable from "../components/ProjectsTable"

import Button from "@/shared/ui/Button"
import Switch from "@/shared/ui/Switch"

import RowItem from "@/shared/components/RowItem"

type Language = "ru" | "en"

const ResearchBotTab = () => {
  const { t } = useTranslation("products")

  const [resLanguage, setResLanguage] = useState<Language>("ru")
  const [aggLanguage, setAggLanguage] = useState<Language>("en")

  const toggleResLanguage = (target: Language) => {
    if (target === "ru") {
      if (resLanguage === "ru") {
        setResLanguage("en")
      } else {
        setResLanguage("ru")
      }
    } else {
      if (resLanguage === "en") {
        setResLanguage("ru")
      } else {
        setResLanguage("en")
      }
    }
  }

  const toggleAggLanguage = (target: Language) => {
    if (target === "ru") {
      if (aggLanguage === "ru") {
        setAggLanguage("en")
      } else {
        setAggLanguage("ru")
      }
    } else {
      if (aggLanguage === "en") {
        setAggLanguage("ru")
      } else {
        setAggLanguage("en")
      }
    }
  }

  return (
    <>
      <TabHeader>
        <TabTitle
          title="Research Bot"
          link="https://t.me/crypton_research_bot"
        />
        <Button className="sm:ml-auto w-fit">{t("save-btn")}</Button>
      </TabHeader>
      <RowItem className="flex-col sm:flex-row items-start sm:items-center gap-2">
        <span>{t("res-bot.notifications")}</span>
        <div className="flex flex-col mobile-sm:flex-row gap-2 mobile-sm:gap-10 mobile-sm:items-center px-4 py-[6px] bg-white dark:bg-gray-1 rounded-xl">
          <div className="flex items-center gap-2">
            <Switch id="resNotif" defaultChecked={true} />
            <label htmlFor="resNotif">Research</label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="agrNotif" />
            <label htmlFor="agrNotif">{t("res-bot.aggregator")}</label>
          </div>
        </div>
      </RowItem>
      <RowItem className="flex-col sm:flex-row items-start sm:items-center gap-2">
        <span>{t("res-bot.modes")}</span>
        <div className="flex flex-col mobile-sm:flex-row gap-2 mobile-sm:gap-10 mobile-sm:items-center px-4 py-[6px] bg-white dark:bg-gray-1 rounded-xl">
          <div className="flex items-center gap-2">
            <Switch id="resView" defaultChecked={true} />
            <label htmlFor="resView">Research</label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="agrView" />
            <label htmlFor="agrView">{t("res-bot.aggregator")}</label>
          </div>
        </div>
      </RowItem>
      <RowItem className="flex-col sm:flex-row lg:flex-col xlg:flex-row gap-3 items-baseline">
        <span>{t("res-bot.auto-translator")}</span>
        <div className="flex flex-col gap-[5px] sm:self-end">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>Research</span>
            <div className="flex flex-col mobile-sm:flex-row gap-2 mobile-sm:gap-10 mobile-sm:items-center px-4 py-[6px] bg-white dark:bg-gray-1 rounded-xl">
              <div className="flex items-center gap-2">
                <Switch
                  id="resRu"
                  checked={resLanguage === "ru"}
                  onCheckedChange={() => toggleResLanguage("ru")}
                />
                <label htmlFor="resRu">{t("res-bot.ru")}</label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="resEn"
                  checked={resLanguage === "en"}
                  onCheckedChange={() => toggleResLanguage("en")}
                />
                <label htmlFor="resEn">{t("res-bot.en")}</label>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 dark:text-gray-4">
            <span>{t("res-bot.aggregator")}</span>
            <div className="flex flex-col mobile-sm:flex-row gap-2 mobile-sm:gap-10 mobile-sm:items-center px-4 py-[6px] bg-white dark:bg-gray-1 rounded-xl">
              <div className="flex items-center gap-2">
                <Switch
                  id="agrEn"
                  checked={aggLanguage === "ru"}
                  onCheckedChange={() => toggleAggLanguage("ru")}
                />
                <label htmlFor="agrEn">{t("res-bot.ru")}</label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="agrEs"
                  checked={aggLanguage === "en"}
                  onCheckedChange={() => toggleAggLanguage("en")}
                />
                <label htmlFor="agrEs">{t("res-bot.en")}</label>
              </div>
            </div>
          </div>
        </div>
      </RowItem>
      <RowItem className="flex-col sm:flex-row items-start sm:items-center gap-2">
        <span>{t("res-bot.text-size")}</span>
        <TextSizeSlider />
      </RowItem>
      <RowItem className="flex-col sm:flex-row items-start sm:items-center gap-2">
        <span>{t("res-bot.bg-selection")}</span>
        <BackgroundPicker />
      </RowItem>
      <div className="flex flex-col gap-1.5 py-2 dark:text-gray-4">
        <span>{t("res-bot.project-settings")}</span>
        <ProjectsTable />
      </div>
    </>
  )
}

export default ResearchBotTab
