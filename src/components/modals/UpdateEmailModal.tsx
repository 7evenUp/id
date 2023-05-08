import { useState } from "react"
import Button from "../ui/Button"
import { DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog"

const UpdateEmailModal = () => {
  const [oldEmail, setOldEmail] = useState("")
  const [newEmail, setNewEmail] = useState("")

  const onButtonClick = () => {}

  return (
    <DialogContent className="max-w-[370px]">
      <DialogHeader>
        <DialogTitle>Изменить почту</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-[18px]">
        <input
          className="outline-none bg-transparent border-b border-gray-1 dark:border-gray-4 dark:placeholder:text-gray-3 py-1"
          placeholder="старая почта"
          value={oldEmail}
          onChange={(evt) => setOldEmail(evt.currentTarget.value)}
        />
        <input
          className="outline-none bg-transparent border-b border-gray-1 dark:border-gray-4 dark:placeholder:text-gray-3 py-1"
          placeholder="новая почта"
          value={newEmail}
          onChange={(evt) => setNewEmail(evt.currentTarget.value)}
        />
        <Button className="w-fit mt-7" onClick={onButtonClick}>
          подтвердить
        </Button>
      </div>
    </DialogContent>
  )
}

export default UpdateEmailModal
