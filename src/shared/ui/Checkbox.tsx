import React from "react"
import * as RadixCheckbox from "@radix-ui/react-checkbox"

import { ReactComponent as Check } from "@/assets/icons/check.svg"

import { cn } from "@/lib/classNames"

export const CheckboxLabel: React.FC<
  React.LabelHTMLAttributes<HTMLLabelElement>
> = ({ className, children, ...props }) => (
  <label
    {...props}
    className={cn("typography-btn-additional select-none", className)}
  >
    {children}
  </label>
)

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root>
>(({ className, ...props }, forwardedRef) => {
  return (
    <RadixCheckbox.Root
      {...props}
      ref={forwardedRef}
      className={cn(
        "w-4 h-4 3xl:w-[1.042vw] 3xl:h-[1.042vw] border border-gray-1 dark:border-gray-5 rounded-[4px] 3xl:rounded-[0.26vw] data-[state=checked]:bg-gray-1 dark:data-[state=checked]:bg-gray-5 data-[state=checked]:border-0",
        className
      )}
    >
      <RadixCheckbox.Indicator className="data-[state=checked]:text-gray-6 dark:data-[state=checked]:text-gray-1">
        <Check className="w-4 h-4 3xl:w-[1.042vw] 3xl:h-[1.042vw]" />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  )
})
