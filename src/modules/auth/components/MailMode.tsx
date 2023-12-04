import { useState } from "react"
import { useTranslation } from "react-i18next"

import MoveLeft from "@/assets/icons/move-left.svg?react"

import LoginMailForm from "./LoginMailForm"
import RegisterMailForm from "./RegisterMailForm"

import { useLoginMutation } from "@/redux/api/auth"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const MailMode = ({ back }: { back: () => void }) => {
  const { t } = useTranslation("auth")

  const scale = useAppSelector((state) => state.scale.value)

  const [usedEmail, setUsedEmail] = useState("")

  const [, { isError, reset }] = useLoginMutation({
    fixedCacheKey: "login-by-mail",
  })

  return (
    <>
      <button
        className={cn(
          "text-sm flex items-center gap-2 text-gray-1 hover:text-gray-3 dark:text-white dark:hover:text-gray-5 mb-6 w-fit",
          scale && "3xl:text-[0.911vw] 3xl:gap-[0.521vw] 3xl:mb-[1.56vw]"
        )}
        onClick={back}
      >
        <MoveLeft
          className={cn(
            "w-3.5 h-3.5",
            scale && "3xl:w-[0.911vw] 3xl:h-[0.911vw]"
          )}
        />
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
