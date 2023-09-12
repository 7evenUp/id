import React from "react"
import * as RadixSwitch from "@radix-ui/react-switch"

import { cn } from "@/lib/classNames"

const Switch = React.forwardRef<
  React.ElementRef<typeof RadixSwitch.Root>,
  React.ComponentPropsWithoutRef<typeof RadixSwitch.Root>
>(({ className, ...props }, ref) => (
  <RadixSwitch.Root
    className={cn(
      "inline-flex h-[18px] w-[36px] 3xl:h-[1.172vw] 3xl:w-[2.344vw] shrink-0 cursor-pointer items-center rounded-full border border-gray-4 dark:border-gray-3 data-[state=checked]:border-gray-1 dark:data-[state=checked]:border-gray-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
    ref={ref}
  >
    <RadixSwitch.Thumb
      className={cn(
        "pointer-events-none block h-3 w-3 3xl:h-[0.781vw] 3xl:w-[0.781vw] rounded-full bg-gray-4 dark:bg-gray-3 transition-transform data-[state=checked]:translate-x-5 3xl:data-[state=checked]:translate-x-[1.302vw] data-[state=checked]:bg-gray-1 dark:data-[state=checked]:bg-gray-4 data-[state=unchecked]:translate-x-[3px] 3xl:data-[state=unchecked]:translate-x-[0.195vw]"
      )}
    />
  </RadixSwitch.Root>
))
Switch.displayName = "Switch"

export default Switch
