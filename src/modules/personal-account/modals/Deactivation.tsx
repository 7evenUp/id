import { useState } from "react"
import { useTranslation } from "react-i18next"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import Input from "@/shared/ui/Input"
import Button from "@/shared/ui/Button"

const Deactivation = () => {
  const { t } = useTranslation("modals")

  const [deactivationCode, setDeactivationCode] = useState("")

  const onSubmit = () => {
    console.log("Deactivated!")
  }

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
          onClick={onSubmit}
          className="w-fit bg-error hover:bg-red-600 dark:hover:bg-red-600 text-white dark:text-white"
        >
          {t("deactivation.deactivate-btn")}
        </Button>
      </div>
    </DialogContent>
  )
}

export default Deactivation
