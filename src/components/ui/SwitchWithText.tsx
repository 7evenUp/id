import React from "react"
import * as RadixSwitch from "@radix-ui/react-switch"

import { cn } from "@/lib/classNames"

const SwitchWithText = React.forwardRef<
  React.ElementRef<typeof RadixSwitch.Root>,
  React.ComponentPropsWithoutRef<typeof RadixSwitch.Root>
>(({ className, children, ...props }, ref) => (
  <RadixSwitch.Root
    className={cn(
      "group relative inline-flex h-[18px] w-[74px] shrink-0 cursor-pointer items-center rounded-full border border-gray-1 dark:border-gray-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
    ref={ref}
  >
    <RadixSwitch.Thumb
      className={cn(
        "pointer-events-none block h-3 w-3 rounded-full bg-gray-4 dark:bg-gray-3 transition-transform data-[state=checked]:translate-x-[59px] dark:data-[state=checked]:bg-gray-4 data-[state=checked]:bg-gray-1 data-[state=unchecked]:translate-x-[3px]"
      )}
    />
    <span className="absolute typography-btn-standart text-gray-4 dark:text-gray-3 dark:group-data-[state=checked]:text-gray-4 group-data-[state=checked]:text-gray-1 group-data-[state=checked]:translate-x-[9px] group-data-[state=unchecked]:right-[5px]">
      {children}
    </span>
  </RadixSwitch.Root>
))
SwitchWithText.displayName = "SwitchWithText"

export default SwitchWithText
