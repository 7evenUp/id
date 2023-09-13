import React from "react"
import * as RadixSwitch from "@radix-ui/react-switch"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const SwitchWithText = React.forwardRef<
  React.ElementRef<typeof RadixSwitch.Root>,
  React.ComponentPropsWithoutRef<typeof RadixSwitch.Root>
>(({ className, children, ...props }, ref) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <RadixSwitch.Root
      className={cn(
        "group relative inline-flex h-[18px] w-[74px] shrink-0 cursor-pointer items-center rounded-full border border-gray-4 dark:border-gray-3 data-[state=checked]:border-gray-1 dark:data-[state=checked]:border-gray-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        scale && "3xl:h-[1.172vw] 3xl:w-[4.817vw]",
        className
      )}
      {...props}
      ref={ref}
    >
      <RadixSwitch.Thumb
        className={cn(
          "pointer-events-none block h-3 w-3 rounded-full bg-gray-4 dark:bg-gray-3 transition-transform data-[state=checked]:translate-x-[59px] dark:data-[state=checked]:bg-gray-4 data-[state=checked]:bg-gray-1 data-[state=unchecked]:translate-x-[3px]",
          scale &&
            "3xl:h-[0.781vw] 3xl:w-[0.781vw] 3xl:data-[state=checked]:translate-x-[3.841vw] 3xl:data-[state=unchecked]:translate-x-[0.195vw]"
        )}
      />
      <span
        className={cn(
          "absolute typography-btn-standart text-gray-4 dark:text-gray-3 dark:group-data-[state=checked]:text-gray-4 group-data-[state=checked]:text-gray-1 group-data-[state=checked]:translate-x-[9px] group-data-[state=unchecked]:right-[5px]",
          scale &&
            "typography-btn-standart_large 3xl:group-data-[state=checked]:translate-x-[0.585vw] 3xl:group-data-[state=unchecked]:right-[0.325vw] "
        )}
      >
        {children}
      </span>
    </RadixSwitch.Root>
  )
})
SwitchWithText.displayName = "SwitchWithText"

export default SwitchWithText
