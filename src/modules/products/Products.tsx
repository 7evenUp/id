import * as ScrollArea from "@radix-ui/react-scroll-area"

import { Tabs, TabsContent, TabsList } from "@/shared/ui/Tabs"

import TabsTriggers from "./components/TabsTriggers"

import PrimeTab from "./content/PrimeTab"
import InventoryTab from "./content/InventoryTab"
import ResearchTab from "./content/ResearchTab"
import ToolsTab from "./content/ToolsTab"
import CalendarTab from "./content/CalendarTab"
import NutcrackerTab from "./content/NutcrackerTab"

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
      className="flex-1 2xl:flex-grow-[2] lg:overflow-hidden"
    >
      <ScrollArea.Root
        className={cn(
          "w-full rounded overflow-hidden mb-5",
          scale && "3xl:mb-[1.3vw]"
        )}
      >
        <ScrollArea.Viewport>
          <TabsList className={cn("relative mb-5", scale && "3xl:mb-[1.3vw]")}>
            <TabsTriggers />

            {/* Active indicator */}
            <span
              className={cn(
                "absolute w-[14.2857%] h-[3px] rounded-full left-0 -bottom-0.5 bg-gray-1 dark:bg-gray-5 transition-transform",
                activeProduct === TABS_VALUES.nutcracker && "translate-x-full",
                activeProduct === TABS_VALUES.inventory && "translate-x-[200%]",
                activeProduct === TABS_VALUES.research && "translate-x-[300%]",
                activeProduct === TABS_VALUES.tools && "translate-x-[400%]",
                activeProduct === TABS_VALUES.calendar && "translate-x-[500%]",
                scale && "3xl:h-[0.195vw] 3xl:-bottom-[0.13vw]"
              )}
            />
          </TabsList>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="group flex select-none touch-none p-0.5 bg-gray-5 dark:bg-gray-1 transition-colors data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="flex-1 bg-gray-3 group-hover:bg-gray-2 dark:bg-gray-2 dark:group-hover:bg-gray-3 transition-colors rounded-full relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>

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
      <TabsContent value={TABS_VALUES.nutcracker}>
        <NutcrackerTab />
      </TabsContent>
    </Tabs>
  )
}

export default Products
