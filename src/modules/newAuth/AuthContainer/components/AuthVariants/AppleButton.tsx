import Apple from "../Icons/Apple"

import Button from "../../shared/Button"

import { useTranslate } from "../../useTranslate"

const AppleButton = () => {
  const t = useTranslate()

  return (
    <Button>
      <Apple />
      {t("Продолжить с Apple")}
    </Button>
  )
}

export default AppleButton
