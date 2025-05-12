import React from "react"
import * as RadixCheckbox from "@radix-ui/react-checkbox"
import clsx from "clsx"

import Check from "@/assets/icons/check.svg?react"

import "./styles.css"

export const CheckboxLabel: React.FC<
  React.LabelHTMLAttributes<HTMLLabelElement>
> = ({ className, children, ...props }) => {
  return (
    <label {...props} className={clsx("id_crypton_CheckboxLabel", className)}>
      {children}
    </label>
  )
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root>
>(({ className, ...props }, forwardedRef) => {
  return (
    <RadixCheckbox.Root
      {...props}
      ref={forwardedRef}
      className={clsx("id_crypton_Checkbox_Root", className)}
    >
      <RadixCheckbox.Indicator className="id_crypton_Checkbox_Indicator">
        <Check />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  )
})
