import {
  Tabs,
  TabsContent,
  TabsList,
} from "@/shared/ui/Tabs"

import TabsTriggers from "./components/TabsTriggers"

import ResearchBotTab from "./content/ResearchBotTab"
import PrimeTab from "./content/PrimeTab"
import ToolsTab from "./content/ToolsTab"
import CalendarTab from "./content/CalendarTab"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { TABS_VALUES, TabsValuesType, change } from "@/redux/tabs/slice"

const Products = () => {
  const activeProduct = useAppSelector((state) => state.tabs.value)
  const dispatch = useAppDispatch()

  const handleValueChange = (value: string) => {
    dispatch(change(value as TabsValuesType))
  }

  return (
    <Tabs
      value={activeProduct}
      onValueChange={handleValueChange}
      className="flex-1 2xl:flex-grow-[2]"
    >
      <TabsList>
        <TabsTriggers />
      </TabsList>
      <TabsContent value={TABS_VALUES.RESEARCH_BOT}>
        <ResearchBotTab />
      </TabsContent>
      <TabsContent value={TABS_VALUES.PRIME}>
        <PrimeTab />
      </TabsContent>
      <TabsContent value={TABS_VALUES.TOOLS}>
        <ToolsTab />
      </TabsContent>
      <TabsContent value={TABS_VALUES.CALENDAR}>
        <CalendarTab />
      </TabsContent>
    </Tabs>
  )
}

export default Products
