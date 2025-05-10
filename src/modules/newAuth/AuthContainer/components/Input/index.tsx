import { ComponentProps } from "react"

import "./styles.css"

const Input = (props: ComponentProps<"input">) => {
  return <input className="id_crypton_input" {...props} />
}

export default Input
