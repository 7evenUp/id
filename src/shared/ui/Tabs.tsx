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
        "flex items-center justify-between sm:justify-start w-full mb-9 border-b border-gray-2 dark:border-gray-2",
        scale && "3xl:mb-[2.344vw]",
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
      className={cn(
        "flex-1 flex justify-center items-center group relative py-4 px-2 mobile:px-5 hover:bg-zinc-200/[0.50] active:bg-zinc-300/[0.50] dark:hover:bg-zinc-800/[0.50] dark:active:bg-zinc-700/[0.50] transition-colors",
        scale && "3xl:py-[1.042vw] 3xl:px-[1.302vw]",
        className
      )}
      {...props}
    >
      {children}
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
