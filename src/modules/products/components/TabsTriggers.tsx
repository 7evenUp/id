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

import { TabsTrigger } from "@/shared/ui/Tabs"

const TabsTriggers = () => {
  return (
    <>
      <TabsTrigger value={TABS_VALUES.PRIME}>
        <PrimeActiveIcon className="w-[26px] h-[26px] 2xl:w-[1.693vw] 2xl:h-[1.693vw] hidden group-data-[state=active]:inline-block" />
        <PrimeIcon className="w-[26px] h-[26px] 2xl:w-[1.693vw] 2xl:h-[1.693vw] group-data-[state=active]:hidden dark:fill-gray-4" />
      </TabsTrigger>
      <TabsTrigger value={TABS_VALUES.RESEARCH_BOT}>
        <ResearchBotActiveIcon className="w-[26px] h-[26px] 2xl:w-[1.693vw] 2xl:h-[1.693vw] hidden group-data-[state=active]:inline-block" />
        <ResearchBotIcon className="w-[26px] h-[26px] 2xl:w-[1.693vw] 2xl:h-[1.693vw] group-data-[state=active]:hidden dark:fill-gray-4" />
      </TabsTrigger>
      <TabsTrigger value={TABS_VALUES.TOOLS}>
        <ToolsActiveIcon className="w-[26px] h-[26px] 2xl:w-[1.693vw] 2xl:h-[1.693vw] hidden group-data-[state=active]:inline-block" />
        <ToolsIcon className="w-[26px] h-[26px] 2xl:w-[1.693vw] 2xl:h-[1.693vw] group-data-[state=active]:hidden dark:fill-gray-4" />
      </TabsTrigger>
      <TabsTrigger value={TABS_VALUES.CALENDAR}>
        <CalendarActiveIcon className="w-[26px] h-[26px] 2xl:w-[1.693vw] 2xl:h-[1.693vw] hidden group-data-[state=active]:inline-block" />
        <CalendarIcon className="w-[26px] h-[26px] 2xl:w-[1.693vw] 2xl:h-[1.693vw] group-data-[state=active]:hidden dark:fill-gray-4" />
      </TabsTrigger>
      <TabsTrigger value={TABS_VALUES.UNIVERSE} disabled>
        <UniverseIcon className="w-[26px] h-[26px] 2xl:w-[1.693vw] 2xl:h-[1.693vw] group-data-[state=active]:hidden dark:fill-gray-2" />
      </TabsTrigger>
      <TabsTrigger value={TABS_VALUES.ACADEMY} disabled>
        <AcademyIcon className="w-[26px] h-[26px] 2xl:w-[1.693vw] 2xl:h-[1.693vw] group-data-[state=active]:hidden dark:fill-gray-2" />
      </TabsTrigger>
    </>
  )
}

export default TabsTriggers
