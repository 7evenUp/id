import React from "react"
import * as ToggleGroup from "@radix-ui/react-toggle-group"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const SegmentedRoot = React.forwardRef<
  React.ElementRef<typeof ToggleGroup.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroup.Root>
>(({ className, ...props }, forwardedRef) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <ToggleGroup.Root
      className={cn(
        "flex bg-white dark:bg-gray-1 rounded-xl min-w-[200px] p-1",
        scale && "3xl:rounded-[0.78125vw] 3xl:min-w-[13.02vw] 3xl:p-[0.26vw]",
        className
      )}
      {...props}
      ref={forwardedRef}
    />
  )
})
SegmentedRoot.displayName = "SegmentedRoot"

const SegmentedButton = React.forwardRef<
  React.ElementRef<typeof ToggleGroup.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroup.Item>
>(({ className, children, ...props }, forwardedRef) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <ToggleGroup.Item
      className={cn(
        "flex-1 py-1.5 px-3 font-medium text-gray-2 dark:text-gray-3 data-[state=on]:text-black dark:data-[state=on]:text-gray-5 data-[state=on]:bg-gray-5/25 dark:data-[state=on]:bg-gray-2 hover:bg-gray-5/[0.15] dark:hover:bg-gray-2/30 rounded-lg transition-colors typography-text-0",
        scale && "typography-text-0_large 3xl:rounded-[0.52vw] 3xl:py-[0.39vw]",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </ToggleGroup.Item>
  )
})
SegmentedButton.displayName = "SegmentedButton"

export { SegmentedButton, SegmentedRoot }
