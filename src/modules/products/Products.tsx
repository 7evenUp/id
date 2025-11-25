import { useEffect } from "react"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import { isDesktop } from "react-device-detect"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { useTranslation } from "react-i18next"

import EcosystemIcon from "@/assets/icons/ecosystem.svg?react"
import InventoryIcon from "@/assets/icons/package.svg?react"
import InventoryActiveIcon from "@/assets/icons/package-open.svg?react"
import StoreIcon from "@/assets/icons/store.svg?react"
import PromoIcon from "@/assets/icons/promo.svg?react"

import { Tabs, TabsContent, TabsList } from "@/shared/ui/Tabs"

import TabsTriggers from "./components/TabsTriggers"

import PrimeTab from "./content/PrimeTab"
import ResearchTab from "./content/ResearchTab"
import ToolsTab from "./content/ToolsTab"
import CalendarTab from "./content/CalendarTab"
import NutcrackerTab from "./content/NutcrackerTab"

import InventoryTab from "./content/InventoryTab"
import PointStoreTab from "./content/PointStoreTab"
import PromoTab from "./content/PromoTab"

import Text0 from "@/shared/typography/Text0"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { TABS_VALUES, TabsValuesType, change } from "@/redux/tabs/slice"
import { RootTabsValuesType, changeRootTab } from "@/redux/root-tabs/slice"

import {
  SEARCH_PARAM_KEYS,
  SEARCH_PARAM_VALUES,
} from "@/constants/searchParams"

import { cn } from "@/lib/classNames"
import useSendEvent from "@/shared/hooks/useSendEvent"

const Products = () => {
  const { t } = useTranslation("products")

  const { sendEvent } = useSendEvent()

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

  useEffect(() => {
    const url = new URL(location.href)
    const openModalParam = url.searchParams.get(SEARCH_PARAM_KEYS.open_tab)

    if (!openModalParam) return

    if (openModalParam === SEARCH_PARAM_VALUES.open_tab.products) {
      dispatch(changeRootTab("products"))
    }
    if (openModalParam === SEARCH_PARAM_VALUES.open_tab.inventory) {
      dispatch(changeRootTab("inventory"))
    }
    if (openModalParam === SEARCH_PARAM_VALUES.open_tab.store) {
      dispatch(changeRootTab("store"))
    }
  }, [])

  return (
    <TabsPrimitive.Root
      value={activeRootTab}
      onValueChange={handleRootTabChange}
      className="flex-1 lg:overflow-hidden 2xl:flex-grow-[2]"
    >
      <ScrollArea.Root type={isDesktop ? "hover" : "scroll"}>
        <ScrollArea.Viewport>
          <TabsPrimitive.List
            className={cn(
              "mb-4 flex items-center gap-2",
              scale && "3xl:mb-[1.041vw] 3xl:gap-[0.52vw]"
            )}
          >
            <TabsPrimitive.Trigger
              value="products"
              className={cn(
                "flex items-center justify-center gap-1.5 rounded px-2 py-1 text-gray-2 transition-colors hover:bg-gray-5/[0.15] data-[state=active]:bg-gray-5/25 data-[state=active]:text-black dark:text-gray-3 dark:hover:bg-gray-2/30 dark:data-[state=active]:bg-gray-1 dark:data-[state=active]:text-gray-5",
                scale &&
                  "3xl:gap-[0.36vw] 3xl:rounded-[0.26vw] 3xl:px-[0.52vw] 3xl:py-[0.26vw]"
              )}
              onClick={() => sendEvent({ name: "products_tab_click" })}
            >
              <EcosystemIcon
                className={cn(
                  "h-4 w-4",
                  scale && "3xl:h-[1.041vw] 3xl:w-[1.041vw]"
                )}
              />
              <Text0>{t("products-root")}</Text0>
            </TabsPrimitive.Trigger>
            <TabsPrimitive.Trigger
              value="promo"
              className={cn(
                "flex items-center justify-center gap-1.5 rounded bg-fuchsia-300/50 px-2 py-1 text-black/80 transition-colors hover:bg-fuchsia-300/75 data-[state=active]:bg-fuchsia-300 data-[state=active]:text-black dark:bg-fuchsia-800/50 dark:text-white dark:hover:bg-fuchsia-800/75 dark:data-[state=active]:bg-fuchsia-800 dark:data-[state=active]:text-white",
                scale &&
                  "3xl:gap-[0.36vw] 3xl:rounded-[0.26vw] 3xl:px-[0.52vw] 3xl:py-[0.26vw]"
              )}
            >
              <PromoIcon
                className={cn(
                  "h-4 w-4 shrink-0",
                  scale && "3xl:h-[1.041vw] 3xl:w-[1.041vw]"
                )}
              />
              <Text0 className="whitespace-nowrap">{t("promo-root")}</Text0>
            </TabsPrimitive.Trigger>
            <TabsPrimitive.Trigger
              value="inventory"
              className={cn(
                "flex items-center justify-center gap-1.5 rounded px-2 py-1 text-gray-2 transition-colors hover:bg-gray-5/[0.15] data-[state=active]:bg-gray-5/25 data-[state=active]:text-black dark:text-gray-3 dark:hover:bg-gray-2/30 dark:data-[state=active]:bg-gray-1 dark:data-[state=active]:text-gray-5",
                scale &&
                  "3xl:gap-[0.36vw] 3xl:rounded-[0.26vw] 3xl:px-[0.52vw] 3xl:py-[0.26vw]"
              )}
              onClick={() => sendEvent({ name: "inventory_tab_click" })}
            >
              {activeRootTab === "inventory" ? (
                <InventoryActiveIcon
                  className={cn(
                    "h-4 w-4",
                    scale && "3xl:h-[1.041vw] 3xl:w-[1.041vw]"
                  )}
                />
              ) : (
                <InventoryIcon
                  className={cn(
                    "h-4 w-4",
                    scale && "3xl:h-[1.041vw] 3xl:w-[1.041vw]"
                  )}
                />
              )}
              <Text0>{t("inventory-root")}</Text0>
            </TabsPrimitive.Trigger>
            <TabsPrimitive.Trigger
              value="store"
              className={cn(
                "flex items-center justify-center gap-1.5 rounded px-2 py-1 text-gray-2 transition-colors hover:bg-gray-5/[0.15] data-[state=active]:bg-gray-5/25 data-[state=active]:text-black dark:text-gray-3 dark:hover:bg-gray-2/30 dark:data-[state=active]:bg-gray-1 dark:data-[state=active]:text-gray-5",
                scale &&
                  "3xl:gap-[0.36vw] 3xl:rounded-[0.26vw] 3xl:px-[0.52vw] 3xl:py-[0.26vw]"
              )}
              onClick={() => sendEvent({ name: "store_tab_click" })}
            >
              <StoreIcon
                className={cn(
                  "h-4 w-4",
                  scale && "3xl:h-[1.041vw] 3xl:w-[1.041vw]"
                )}
              />
              <Text0>{t("points-store-root")}</Text0>
            </TabsPrimitive.Trigger>
          </TabsPrimitive.List>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="group flex touch-none select-none bg-gray-5/30 p-0.5 transition-colors data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col dark:bg-gray-1"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-full bg-gray-3/50 transition-colors before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] group-hover:bg-gray-2/50 dark:bg-gray-2 dark:group-hover:bg-gray-3" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>

      <TabsPrimitive.Content value="products">
        <Tabs
          value={activeProduct}
          onValueChange={handleProductsTabChange}
          className="flex-1 lg:overflow-hidden 2xl:flex-grow-[2]"
        >
          <ScrollArea.Root
            type={isDesktop ? "hover" : "scroll"}
            className={cn(
              "mb-5 w-full overflow-hidden rounded",
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
                    "absolute -bottom-0.5 left-0 h-[3px] w-1/4 rounded-full bg-gray-1 transition-transform dark:bg-gray-5",
                    activeProduct === TABS_VALUES.calendar &&
                      "translate-x-full",
                    // activeProduct === TABS_VALUES.research &&
                    //   "translate-x-[200%]",
                    activeProduct === TABS_VALUES.tools && "translate-x-[200%]",
                    activeProduct === TABS_VALUES.nutcracker &&
                      "translate-x-[300%]",
                    scale && "3xl:-bottom-[0.13vw] 3xl:h-[0.195vw]"
                  )}
                />
              </TabsList>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="group flex touch-none select-none bg-gray-5/30 p-0.5 transition-colors data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col dark:bg-gray-1"
              orientation="horizontal"
            >
              <ScrollArea.Thumb className="relative flex-1 rounded-full bg-gray-3/50 transition-colors before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] group-hover:bg-gray-2/50 dark:bg-gray-2 dark:group-hover:bg-gray-3" />
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
      <TabsPrimitive.Content value="store">
        <PointStoreTab />
      </TabsPrimitive.Content>
      <TabsPrimitive.Content value="promo">
        <PromoTab />
      </TabsPrimitive.Content>
    </TabsPrimitive.Root>
  )
}

export default Products
