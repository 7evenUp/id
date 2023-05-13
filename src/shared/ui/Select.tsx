import React from "react"
import * as RadixSelect from "@radix-ui/react-select"
import { HiSelector } from "react-icons/hi"

import { cn } from "@/lib/classNames"

const Select = RadixSelect.Root

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Trigger>
>(({ className, ...props }, forwardedRef) => {
  return (
    <RadixSelect.Trigger
      className={cn(
        "flex items-center justify-between gap-0.5 text-gray-1 border border-gray-1 dark:text-gray-4 dark:border-gray-4 rounded-full typography-btn-standart py-1 px-2.5 min-w-[75px]",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <RadixSelect.Value placeholder="Select" />
      <RadixSelect.Icon>
        <HiSelector />
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
          "bg-white dark:bg-gray-1 border border-gray-3 rounded-md px-2 py-1 min-w-[75px]",
          className
        )}
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
        "typography-text-1 text-gray-1 dark:text-gray-5 bg-transparent h-5 px-2 leading-none rounded-sm flex items-center select-none data-[highlighted]:outline-none data-[highlighted]:bg-gray-1 data-[highlighted]:bg-opacity-10 dark:data-[highlighted]:bg-gray-5 dark:data-[highlighted]:bg-opacity-10",
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
