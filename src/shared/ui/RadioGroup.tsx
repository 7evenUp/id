import React from "react"
import * as RadixRadioGroup from "@radix-ui/react-radio-group"

import { cn } from "@/lib/classNames"

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadixRadioGroup.Root>,
  React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>
>(({ className, children, ...props }, forwardedRef) => (
  <RadixRadioGroup.Root
    className={cn("flex flex-col gap-2", className)}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </RadixRadioGroup.Root>
))

RadioGroup.displayName = "RadioGroup"

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadixRadioGroup.Item>,
  React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Item>
>(({ className, children, id, ...props }, forwardedRef) => (
  <div className={cn("flex items-center gap-2", className)}>
    <RadixRadioGroup.Item
      className="group relative flex items-center justify-center w-2.5 h-2.5 rounded-full border border-gray-1 dark:border-gray-3"
      ref={forwardedRef}
      id={id}
      {...props}
    >
      <RadixRadioGroup.Indicator className="w-1 h-1 bg-gray-1 dark:bg-gray-4 rounded-full" />
    </RadixRadioGroup.Item>
    <RadioGroupLabel htmlFor={id}>{children}</RadioGroupLabel>
  </div>
))

RadioGroupItem.displayName = "RadioGroupItem"

const RadioGroupLabel: React.FC<
  React.LabelHTMLAttributes<HTMLLabelElement>
> = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="typography-text-0">
    {children}
  </label>
)
