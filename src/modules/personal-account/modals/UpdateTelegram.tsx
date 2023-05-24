import { useRef } from "react"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"
import Input from "@/shared/ui/Input"

import {
  useUpdateTelegramMutation,
  useUserProfileQuery,
} from "@/redux/api/core"

const UpdateTelegram = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { data: userProfileData } = useUserProfileQuery()
  const [trigger] = useUpdateTelegramMutation()

  if (!userProfileData) return null

  const { telegramId } = userProfileData

  const onSubmit = () => {
    if (!inputRef.current) return

    const inputValue = inputRef.current.value

    if (!inputValue.length) {
      if (telegramId) inputRef.current.value = telegramId.toString()
      return
    }

    if (telegramId === parseInt(inputValue)) return

    trigger({
      telegramId: parseInt(inputValue),
    })
  }

  return (
    <DialogContent className="mobile:w-[370px] sm:w-[370px]">
      <DialogHeader>
        <DialogTitle>Изменить телеграм</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-[18px]">
        <div className="group flex flex-col gap-1">
          <label
            htmlFor="telegram"
            className="typography-text-1 text-gray-3 dark:text-gray-4 group-focus-within:text-gray-1 dark:group-focus-within:text-gray-5"
          >
            Телеграм ID
          </label>
          <Input
            id="telegram"
            placeholder="Введите ваш телеграм ID"
            defaultValue={telegramId}
            ref={inputRef}
          />
        </div>
        <Button className="w-fit mt-2" onClick={onSubmit}>
          подтвердить
        </Button>
      </div>
    </DialogContent>
  )
}

export default UpdateTelegram
