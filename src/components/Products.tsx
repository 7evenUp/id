import { ReactComponent as ResearchBotIcon } from "@/assets/Res-bot.svg"
import { ReactComponent as PrimeIcon } from "@/assets/Prime.svg"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs"

import ResearchBotTab from "./ResearchBotTab"
import PrimeTab from "./PrimeTab"

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
      className="flex-1"
    >
      <TabsList>
        <TabsTrigger value={TABS_VALUES.RESEARCH_BOT}>
          <ResearchBotIcon />
        </TabsTrigger>
        <TabsTrigger value={TABS_VALUES.PRIME}>
          <PrimeIcon />
        </TabsTrigger>
      </TabsList>
      <TabsContent value={TABS_VALUES.RESEARCH_BOT}>
        <ResearchBotTab />
      </TabsContent>
      <TabsContent value={TABS_VALUES.PRIME}>
        <PrimeTab />
      </TabsContent>
    </Tabs>
  )
}

export default Products
