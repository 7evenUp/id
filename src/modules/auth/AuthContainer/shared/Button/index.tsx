import { ComponentProps } from "react"

import Loader from "../Loader"

import "./styles.css"

const Button = ({
  children,
  isLoading,
  ...rest
}: ComponentProps<"button"> & { isLoading?: boolean }) => {
  return (
    <button {...rest} className="id_crypton_button">
      {isLoading ? <Loader /> : children}
    </button>
  )
}

export default Button
