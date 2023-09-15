import React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import Text2 from "../typography/Text2"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

interface TooltipProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  content: string
}

const Tooltip = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipProps
>(
  (
    { children, content, className, sideOffset = 4, ...props },
    forwardedRef
  ) => {
    const scale = useAppSelector((state) => state.scale.value)

    return (
      <TooltipPrimitive.Provider>
        <TooltipPrimitive.Root delayDuration={400}>
          <TooltipPrimitive.Trigger asChild>
            {children}
          </TooltipPrimitive.Trigger>
          <TooltipPrimitive.Content
            className={cn(
              "flex items-center bg-gray-2 dark:bg-gray-4 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              "rounded min-h-[24px] px-2",
              scale &&
                "3xl:rounded-[0.2083vw] 3xl:min-h-[1.25vw] 3xl:px-[0.4167vw]",
              className
            )}
            sideOffset={sideOffset}
            ref={forwardedRef}
            {...props}
          >
            <Text2 className="text-gray-6 dark:text-gray-1">{content}</Text2>
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    )
  }
)
Tooltip.displayName = "Tooltip"

export default Tooltip
