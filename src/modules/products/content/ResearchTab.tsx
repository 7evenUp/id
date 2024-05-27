// import { useState } from "react"
import { useTranslation } from "react-i18next"

import TabHeader from "../components/TabHeader"
import TabTitle from "../components/TabTitle"
// import TextSizeSlider from "../components/TextSizeSlider"
// import BackgroundPicker from "../components/BackgroundPicker"
// import ProjectsTable from "../components/ProjectsTable"

import Subheading from "@/shared/typography/Subheading"

// import Button from "@/shared/ui/Button"
// import Switch from "@/shared/ui/Switch"

// import RowItem from "@/shared/components/RowItem"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

// type Language = "ru" | "en"

const ResearchTab = () => {
  const { t } = useTranslation("products")

  const scale = useAppSelector((state) => state.scale.value)

  // const [resLanguage, setResLanguage] = useState<Language>("ru")
  // const [aggLanguage, setAggLanguage] = useState<Language>("en")

  // const toggleResLanguage = (target: Language) => {
  //   if (target === "ru") {
  //     if (resLanguage === "ru") {
  //       setResLanguage("en")
  //     } else {
  //       setResLanguage("ru")
  //     }
  //   } else {
  //     if (resLanguage === "en") {
  //       setResLanguage("ru")
  //     } else {
  //       setResLanguage("en")
  //     }
  //   }
  // }

  // const toggleAggLanguage = (target: Language) => {
  //   if (target === "ru") {
  //     if (aggLanguage === "ru") {
  //       setAggLanguage("en")
  //     } else {
  //       setAggLanguage("ru")
  //     }
  //   } else {
  //     if (aggLanguage === "en") {
  //       setAggLanguage("ru")
  //     } else {
  //       setAggLanguage("en")
  //     }
  //   }
  // }

  return (
    <>
      <TabHeader>
        <TabTitle title="Research" link="https://research.crypton.xyz" />
      </TabHeader>
      <Subheading className={cn("mt-10", scale && "3xl:mt-[2.604vw]")}>
        {t("research.heading")}
      </Subheading>
    </>
  )

  // return (
  //   <>
  //     <TabHeader>
  //       <TabTitle title="Research" link="https://research.crypton.xyz" />

  //       <Button className="sm:ml-auto w-fit">{t("save-btn")}</Button>
  //     </TabHeader>
  //     <RowItem
  //       className={cn(
  //         "flex-col sm:flex-row items-start sm:items-center gap-2",
  //         scale && "3xl:gap-[0.521vw]"
  //       )}
  //     >
  //       <span>{t("res-bot.notifications")}</span>
  //       <div
  //         className={cn(
  //           "flex flex-col mobile-sm:flex-row gap-2 mobile-sm:items-center mobile-sm:gap-10 px-4 py-1.5 bg-white dark:bg-gray-1 rounded-xl",
  //           scale &&
  //             "3xl:gap-[2.604vw] 3xl:px-[1.042vw] 3xl:py-[0.391vw] 3xl:rounded-[0.781vw]"
  //         )}
  //       >
  //         <div
  //           className={cn(
  //             "flex items-center gap-2",
  //             scale && "3xl:gap-[0.521vw]"
  //           )}
  //         >
  //           <Switch id="resNotif" defaultChecked={true} />
  //           <label htmlFor="resNotif">Research</label>
  //         </div>
  //         <div
  //           className={cn(
  //             "flex items-center gap-2",
  //             scale && "3xl:gap-[0.521vw]"
  //           )}
  //         >
  //           <Switch id="agrNotif" />
  //           <label htmlFor="agrNotif">{t("res-bot.aggregator")}</label>
  //         </div>
  //       </div>
  //     </RowItem>
  //     <RowItem className="flex-col sm:flex-row items-start sm:items-center gap-2 3xl:gap-[0.521vw]">
  //       <span>{t("res-bot.modes")}</span>
  //       <div className="flex flex-col mobile-sm:flex-row gap-2 mobile-sm:items-center mobile-sm:gap-10 3xl:gap-[2.604vw] px-4 py-1.5 3xl:px-[1.042vw] 3xl:py-[0.391vw] bg-white dark:bg-gray-1 rounded-xl 3xl:rounded-[0.781vw]">
  //         <div
  //           className={cn(
  //             "flex items-center gap-2",
  //             scale && "3xl:gap-[0.521vw]"
  //           )}
  //         >
  //           <Switch id="resView" defaultChecked={true} />
  //           <label htmlFor="resView">Research</label>
  //         </div>
  //         <div
  //           className={cn(
  //             "flex items-center gap-2",
  //             scale && "3xl:gap-[0.521vw]"
  //           )}
  //         >
  //           <Switch id="agrView" />
  //           <label htmlFor="agrView">{t("res-bot.aggregator")}</label>
  //         </div>
  //       </div>
  //     </RowItem>
  //     {/* <RowItem className="flex-col sm:flex-row lg:flex-col xlg:flex-row gap-3 3xl:gap-[0.781vw] items-baseline">
  //       <span>{t("res-bot.auto-translator")}</span>
  //       <div className="flex flex-col gap-[5px] 3xl:gap-[0.325vw] sm:self-end">
  //         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 3xl:gap-[0.521vw]">
  //           <span>Research</span>
  //           <div className="flex flex-col mobile-sm:flex-row gap-2 mobile-sm:items-center mobile-sm:gap-10 3xl:gap-[2.604vw] px-4 py-1.5 3xl:px-[1.042vw] 3xl:py-[0.391vw] bg-white dark:bg-gray-1 rounded-xl 3xl:rounded-[0.781vw]">
  //             <div className="flex items-center gap-2 3xl:gap-[0.521vw]">
  //               <Switch
  //                 id="resRu"
  //                 checked={resLanguage === "ru"}
  //                 onCheckedChange={() => toggleResLanguage("ru")}
  //               />
  //               <label htmlFor="resRu">{t("res-bot.ru")}</label>
  //             </div>
  //             <div className="flex items-center gap-2 3xl:gap-[0.521vw]">
  //               <Switch
  //                 id="resEn"
  //                 checked={resLanguage === "en"}
  //                 onCheckedChange={() => toggleResLanguage("en")}
  //               />
  //               <label htmlFor="resEn">{t("res-bot.en")}</label>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 3xl:gap-[0.521vw] dark:text-gray-4">
  //           <span>{t("res-bot.aggregator")}</span>
  //           <div className="flex flex-col mobile-sm:flex-row gap-2 mobile-sm:items-center mobile-sm:gap-10 3xl:gap-[2.604vw] px-4 py-1.5 3xl:px-[1.042vw] 3xl:py-[0.391vw] bg-white dark:bg-gray-1 rounded-xl 3xl:rounded-[0.781vw]">
  //             <div className="flex items-center gap-2 3xl:gap-[0.521vw]">
  //               <Switch
  //                 id="agrEn"
  //                 checked={aggLanguage === "ru"}
  //                 onCheckedChange={() => toggleAggLanguage("ru")}
  //               />
  //               <label htmlFor="agrEn">{t("res-bot.ru")}</label>
  //             </div>
  //             <div className="flex items-center gap-2 3xl:gap-[0.521vw]">
  //               <Switch
  //                 id="agrEs"
  //                 checked={aggLanguage === "en"}
  //                 onCheckedChange={() => toggleAggLanguage("en")}
  //               />
  //               <label htmlFor="agrEs">{t("res-bot.en")}</label>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </RowItem> */}
  //     <RowItem className="flex-col sm:flex-row items-start sm:items-center gap-2 3xl:gap-[0.521vw]">
  //       <span>{t("res-bot.text-size")}</span>
  //       <TextSizeSlider />
  //     </RowItem>
  //     {/* <RowItem className="flex-col sm:flex-row items-start sm:items-center gap-2 3xl:gap-[0.521vw]">
  //       <span>{t("res-bot.bg-selection")}</span>
  //       <BackgroundPicker />
  //     </RowItem> */}
  //     <div className="flex flex-col gap-1.5 py-2 3xl:gap-[0.391vw] 3xl:py-[0.521vw] dark:text-gray-4">
  //       <span>{t("res-bot.project-settings")}</span>
  //       <ProjectsTable />
  //     </div>
  //   </>
  // )
}

export default ResearchTab
