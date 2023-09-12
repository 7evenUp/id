import React from "react"
import * as RadixRadioGroup from "@radix-ui/react-radio-group"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadixRadioGroup.Root>,
  React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>
>(({ className, children, ...props }, forwardedRef) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <RadixRadioGroup.Root
      className={cn(
        "flex flex-col gap-2",
        scale && "3xl:gap-[0.521vw]",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </RadixRadioGroup.Root>
  )
})

RadioGroup.displayName = "RadioGroup"

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadixRadioGroup.Item>,
  React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Item>
>(({ className, children, id, ...props }, forwardedRef) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        scale && "3xl:gap-[0.521vw]",
        className
      )}
    >
      <RadixRadioGroup.Item
        className={cn(
          "group relative flex items-center justify-center w-2.5 h-2.5 rounded-full border border-gray-1 dark:border-gray-3",
          scale && "3xl:w-[0.651vw] 3xl:h-[0.651vw]"
        )}
        ref={forwardedRef}
        id={id}
        {...props}
      >
        <RadixRadioGroup.Indicator
          className={cn(
            "w-1 h-1 bg-gray-1 dark:bg-gray-4 rounded-full",
            scale && "3xl:w-[0.26vw] 3xl:h-[0.26vw]"
          )}
        />
      </RadixRadioGroup.Item>
      <RadioGroupLabel htmlFor={id}>{children}</RadioGroupLabel>
    </div>
  )
})

RadioGroupItem.displayName = "RadioGroupItem"

const RadioGroupLabel: React.FC<
  React.LabelHTMLAttributes<HTMLLabelElement>
> = ({ children, htmlFor }) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <label
      htmlFor={htmlFor}
      className={cn("typography-text-0", scale && "typography-text-0_large")}
    >
      {children}
    </label>
  )
}
