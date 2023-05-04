import * as RadixTabs from "@radix-ui/react-tabs"
import { ReactComponent as ResearchBot } from "../assets/Res-bot.svg"
import { ReactComponent as Prime } from "../assets/Prime.svg"
import ResearchBotTab from "./ResearchBotTab"
import PrimeTab from "./PrimeTab"

const Tabs = () => {
  return (
    <RadixTabs.Root defaultValue="res-bot" className="flex-1">
      <RadixTabs.List className="flex items-center gap-[72px] py-4 px-5 mb-9 border-b border-gray-2 dark:border-gray-2">
        <RadixTabs.Trigger value="res-bot" className="group relative">
          <>
            <ResearchBot />
            <span className="absolute hidden group-data-[state=active]:block w-[68px] h-[3px] rounded-full left-0 bottom-0 translate-y-[18px] -translate-x-5 bg-gray-1 dark:bg-gray-5" />
          </>
        </RadixTabs.Trigger>
        <RadixTabs.Trigger value="prime" className="group relative">
          <>
            <Prime />
            <span className="absolute hidden group-data-[state=active]:block w-[68px] h-[5px] rounded-full left-0 bottom-0 translate-y-[19px] -translate-x-5 bg-gray-1 dark:bg-gray-5" />
          </>
        </RadixTabs.Trigger>
      </RadixTabs.List>
      <RadixTabs.Content value="res-bot" className="typography-text-0">
        <ResearchBotTab />
      </RadixTabs.Content>
      <RadixTabs.Content value="prime" className="typography-text-0">
        <PrimeTab />
      </RadixTabs.Content>
    </RadixTabs.Root>
  )
}

export default Tabs
