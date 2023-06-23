import React from "react"
import * as RadixSelect from "@radix-ui/react-select"

import { ReactComponent as ArrowsSelect } from "@/assets/icons/arrows-select.svg"

import { cn } from "@/lib/classNames"

const Select = RadixSelect.Root

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Trigger>
>(({ className, ...props }, forwardedRef) => {
  return (
    <RadixSelect.Trigger
      className={cn(
        "flex items-center justify-between gap-0.5 2xl:gap-[0.13vw] text-gray-1 border border-gray-1 dark:text-gray-4 dark:border-gray-4 rounded-full typography-btn-standart py-1 px-2.5 2xl:py-[0.26vw] 2xl:px-[0.651vw] min-w-[75px] 2xl:min-w-[4.882vw] aria-expanded:rounded-b-none aria-expanded:rounded-t-xl 2xl:aria-expanded:rounded-t-[0.781vw]",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <RadixSelect.Value placeholder="Select" />
      <RadixSelect.Icon>
        <ArrowsSelect className="w-2.5 h-2.5 2xl:w-[0.651vw] 2xl:h-[0.651vw]" />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
  )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectContent = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Content>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Content>
>(({ className, children, ...props }, forwardedRef) => {
  return (
    <RadixSelect.Portal>
      <RadixSelect.Content
        className={cn(
          "bg-white dark:bg-gray-1 border border-gray-1 dark:border-gray-4 rounded-b-xl 2xl:rounded-b-[0.781vw] border-t-0 px-2 2xl:px-[0.521vw] py-1 2xl:py-[0.26vw] min-w-[75px] 2xl:min-w-[4.882vw]",
          className
        )}
        avoidCollisions={false}
        position="popper"
        {...props}
        ref={forwardedRef}
      >
        <RadixSelect.Viewport>{children}</RadixSelect.Viewport>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  )
})
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Item>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Item>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <RadixSelect.Item
      className={cn(
        "typography-text-1 text-gray-1 dark:text-gray-5 bg-transparent h-5 2xl:h-[1.302vw] px-2 2xl:px-[0.521vw] leading-none rounded-sm 2xl:rounded-[0.13vw] flex items-center select-none data-[highlighted]:outline-none data-[highlighted]:bg-gray-2 data-[highlighted]:bg-opacity-10 dark:data-[highlighted]:bg-gray-5 dark:data-[highlighted]:bg-opacity-10 cursor-pointer aria-disabled:text-gray-4 aria-disabled:cursor-auto dark:aria-disabled:text-gray-3",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
  )
})
SelectItem.displayName = "SelectItem"

export { Select, SelectTrigger, SelectContent, SelectItem }
