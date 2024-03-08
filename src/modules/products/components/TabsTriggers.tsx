import { useTranslation } from "react-i18next"

import ResearchActiveIcon from "@/assets/icons/products/ResBot_Active.svg?react"
import ResearchIcon from "@/assets/icons/products/ResBot.svg?react"
import PrimeActiveIcon from "@/assets/icons/products/Prime_Active.svg?react"
import PrimeIcon from "@/assets/icons/products/Prime.svg?react"
import ToolsActiveIcon from "@/assets/icons/products/Tools_Active.svg?react"
import ToolsIcon from "@/assets/icons/products/Tools.svg?react"
import CalendarActiveIcon from "@/assets/icons/products/Calendar_Active.svg?react"
import CalendarIcon from "@/assets/icons/products/Calendar.svg?react"
// import UniverseIcon from "@/assets/icons/products/Universe.svg?react"
import AcademyIcon from "@/assets/icons/products/Academy.svg?react"
import NutcrackerIcon from "@/assets/icons/products/Nutcracker.svg?react"

import InventoryIcon from "@/assets/icons/package.svg?react"
import InventoryActiveIcon from "@/assets/icons/package-open.svg?react"

import { TABS_VALUES } from "@/redux/tabs/slice"
import { useAppSelector } from "@/redux/hooks"

import { TabsTrigger } from "@/shared/ui/Tabs"
import Tooltip from "@/shared/ui/Tooltip"

import { cn } from "@/lib/classNames"

const TabsTriggers = () => {
  const { t } = useTranslation("products")

  const activeProduct = useAppSelector((state) => state.tabs.value)
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <>
      <TabsTrigger value={TABS_VALUES.prime}>
        <Tooltip content="Prime">
          <div>
            {activeProduct === "prime" ? (
              <PrimeActiveIcon
                className={cn(
                  "w-[26px] h-[26px]",
                  scale && "3xl:w-[1.693vw] 3xl:h-[1.693vw]"
                )}
              />
            ) : (
              <PrimeIcon
                className={cn(
                  "w-[26px] h-[26px] dark:fill-gray-4",
                  scale && "3xl:w-[1.693vw] 3xl:h-[1.693vw]"
                )}
              />
            )}
          </div>
        </Tooltip>
      </TabsTrigger>
      <TabsTrigger value={TABS_VALUES.inventory}>
        <Tooltip content={t("inventory.title")}>
          <div>
            {activeProduct === "inventory" ? (
              <InventoryActiveIcon
                className={cn(
                  "w-[26px] h-[26px] stroke-university-velvet",
                  scale && "3xl:w-[1.693vw] 3xl:h-[1.693vw]"
                )}
              />
            ) : (
              <InventoryIcon
                className={cn(
                  "w-[26px] h-[26px] dark:stroke-gray-4",
                  scale && "3xl:w-[1.693vw] 3xl:h-[1.693vw]"
                )}
              />
            )}
          </div>
        </Tooltip>
      </TabsTrigger>
      <TabsTrigger value={TABS_VALUES.research}>
        <Tooltip content="Research">
          <div>
            {activeProduct === "research" ? (
              <ResearchActiveIcon
                className={cn(
                  "w-[26px] h-[26px]",
                  scale && "3xl:w-[1.693vw] 3xl:h-[1.693vw]"
                )}
              />
            ) : (
              <ResearchIcon
                className={cn(
                  "w-[26px] h-[26px] dark:fill-gray-4",
                  scale && "3xl:w-[1.693vw] 3xl:h-[1.693vw]"
                )}
              />
            )}
          </div>
        </Tooltip>
      </TabsTrigger>
      <TabsTrigger value={TABS_VALUES.tools}>
        <Tooltip content="Tools">
          <div>
            {activeProduct === "tools" ? (
              <ToolsActiveIcon
                className={cn(
                  "w-[26px] h-[26px]",
                  scale && "3xl:w-[1.693vw] 3xl:h-[1.693vw]"
                )}
              />
            ) : (
              <ToolsIcon
                className={cn(
                  "w-[26px] h-[26px] dark:fill-gray-4",
                  scale && "3xl:w-[1.693vw] 3xl:h-[1.693vw]"
                )}
              />
            )}
          </div>
        </Tooltip>
      </TabsTrigger>
      <TabsTrigger value={TABS_VALUES.calendar}>
        <Tooltip content="Calendar">
          <div>
            {activeProduct === "calendar" ? (
              <CalendarActiveIcon
                className={cn(
                  "w-[26px] h-[26px]",
                  scale && "3xl:w-[1.693vw] 3xl:h-[1.693vw]"
                )}
              />
            ) : (
              <CalendarIcon
                className={cn(
                  "w-[26px] h-[26px] dark:fill-gray-4",
                  scale && "3xl:w-[1.693vw] 3xl:h-[1.693vw]"
                )}
              />
            )}
          </div>
        </Tooltip>
      </TabsTrigger>
      <TabsTrigger value={TABS_VALUES.nutcracker}>
        <Tooltip content={t("nutcracker.title")}>
          <div>
            <NutcrackerIcon
              className={cn(
                "h-[26px] w-auto text-gray-1 dark:text-gray-4",
                activeProduct === "nutcracker" &&
                  "text-nutcracker-orange dark:text-nutcracker-orange",
                scale && "3xl:h-[1.693vw]"
              )}
            />
          </div>
        </Tooltip>
      </TabsTrigger>
      <TabsTrigger value={TABS_VALUES.academy} disabled>
        <Tooltip content="Academy">
          <div>
            <AcademyIcon
              className={cn(
                "w-[26px] h-[26px] dark:fill-gray-2",
                scale && "3xl:w-[1.693vw] 3xl:h-[1.693vw]"
              )}
            />
          </div>
        </Tooltip>
      </TabsTrigger>
    </>
  )
}

export default TabsTriggers
