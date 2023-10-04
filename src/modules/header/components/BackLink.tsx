import { useEffect, useState } from "react"
import { addMinutes, isAfter } from "date-fns"
import { useTranslation } from "react-i18next"

import { ReactComponent as MoveLeft } from "@/assets/icons/move-left.svg"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { changeProductName } from "@/redux/referrer/slice"

import { cn } from "@/lib/classNames"

const BackLink = () => {
  const { t } = useTranslation()

  const scale = useAppSelector((state) => state.scale.value)
  const {
    productName: referrer,
    url: referrerUrl,
    timestamp,
  } = useAppSelector((state) => state.referrer)
  const dispatch = useAppDispatch()

  const [showBack, setShowBack] = useState(false)

  useEffect(() => {
    if (referrer && timestamp) {
      const currentTime = new Date()
      const timestampPlus5Minutes = addMinutes(new Date(timestamp), 5)

      if (isAfter(currentTime, timestampPlus5Minutes)) {
        setShowBack(false)
      } else {
        setShowBack(true)
      }
    }
  }, [])

  useEffect(() => {
    const ref = document.referrer

    if (ref === "") return

    const splitRef = new URL(ref).hostname.split(".")

    if (splitRef.length >= 2) {
      const domain = `${splitRef.at(-2)}.${splitRef.at(-1)}`
      const productName = splitRef.at(0) as string

      if (
        domain !== "crypton.xyz" ||
        productName === "id" ||
        productName === "id-dev"
      )
        return

      setShowBack(true)
      dispatch(
        changeProductName({
          productName,
          url: ref,
          timestamp: new Date().toString(),
        })
      )
    }
  }, [])

  if (!showBack) return null

  return (
    <a
      className={cn(
        "typography-btn-big flex items-center gap-2 hover:text-gray-3 w-fit cursor-pointer mr-auto",
        scale && "typography-btn-big_large 3xl:gap-[0.521vw]"
      )}
      href={referrerUrl}
    >
      <MoveLeft
        className={cn(
          "w-3.5 h-3.5",
          scale && "3xl:w-[0.911vw] 3xl:h-[0.911vw]"
        )}
      />
      <p>
        {t("back-to")} <span className="capitalize">{referrer}</span>
      </p>
    </a>
  )
}

export default BackLink
