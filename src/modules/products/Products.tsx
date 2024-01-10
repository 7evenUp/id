import { Tabs, TabsContent, TabsList } from "@/shared/ui/Tabs"

import TabsTriggers from "./components/TabsTriggers"

import PrimeTab from "./content/PrimeTab"
import InventoryTab from "./content/InventoryTab"
import ResearchTab from "./content/ResearchTab"
import ToolsTab from "./content/ToolsTab"
import CalendarTab from "./content/CalendarTab"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { TABS_VALUES, TabsValuesType, change } from "@/redux/tabs/slice"

import { cn } from "@/lib/classNames"

const Products = () => {
  const activeProduct = useAppSelector((state) => state.tabs.value)
  const scale = useAppSelector((state) => state.scale.value)

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
      <TabsList className="relative">
        <TabsTriggers />

        {/* Active indicator */}
        <span
          className={cn(
            "absolute w-[16.666%] h-[3px] rounded-full left-0 -bottom-0.5 bg-gray-1 dark:bg-gray-5 transition-transform",
            activeProduct === TABS_VALUES.inventory && "translate-x-full",
            activeProduct === TABS_VALUES["research"] &&
              "translate-x-[200%]",
            activeProduct === TABS_VALUES.tools && "translate-x-[300%]",
            activeProduct === TABS_VALUES.calendar && "translate-x-[400%]",
            scale && "3xl:h-[0.195vw] 3xl:-bottom-[0.13vw]"
          )}
        />
      </TabsList>
      <TabsContent value={TABS_VALUES.prime}>
        <PrimeTab />
      </TabsContent>
      <TabsContent value={TABS_VALUES["research"]}>
        <ResearchTab />
      </TabsContent>
      <TabsContent value={TABS_VALUES.tools}>
        <ToolsTab />
      </TabsContent>
      <TabsContent value={TABS_VALUES.calendar}>
        <CalendarTab />
      </TabsContent>
      <TabsContent value={TABS_VALUES.inventory}>
        <InventoryTab />
      </TabsContent>
    </Tabs>
  )
}

export default Products
