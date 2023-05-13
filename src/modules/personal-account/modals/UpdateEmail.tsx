import { useState } from "react"
import { DialogClose } from "@radix-ui/react-dialog"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"
import Input from "@/shared/ui/Input"

import { useUpdateEmailMutation, useUserProfileQuery } from "@/redux/api/core"

const UpdateEmail = () => {
  const [oldEmail, setOldEmail] = useState("")
  const [newEmail, setNewEmail] = useState("")

  const { data: userProfileData, error } = useUserProfileQuery()
  const [updateEmail, { data: updatedData }] = useUpdateEmailMutation()

  const onSubmit = () => {
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
        <div className="group flex flex-col gap-1">
          <label
            htmlFor="oldEmail"
            className="typography-text-1 text-gray-3 dark:text-gray-4 group-focus-within:text-gray-1 dark:group-focus-within:text-gray-5"
          >
            Старая почта
          </label>
          <Input
            id="oldEmail"
            type="email"
            placeholder="Введите вашу старую почту"
            value={oldEmail}
            onChange={(evt) => setOldEmail(evt.currentTarget.value)}
          />
        </div>
        <div className="group flex flex-col gap-1">
          <label
            htmlFor="newEmail"
            className="typography-text-1 text-gray-3 dark:text-gray-4 group-focus-within:text-gray-1 dark:group-focus-within:text-gray-5"
          >
            Новая почта
          </label>
          <Input
            id="newEmail"
            type="email"
            placeholder="Введите вашу новую почту"
            value={newEmail}
            onChange={(evt) => setNewEmail(evt.currentTarget.value)}
          />
        </div>
        <DialogClose asChild>
          <Button
            className="w-fit mt-2"
            onClick={onSubmit}
            disabled={!newEmail.length}
          >
            подтвердить
          </Button>
        </DialogClose>
      </div>
    </DialogContent>
  )
}

export default UpdateEmail
