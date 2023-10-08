import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query"
import { useTranslation } from "react-i18next"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const EMAIL_ALREADY_TAKEN = "This email already been used"
const WALLET_LIMIT_REACHED = "You cannot update wallet twice a month"
const TELEGRAM_ALREADY_SET = "Telegram username already set"
const TELEGRAM_LIMIT_REACHED = "You cannot update telegram twice a month"

const ResponseErrorText = ({
  error,
  className,
}: {
  error: FetchBaseQueryError | SerializedError
  className?: string
}) => {
  const { t } = useTranslation("reqResponses")

  const scale = useAppSelector((state) => state.scale.value)

  let message = t("server-error")

  /* @ts-expect-error No-Error-Types */
  if (error.message) {
    /* @ts-expect-error No-Error-Types */
    if (error.message === EMAIL_ALREADY_TAKEN) {
      message = t("email_already_taken")
    }
    /* @ts-expect-error No-Error-Types */
    else if (error.message === WALLET_LIMIT_REACHED) {
      message = t("wallet_limit_reached")
    }
    /* @ts-expect-error No-Error-Types */
    else if (error.message === TELEGRAM_ALREADY_SET) {
      message = t("tg_already_set")
    }
    /* @ts-expect-error No-Error-Types */
    else if (error.message === TELEGRAM_LIMIT_REACHED) {
      message = t("tg_limit_reached")
    }
    else {
      /* @ts-expect-error No-Error-Types */
      message = error.message
    }
  }

  return (
    <span
      className={cn(
        "text-error text-xs font-medium tracking-wide",
        scale && "3xl:text-[0.781vw]/[1.042vw]",
        className
      )}
    >
      {message}
    </span>
  )
}

export default ResponseErrorText
