import React from "react"

import { Dialog, DialogTrigger } from "@/shared/ui/Dialog"

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
      {content}
    </Dialog>
  )
}

export default ModalTrigger
