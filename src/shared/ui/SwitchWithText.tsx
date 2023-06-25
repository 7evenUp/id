import React from "react"
import * as RadixSwitch from "@radix-ui/react-switch"

import { cn } from "@/lib/classNames"

const SwitchWithText = React.forwardRef<
  React.ElementRef<typeof RadixSwitch.Root>,
  React.ComponentPropsWithoutRef<typeof RadixSwitch.Root>
>(({ className, children, ...props }, ref) => (
  <RadixSwitch.Root
    className={cn(
      "group relative inline-flex h-[18px] w-[74px] 2xl:h-[1.172vw] 2xl:w-[4.817vw] shrink-0 cursor-pointer items-center rounded-full border border-gray-4 dark:border-gray-3 data-[state=checked]:border-gray-1 dark:data-[state=checked]:border-gray-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
    ref={ref}
  >
    <RadixSwitch.Thumb
      className={cn(
        "pointer-events-none block h-3 w-3 2xl:h-[0.781vw] 2xl:w-[0.781vw] rounded-full bg-gray-4 dark:bg-gray-3 transition-transform data-[state=checked]:translate-x-[59px] 2xl:data-[state=checked]:translate-x-[3.841vw] dark:data-[state=checked]:bg-gray-4 data-[state=checked]:bg-gray-1 data-[state=unchecked]:translate-x-[3px] 2xl:data-[state=unchecked]:translate-x-[0.195vw]"
      )}
    />
    <span className="absolute typography-btn-standart text-gray-4 dark:text-gray-3 dark:group-data-[state=checked]:text-gray-4 group-data-[state=checked]:text-gray-1 group-data-[state=checked]:translate-x-[9px] group-data-[state=unchecked]:right-[5px] 2xl:group-data-[state=checked]:translate-x-[0.585vw] 2xl:group-data-[state=unchecked]:right-[0.325vw]">
      {children}
    </span>
  </RadixSwitch.Root>
))
SwitchWithText.displayName = "SwitchWithText"

export default SwitchWithText
