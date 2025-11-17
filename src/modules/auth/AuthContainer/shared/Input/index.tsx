import { ComponentPropsWithoutRef, forwardRef } from "react"

import "./styles.css"

const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<"input">>(
  (props, forwardedRef) => {
    return <input className="id_crypton_input" {...props} ref={forwardedRef} />
  }
)
Input.displayName = "Input"

export default Input
