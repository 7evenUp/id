import React from "react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/Dialog"

const ModalTrigger = ({
  children,
  content,
}: {
  children: React.ReactNode
  content: React.ReactNode
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  )
}

export default ModalTrigger
