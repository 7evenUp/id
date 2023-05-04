import React from "react"
import * as RadixSwitch from "@radix-ui/react-switch"

import { cn } from "../../lib/classNames"

const Switch = React.forwardRef<
  React.ElementRef<typeof RadixSwitch.Root>,
  React.ComponentPropsWithoutRef<typeof RadixSwitch.Root>
>(({ className, ...props }, ref) => (
  <RadixSwitch.Root
    className={cn(
      "inline-flex h-[18px] w-[36px] shrink-0 cursor-pointer items-center rounded-full border border-gray-1 transition-colors focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
    ref={ref}
  >
    <RadixSwitch.Thumb
      className={cn(
        "pointer-events-none block h-3 w-3 rounded-full bg-gray-4 transition-transform data-[state=checked]:translate-x-5 data-[state=checked]:bg-gray-1 data-[state=unchecked]:translate-x-[3px]"
      )}
    />
  </RadixSwitch.Root>
))
Switch.displayName = "Switch"

export { Switch }
