import React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-40 rounded-lg border bg-white dark:bg-gray-1 border-gray-4 dark:border-gray-2 p-3 shadow-md outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          scale && "3xl:w-[10.416vw] 3xl:rounded-[0.521vw] 3xl:p-[0.781vw]",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
})
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
