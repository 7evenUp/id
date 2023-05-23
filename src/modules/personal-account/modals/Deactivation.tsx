import { useState } from "react"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import Input from "@/shared/ui/Input"
import Button from "@/shared/ui/Button"

const Deactivation = () => {
  const [deactivationCode, setDeactivationCode] = useState("")

  const onSubmit = () => {
    console.log("Deactivated!")
  }

  return (
    <DialogContent className="max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Деактивация аккаунта</DialogTitle>
      </DialogHeader>
      <div>
        <p className="typography-text-0 mb-6 max-w-prose">
          Если вы уверены, что хотите деактивировать аккаунт, введите ниже код,
          который вы получили в телеграм (или в почте)
        </p>
        <p className="typography-text-1 mb-2">
          Учтите, что все ваши данные и средства будут потеряны!
        </p>
        <Input
          className="block mb-3"
          placeholder="Введите код"
          value={deactivationCode}
          onChange={(evt) => setDeactivationCode(evt.currentTarget.value)}
        />
        <Button
          onClick={onSubmit}
          className="w-fit bg-error hover:bg-red-600 dark:hover:bg-red-600 text-white dark:text-white"
        >
          деактивировать
        </Button>
      </div>
    </DialogContent>
  )
}

export default Deactivation
