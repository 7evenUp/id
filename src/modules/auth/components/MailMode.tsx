import { useState } from "react"
import { useTranslation } from "react-i18next"

import { ReactComponent as MoveLeft } from "@/assets/icons/move-left.svg"

import { useLoginMutation } from "@/redux/api/auth"
import LoginMailForm from "./LoginMailForm"
import RegisterMailForm from "./RegisterMailForm"

const MailMode = ({ back }: { back: () => void }) => {
  const { t } = useTranslation("auth")

  const [usedEmail, setUsedEmail] = useState("")

  const [_, { isError }] = useLoginMutation({
    fixedCacheKey: "login-by-mail",
  })

  return (
    <>
      <button
        className="typography-btn-big flex items-center gap-2 hover:text-gray-3 mb-6 w-fit"
        onClick={back}
      >
        <MoveLeft className="w-3.5 h-3.5" />
        <span className="text-left">{t("login.another-method")}</span>
      </button>
      {isError ? (
        <RegisterMailForm email={usedEmail} />
      ) : (
        <LoginMailForm setEmail={setUsedEmail} />
      )}
    </>
  )
}

export default MailMode
