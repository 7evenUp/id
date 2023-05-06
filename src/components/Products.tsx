import { ReactComponent as ResearchBot } from "@/assets/Res-bot.svg"
import { ReactComponent as Prime } from "@/assets/Prime.svg"

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
          <>
            <ResearchBot />
            <span className="absolute hidden group-data-[state=active]:block w-[68px] h-[3px] rounded-full left-0 bottom-0 translate-y-[18px] -translate-x-5 bg-gray-1 dark:bg-gray-5" />
          </>
        </TabsTrigger>
        <TabsTrigger value={TABS_VALUES.PRIME}>
          <>
            <Prime />
            <span className="absolute hidden group-data-[state=active]:block w-[68px] h-[5px] rounded-full left-0 bottom-0 translate-y-[19px] -translate-x-5 bg-gray-1 dark:bg-gray-5" />
          </>
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
