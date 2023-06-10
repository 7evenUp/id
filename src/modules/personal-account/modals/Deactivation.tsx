import { useState } from "react"
import { useTranslation } from "react-i18next"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import Input from "@/shared/ui/Input"
import Button from "@/shared/ui/Button"

import { useDeactivateMutation, useUserProfileQuery } from "@/redux/api/profile"

const Deactivation = () => {
  const { t } = useTranslation("modals")

  const [deactivationCode, setDeactivationCode] = useState("")

  const { data: userProfile } = useUserProfileQuery()
  const [deactivate, { isLoading, error }] = useDeactivateMutation()

  const { id } = userProfile!

  const onSubmit = () => {
    deactivate({id})
  }

  if (error) console.error(error)

  return (
    <DialogContent className="max-w-[500px]">
      <DialogHeader>
        <DialogTitle>{t("deactivation.heading")}</DialogTitle>
      </DialogHeader>
      <div>
        <p className="typography-text-0 mb-6 max-w-prose">
          {t("deactivation.text-1")}
        </p>
        <p className="typography-text-1 mb-2">{t("deactivation.text-2")}</p>
        <Input
          className="block mb-3"
          placeholder={t("deactivation.code-placeholder")}
          value={deactivationCode}
          onChange={(evt) => setDeactivationCode(evt.currentTarget.value)}
        />
        <Button
          className="w-fit bg-error hover:bg-red-600 dark:hover:bg-red-600 text-white dark:text-white"
          onClick={onSubmit}
          isLoading={isLoading}
        >
          {t("deactivation.deactivate-btn")}
        </Button>
      </div>
    </DialogContent>
  )
}

export default Deactivation
