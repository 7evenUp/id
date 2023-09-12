import React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "flex items-center justify-between sm:justify-start w-full sm:gap-[72px] py-4 px-2 mobile-sm:px-5 mb-9 border-b border-gray-2 dark:border-gray-2",
        scale &&
          "3xl:gap-[4.687vw] 3xl:py-[1.042vw] 3xl:px-[1.302vw] 3xl:mb-[2.344vw]",
        className
      )}
      {...props}
    />
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const scale = useAppSelector((state) => state.scale.value)
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn("group relative", className)}
      {...props}
    >
      {children}
      <span
        className={cn(
          "absolute hidden group-data-[state=active]:block w-10 mobile-sm:w-[68px] h-[3px] rounded-full left-0 bottom-0 translate-y-[18px] -translate-x-[7px] mobile-sm:-translate-x-5 bg-gray-1 dark:bg-gray-5",
          scale &&
            "3xl:w-[4.427vw] 3xl:h-[0.195vw] 3xl:translate-y-[1.172vw] 3xl:-translate-x-[1.302vw]"
        )}
      />
    </TabsPrimitive.Trigger>
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "typography-text-0",
        scale && "typography-text-0_large",
        className
      )}
      {...props}
    />
  )
})
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
