import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import clsx from "clsx"

import "./styles.css"

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={clsx(
      "id_crypton_InputOTP_container",
      containerClassName
    )}
    className={clsx("id_crypton_InputOTP", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx("id_crypton_InputOTPGroup", className)}
    {...props}
  />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={clsx(
        "id_crypton_InputOTPSlot",
        isActive && "id_crypton_InputOTPSlot__active",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="id_crypton_InputOTPSlot_caret_container">
          <div className="id_crypton_InputOTPSlot_caret" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

export { InputOTP, InputOTPGroup, InputOTPSlot }
