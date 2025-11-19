import { Dispatch, SetStateAction } from "react"

import Telegram from "../Icons/Telegram"

import Button from "../../shared/Button"

import { useTranslate } from "../../useTranslate"

const TelegramButton = ({
  setIsTelegramFlow,
}: {
  setIsTelegramFlow: Dispatch<SetStateAction<boolean>>
}) => {
  const t = useTranslate()

  const handleTelegram = async () => {
    setIsTelegramFlow(true)
  }

  return (
    <Button onClick={handleTelegram}>
      <Telegram />
      {t("Продолжить с Telegram")}
    </Button>
  )
}

export default TelegramButton
