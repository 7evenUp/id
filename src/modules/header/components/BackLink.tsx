import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { ReactComponent as MoveLeft } from "@/assets/icons/move-left.svg"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const BackLink = () => {
  const { t } = useTranslation()

  const scale = useAppSelector((state) => state.scale.value)

  const [showBack, setShowBack] = useState(false)
  const [productName, setProductName] = useState("")

  useEffect(() => {
    const ref = document.referrer

    if (ref !== "") {
      const splitRef = new URL(document.referrer).hostname.split(".")

      if (splitRef.length >= 2) {
        const domain = `${splitRef.at(-2)}.${splitRef.at(-1)}`
        const productName = splitRef.at(0)

        if (domain === "crypton.xyz") {
          setShowBack(true)

          if (productName) setProductName(productName)
        }
      }
    }
  }, [])

  if (showBack)
    return (
      <a
        className={cn(
          "typography-btn-big flex items-center gap-2 hover:text-gray-3 w-fit cursor-pointer mr-auto",
          scale && "typography-btn-big_large 3xl:gap-[0.521vw]"
        )}
        href={document.referrer}
      >
        <MoveLeft
          className={cn(
            "w-3.5 h-3.5",
            scale && "3xl:w-[0.911vw] 3xl:h-[0.911vw]"
          )}
        />
        {productName ? (
          <p>
            {t("back-to")} <span className="capitalize">{productName}</span>
          </p>
        ) : (
          <span>{t("back")}</span>
        )}
      </a>
    )
  else return null
}

export default BackLink
