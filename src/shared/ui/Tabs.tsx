import React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/classNames"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "flex items-center justify-between sm:justify-start w-full sm:gap-[72px] 2xl:gap-[4.687vw] py-4 2xl:py-[1.042vw] px-2 mobile-sm:px-5 2xl:px-[1.302vw] mb-9 2xl:mb-[2.344vw] border-b border-gray-2 dark:border-gray-2",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn("group relative", className)}
    {...props}
  >
    {children}
    <span className="absolute hidden group-data-[state=active]:block w-10 mobile-sm:w-[68px] 2xl:w-[4.427vw] h-[3px] 2xl:h-[0.195vw] rounded-full left-0 bottom-0 translate-y-[18px] 2xl:translate-y-[1.172vw] -translate-x-[7px] mobile-sm:-translate-x-5 2xl:-translate-x-[1.302vw] bg-gray-1 dark:bg-gray-5" />
  </TabsPrimitive.Trigger>
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("typography-text-0", className)}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
