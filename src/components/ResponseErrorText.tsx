import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query"

import { cn } from "@/lib/classNames"

const ResponseErrorText = ({
  error,
  className,
  customMessage = "На стороне сервера произошла ошибка",
}: {
  error: FetchBaseQueryError | SerializedError
  className?: string
  customMessage?: string
}) => {
  return (
    <span
      className={cn(
        "text-error text-xs 2xl:text-[0.781vw]/[1.042vw] font-medium tracking-wide",
        className
      )}
    >
      {/* @ts-expect-error No-Error-Types */}
      {error.message ? error.message : customMessage}
    </span>
  )
}

export default ResponseErrorText
