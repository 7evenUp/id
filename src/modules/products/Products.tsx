import * as ScrollArea from "@radix-ui/react-scroll-area"
import { isDesktop } from "react-device-detect"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { useTranslation } from "react-i18next"

import EcosystemIcon from "@/assets/icons/ecosystem.svg?react"
import InventoryIcon from "@/assets/icons/package.svg?react"
import InventoryActiveIcon from "@/assets/icons/package-open.svg?react"
import StoreIcon from "@/assets/icons/store.svg?react"

import { Tabs, TabsContent, TabsList } from "@/shared/ui/Tabs"

import TabsTriggers from "./components/TabsTriggers"

import PrimeTab from "./content/PrimeTab"
import ResearchTab from "./content/ResearchTab"
import ToolsTab from "./content/ToolsTab"
import CalendarTab from "./content/CalendarTab"
import NutcrackerTab from "./content/NutcrackerTab"

import InventoryTab from "./content/InventoryTab"
import PointStoreTab from "./content/PointStoreTab"

import Text0 from "@/shared/typography/Text0"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { TABS_VALUES, TabsValuesType, change } from "@/redux/tabs/slice"
import { RootTabsValuesType, changeRootTab } from "@/redux/root-tabs/slice"

import { cn } from "@/lib/classNames"

const Products = () => {
  const { t } = useTranslation("products")

  const activeRootTab = useAppSelector((state) => state.rootTabs.value)
  const activeProduct = useAppSelector((state) => state.tabs.value)
  const scale = useAppSelector((state) => state.scale.value)

  const dispatch = useAppDispatch()

  const handleRootTabChange = (value: string) => {
    dispatch(changeRootTab(value as RootTabsValuesType))
  }

  const handleProductsTabChange = (value: string) => {
    dispatch(change(value as TabsValuesType))
  }

  return (
    <TabsPrimitive.Root
      value={activeRootTab}
      onValueChange={handleRootTabChange}
      className="flex-1 2xl:flex-grow-[2] lg:overflow-hidden"
    >
      <ScrollArea.Root type={isDesktop ? "hover" : "scroll"}>
        <ScrollArea.Viewport>
          <TabsPrimitive.List
            className={cn(
              "flex items-center gap-2 mb-4",
              scale && "3xl:gap-[0.52vw] 3xl:mb-[1.041vw]"
            )}
          >
            <TabsPrimitive.Trigger
              value="products"
              className={cn(
                "flex items-center justify-center gap-1.5 rounded px-2 py-1 text-gray-2 dark:text-gray-3 data-[state=active]:text-black dark:data-[state=active]:text-gray-5 data-[state=active]:bg-gray-5/25 dark:data-[state=active]:bg-gray-1 hover:bg-gray-5/[0.15] dark:hover:bg-gray-2/30 transition-colors",
                scale &&
                  "3xl:rounded-[0.26vw] 3xl:px-[0.52vw] 3xl:py-[0.26vw] 3xl:gap-[0.36vw]"
              )}
            >
              <EcosystemIcon
                className={cn(
                  "w-4 h-4",
                  scale && "3xl:w-[1.041vw] 3xl:h-[1.041vw]"
                )}
              />
              <Text0>{t("products-root")}</Text0>
            </TabsPrimitive.Trigger>
            <TabsPrimitive.Trigger
              value="inventory"
              className={cn(
                "flex items-center justify-center gap-1.5 rounded px-2 py-1 text-gray-2 dark:text-gray-3 data-[state=active]:text-black dark:data-[state=active]:text-gray-5 data-[state=active]:bg-gray-5/25 dark:data-[state=active]:bg-gray-1 hover:bg-gray-5/[0.15] dark:hover:bg-gray-2/30 transition-colors",
                scale &&
                  "3xl:rounded-[0.26vw] 3xl:px-[0.52vw] 3xl:py-[0.26vw] 3xl:gap-[0.36vw]"
              )}
            >
              {activeRootTab === "inventory" ? (
                <InventoryActiveIcon
                  className={cn(
                    "w-4 h-4",
                    scale && "3xl:w-[1.041vw] 3xl:h-[1.041vw]"
                  )}
                />
              ) : (
                <InventoryIcon
                  className={cn(
                    "w-4 h-4",
                    scale && "3xl:w-[1.041vw] 3xl:h-[1.041vw]"
                  )}
                />
              )}
              <Text0>{t("inventory-root")}</Text0>
            </TabsPrimitive.Trigger>
            <TabsPrimitive.Trigger
              value="points-store"
              className={cn(
                "flex items-center justify-center gap-1.5 rounded px-2 py-1 text-gray-2 dark:text-gray-3 data-[state=active]:text-black dark:data-[state=active]:text-gray-5 data-[state=active]:bg-gray-5/25 dark:data-[state=active]:bg-gray-1 hover:bg-gray-5/[0.15] dark:hover:bg-gray-2/30 transition-colors",
                scale &&
                  "3xl:rounded-[0.26vw] 3xl:px-[0.52vw] 3xl:py-[0.26vw] 3xl:gap-[0.36vw]"
              )}
            >
              <StoreIcon
                className={cn(
                  "w-4 h-4",
                  scale && "3xl:w-[1.041vw] 3xl:h-[1.041vw]"
                )}
              />
              <Text0>{t("points-store-root")}</Text0>
            </TabsPrimitive.Trigger>
          </TabsPrimitive.List>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="group flex select-none touch-none p-0.5 bg-gray-5/30 dark:bg-gray-1 transition-colors data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="flex-1 bg-gray-3/50 group-hover:bg-gray-2/50 dark:bg-gray-2 dark:group-hover:bg-gray-3 transition-colors rounded-full relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>

      <TabsPrimitive.Content value="products">
        <Tabs
          value={activeProduct}
          onValueChange={handleProductsTabChange}
          className="flex-1 2xl:flex-grow-[2] lg:overflow-hidden"
        >
          <ScrollArea.Root
            type={isDesktop ? "hover" : "scroll"}
            className={cn(
              "w-full rounded overflow-hidden mb-5",
              scale && "3xl:mb-[1.3vw]"
            )}
          >
            <ScrollArea.Viewport>
              <TabsList
                className={cn("relative mb-5", scale && "3xl:mb-[1.3vw]")}
              >
                <TabsTriggers />

                {/* Active indicator */}
                <span
                  className={cn(
                    "absolute w-1/5 h-[3px] rounded-full left-0 -bottom-0.5 bg-gray-1 dark:bg-gray-5 transition-transform",
                    activeProduct === TABS_VALUES.research &&
                      "translate-x-full",
                    activeProduct === TABS_VALUES.calendar &&
                      "translate-x-[200%]",
                    activeProduct === TABS_VALUES.tools && "translate-x-[300%]",
                    activeProduct === TABS_VALUES.nutcracker &&
                      "translate-x-[400%]",
                    scale && "3xl:h-[0.195vw] 3xl:-bottom-[0.13vw]"
                  )}
                />
              </TabsList>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="group flex select-none touch-none p-0.5 bg-gray-5/30 dark:bg-gray-1 transition-colors data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
              orientation="horizontal"
            >
              <ScrollArea.Thumb className="flex-1 bg-gray-3/50 group-hover:bg-gray-2/50 dark:bg-gray-2 dark:group-hover:bg-gray-3 transition-colors rounded-full relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
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
          <TabsContent value={TABS_VALUES.nutcracker}>
            <NutcrackerTab />
          </TabsContent>
        </Tabs>
      </TabsPrimitive.Content>
      <TabsPrimitive.Content value="inventory">
        <InventoryTab />
      </TabsPrimitive.Content>
      <TabsPrimitive.Content value="points-store">
        <PointStoreTab />
      </TabsPrimitive.Content>
    </TabsPrimitive.Root>
  )
}

export default Products
