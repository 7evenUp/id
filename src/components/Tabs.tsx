import React from "react"
import * as RadixTabs from "@radix-ui/react-tabs"
import { ReactComponent as ResearchBot } from "../assets/Res-bot.svg"
import { ReactComponent as Prime } from "../assets/Prime.svg"
import ResearchBotTab from "./ResearchBotTab"
import PrimeTab from "./PrimeTab"

const Tabs = () => {
  return (
    <RadixTabs.Root defaultValue="res-bot" className="flex-1">
      <RadixTabs.List className="flex items-center gap-[72px] border-b border-gray-2 py-4 px-5 mb-9">
        <RadixTabs.Trigger value="res-bot">
          <ResearchBot fill="#333333" className="fill-slate-800 text-slate-900" />
        </RadixTabs.Trigger>
        <RadixTabs.Trigger value="prime">
          <Prime />
        </RadixTabs.Trigger>
      </RadixTabs.List>
      <RadixTabs.Content value="res-bot">
        <ResearchBotTab />
      </RadixTabs.Content>
      <RadixTabs.Content value="prime">
        <PrimeTab />
      </RadixTabs.Content>
    </RadixTabs.Root>
  )
}

export default Tabs
