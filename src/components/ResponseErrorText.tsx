import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query"
import { useTranslation } from "react-i18next"

import { cn } from "@/lib/classNames"

const ResponseErrorText = ({
  error,
  className,
}: {
  error: FetchBaseQueryError | SerializedError
  className?: string
}) => {
  const { t } = useTranslation("reqResponses")

  return (
    <span
      className={cn(
        "text-error text-xs 3xl:text-[0.781vw]/[1.042vw] font-medium tracking-wide",
        className
      )}
    >
      {/* @ts-expect-error No-Error-Types */}
      {error.message ? error.message : t("server-error")}
    </span>
  )
}

export default ResponseErrorText
