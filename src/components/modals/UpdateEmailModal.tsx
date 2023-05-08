import { useState } from "react"

import { useUpdateEmailMutation, useUserProfileQuery } from "@/redux/api/core"

import { DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog"
import Button from "../ui/Button"

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
        <Button
          className="w-fit mt-7"
          onClick={onButtonClick}
          disabled={!newEmail.length}
        >
          подтвердить
        </Button>
      </div>
    </DialogContent>
  )
}

export default UpdateEmailModal
