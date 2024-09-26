import React from "react"
import * as RadixSelect from "@radix-ui/react-select"

import NavArrowDown from "@/assets/icons/nav-arrow-down.svg?react"
import CheckIcon from "@/assets/icons/check.svg?react"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const SelectNew = RadixSelect.Root

const SelectTriggerNew = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Trigger>
>(({ className, placeholder, ...props }, forwardedRef) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <RadixSelect.Trigger
      className={cn(
        "h-10 px-3 flex items-center justify-between gap-3 bg-gray-5/25 dark:bg-gray-1 text-gray-2 dark:text-gray-3 hover:bg-gray-5/50 dark:hover:bg-gray-2/70 transition-colors rounded-xl min-w-[200px] whitespace-nowrap [&>span]:line-clamp-1",
        scale &&
          "3xl:h-[2.6vw] 3xl:px-[0.78125vw] 3xl:gap-[0.78125vw] 3xl:rounded-[0.78125vw] 3xl:min-w-[13.02vw]",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <RadixSelect.Value placeholder={placeholder} />
      <RadixSelect.Icon>
        <NavArrowDown
          className={cn("w-4 h-4", scale && "3xl:w-[1.041vw] 3xl:h-[1.041vw]")}
        />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
  )
})
SelectTriggerNew.displayName = "SelectTriggerNew"

const SelectContentNew = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Content>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Content>
>(({ className, children, ...props }, forwardedRef) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <RadixSelect.Portal>
      <RadixSelect.Content
        className={cn(
          "relative z-50 max-h-96 min-w-[8rem] overflow-hidden bg-[#EBEAE9] dark:bg-gray-1 rounded-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          scale &&
            "3xl:max-h-[25vw] 3xl:min-w-[8.33vw] 3xl:rounded-[0.78125vw]",
          className
        )}
        avoidCollisions={false}
        position="popper"
        {...props}
        ref={forwardedRef}
      >
        <RadixSelect.Viewport
          className={cn(
            "p-1 h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
            scale && "3xl:p-[0.26vw]"
          )}
        >
          {children}
        </RadixSelect.Viewport>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  )
})
SelectContentNew.displayName = "SelectContentNew"

const SelectItemNew = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Item>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Item>
>(({ children, className, ...props }, forwardedRef) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <RadixSelect.Item
      className={cn(
        "font-montserrat relative h-10 rounded-lg pl-2 pr-8 typography-text-0 text-gray-1 dark:text-gray-5 bg-transparent flex items-center select-none data-[highlighted]:outline-none data-[highlighted]:bg-gray-2 data-[highlighted]:bg-opacity-10 dark:data-[highlighted]:bg-gray-5 dark:data-[highlighted]:bg-opacity-10 cursor-pointer aria-disabled:text-gray-4 aria-disabled:cursor-auto dark:aria-disabled:text-gray-3",
        scale &&
          "typography-text-0_large 3xl:h-[2.6vw] 3xl:pl-[0.52vw] 3xl:pr-[2.08vw] 3xl:rounded-[0.78125vw]",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <span
        className={cn(
          "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
          scale && "3xl:right-[0.52vw] 3xl:h-[0.911vw] 3xl:w-[0.911vw]"
        )}
      >
        <RadixSelect.ItemIndicator>
          <CheckIcon
            className={cn(
              "h-4 w-4",
              scale && "3xl:h-[1.041vw] 3xl:w-[1.041vw]"
            )}
          />
        </RadixSelect.ItemIndicator>
      </span>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
  )
})
SelectItemNew.displayName = "SelectItemNew"

export { SelectNew, SelectTriggerNew, SelectContentNew, SelectItemNew }
