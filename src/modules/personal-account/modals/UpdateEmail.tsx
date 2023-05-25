import { useState } from "react"
import { DialogClose } from "@radix-ui/react-dialog"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"
import Input from "@/shared/ui/Input"

import {
  useUpdateEmailMutation,
  useUserProfileQuery,
} from "@/redux/api/profile"

const UpdateEmail = () => {
  const [oldEmail, setOldEmail] = useState("")
  const [newEmail, setNewEmail] = useState("")

  const { data: userProfileData } = useUserProfileQuery()
  const [updateEmail, { isSuccess, error }] = useUpdateEmailMutation()

  const isOldEmailCorrect = oldEmail === userProfileData?.email

  const onSubmit = () => {
    if (!/.+@.+\..+/.test(newEmail)) {
      console.log("email is not valid")
      return
    }

    if (userProfileData) {
      updateEmail({
        email: newEmail,
      })
    }
  }

  if (error) console.log("ERROR: ", error)

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
        {isSuccess && (
          <span className="typography-text-2 text-success">
            Ваша почта успешно изменена
          </span>
        )}
        {error && (
          <span className="typography-text-2 text-error">
            {/* @ts-expect-error No-Error-Types */}
            {error.data.detail}
          </span>
        )}
        <div className="flex items-center gap-4 mt-2">
          {isSuccess ? (
            <DialogClose>
              <Button>закрыть</Button>
            </DialogClose>
          ) : (
            <Button
              onClick={onSubmit}
              disabled={!isOldEmailCorrect || !newEmail.length || !!error}
            >
              подтвердить
            </Button>
          )}
          {error && (
            <DialogClose asChild>
              <Button>закрыть</Button>
            </DialogClose>
          )}
        </div>
      </div>
    </DialogContent>
  )
}

export default UpdateEmail
