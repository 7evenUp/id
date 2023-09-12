import { ReactComponent as ResearchBotActiveIcon } from "@/assets/icons/products/ResBot_Active.svg"
import { ReactComponent as ResearchBotIcon } from "@/assets/icons/products/ResBot.svg"
import { ReactComponent as PrimeActiveIcon } from "@/assets/icons/products/Prime_Active.svg"
import { ReactComponent as PrimeIcon } from "@/assets/icons/products/Prime.svg"
import { ReactComponent as ToolsActiveIcon } from "@/assets/icons/products/Tools_Active.svg"
import { ReactComponent as ToolsIcon } from "@/assets/icons/products/Tools.svg"
import { ReactComponent as CalendarActiveIcon } from "@/assets/icons/products/Calendar_Active.svg"
import { ReactComponent as CalendarIcon } from "@/assets/icons/products/Calendar.svg"
import { ReactComponent as UniverseIcon } from "@/assets/icons/products/Universe.svg"
import { ReactComponent as AcademyIcon } from "@/assets/icons/products/Academy.svg"

import { TABS_VALUES } from "@/redux/tabs/slice"
import { useAppSelector } from "@/redux/hooks"

import { TabsTrigger } from "@/shared/ui/Tabs"
import Tooltip from "@/shared/ui/Tooltip"

const TabsTriggers = () => {
  const activeProduct = useAppSelector((state) => state.tabs.value)

  return (
    <>
      <TabsTrigger value={TABS_VALUES.PRIME}>
        <Tooltip content="Prime">
          <div>
            {activeProduct === "prime" ? (
              <PrimeActiveIcon className="w-[26px] h-[26px] 3xl:w-[1.693vw] 3xl:h-[1.693vw]" />
            ) : (
              <PrimeIcon className="w-[26px] h-[26px] 3xl:w-[1.693vw] 3xl:h-[1.693vw] dark:fill-gray-4" />
            )}
          </div>
        </Tooltip>
      </TabsTrigger>
      <TabsTrigger value={TABS_VALUES.RESEARCH_BOT}>
        <Tooltip content="Research Bot">
          <div>
            {activeProduct === "research-bot" ? (
              <ResearchBotActiveIcon className="w-[26px] h-[26px] 3xl:w-[1.693vw] 3xl:h-[1.693vw]" />
            ) : (
              <ResearchBotIcon className="w-[26px] h-[26px] 3xl:w-[1.693vw] 3xl:h-[1.693vw] dark:fill-gray-4" />
            )}
          </div>
        </Tooltip>
      </TabsTrigger>
      <TabsTrigger value={TABS_VALUES.TOOLS}>
        <Tooltip content="Tools">
          <div>
            {activeProduct === "tools" ? (
              <ToolsActiveIcon className="w-[26px] h-[26px] 3xl:w-[1.693vw] 3xl:h-[1.693vw]" />
            ) : (
              <ToolsIcon className="w-[26px] h-[26px] 3xl:w-[1.693vw] 3xl:h-[1.693vw] dark:fill-gray-4" />
            )}
          </div>
        </Tooltip>
      </TabsTrigger>
      <TabsTrigger value={TABS_VALUES.CALENDAR}>
        <Tooltip content="Calendar">
          <div>
            {activeProduct === "calendar" ? (
              <CalendarActiveIcon className="w-[26px] h-[26px] 3xl:w-[1.693vw] 3xl:h-[1.693vw]" />
            ) : (
              <CalendarIcon className="w-[26px] h-[26px] 3xl:w-[1.693vw] 3xl:h-[1.693vw] dark:fill-gray-4" />
            )}
          </div>
        </Tooltip>
      </TabsTrigger>
      <TabsTrigger value={TABS_VALUES.UNIVERSE} disabled>
        <Tooltip content="Universe">
          <div>
            <UniverseIcon className="w-[26px] h-[26px] 3xl:w-[1.693vw] 3xl:h-[1.693vw] dark:fill-gray-2" />
          </div>
        </Tooltip>
      </TabsTrigger>
      <TabsTrigger value={TABS_VALUES.ACADEMY} disabled>
        <Tooltip content="Academy">
          <div>
            <AcademyIcon className="w-[26px] h-[26px] 3xl:w-[1.693vw] 3xl:h-[1.693vw] dark:fill-gray-2" />
          </div>
        </Tooltip>
      </TabsTrigger>
    </>
  )
}

export default TabsTriggers
