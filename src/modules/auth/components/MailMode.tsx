import { useState } from "react"
import { useTranslation } from "react-i18next"

import { ReactComponent as MoveLeft } from "@/assets/icons/move-left.svg"

import LoginMailForm from "./LoginMailForm"
import RegisterMailForm from "./RegisterMailForm"

import { useLoginMutation } from "@/redux/api/auth"

const MailMode = ({ back }: { back: () => void }) => {
  const { t } = useTranslation("auth")

  const [usedEmail, setUsedEmail] = useState("")

  const [_, { isError, reset }] = useLoginMutation({
    fixedCacheKey: "login-by-mail",
  })

  return (
    <>
      <button
        className="text-sm 2xl:text-[0.911vw] flex items-center gap-2 2xl:gap-[0.521vw] hover:text-gray-3 mb-6 2xl:mb-[1.56vw] w-fit"
        onClick={back}
      >
        <MoveLeft className="w-3.5 h-3.5 2xl:w-[0.911vw] 2xl:h-[0.911vw]" />
        <span className="text-left">{t("login.another-method")}</span>
      </button>
      {isError ? (
        <RegisterMailForm
          emailInput={usedEmail}
          setEmailInput={setUsedEmail}
          resetLoginError={reset}
        />
      ) : (
        <LoginMailForm emailInput={usedEmail} setEmailInput={setUsedEmail} />
      )}
    </>
  )
}

export default MailMode
