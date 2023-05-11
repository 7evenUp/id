import { useState } from "react"
import { DialogClose } from "@radix-ui/react-dialog"

import { useUpdateEmailMutation, useUserProfileQuery } from "@/redux/api/core"

import { DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog"
import Button from "../ui/Button"
import Input from "../ui/Input"

const UpdateEmailModal = () => {
  const [oldEmail, setOldEmail] = useState("")
  const [newEmail, setNewEmail] = useState("")

  const { data: userProfileData, error } = useUserProfileQuery()
  const [updateEmail, { data: updatedData }] = useUpdateEmailMutation()

  const onButtonClick = () => {
    if (userProfileData) {
      updateEmail({
        id: userProfileData.id,
        username: userProfileData.username,
        email: newEmail,
      })
    }
  }

  if (error) {
    console.error("Error with fetching user profile data: ", error)
  }

  if (updatedData) {
    console.log("New data: ", updatedData)
  }

  return (
    <DialogContent className="mobile:w-[370px] sm:w-[370px]">
      <DialogHeader>
        <DialogTitle>Изменить почту</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-[18px]">
        <Input
        placeholder="Старая почта"
        value={oldEmail}
        onChange={(evt) => setOldEmail(evt.currentTarget.value)}
         />
        <Input
        placeholder="Новая почта"
        value={newEmail}
        onChange={(evt) => setNewEmail(evt.currentTarget.value)}
         />
        <DialogClose asChild>
          <Button
            className="w-fit mt-7"
            onClick={onButtonClick}
            disabled={!newEmail.length}
          >
            подтвердить
          </Button>
        </DialogClose>
      </div>
    </DialogContent>
  )
}

export default UpdateEmailModal
