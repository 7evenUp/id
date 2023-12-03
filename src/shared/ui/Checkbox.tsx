import React from "react"
import * as RadixCheckbox from "@radix-ui/react-checkbox"

import Check from "@/assets/icons/check.svg?react"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

export const CheckboxLabel: React.FC<
  React.LabelHTMLAttributes<HTMLLabelElement>
> = ({ className, children, ...props }) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <label
      {...props}
      className={cn(
        "text-[10px] 2xl:text-xs/[12px] leading-[140%] tracking-[0.05em] font-medium select-none",
        scale && "3xl:text-[0.651vw]/[0.6250vw]",
        className
      )}
    >
      {children}
    </label>
  )
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root>
>(({ className, ...props }, forwardedRef) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <RadixCheckbox.Root
      {...props}
      ref={forwardedRef}
      className={cn(
        "w-4 h-4 border border-gray-1 dark:border-gray-5 rounded-[4px] data-[state=checked]:bg-gray-1 dark:data-[state=checked]:bg-gray-5 data-[state=checked]:border-0",
        scale && "3xl:w-[1.042vw] 3xl:h-[1.042vw] 3xl:rounded-[0.26vw]",
        className
      )}
    >
      <RadixCheckbox.Indicator className="data-[state=checked]:text-gray-6 dark:data-[state=checked]:text-gray-1">
        <Check
          className={cn("w-4 h-4", scale && "3xl:w-[1.042vw] 3xl:h-[1.042vw]")}
        />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  )
})
