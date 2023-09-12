import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import ThemeToggle from "./components/ThemeToggle"
import LanguageToggle from "./components/LanguageToggle"
import AvatarMobile from "./components/AvatarMobile"
import ScaleToggle from "./components/ScaleToggle"

import { ReactComponent as MoveLeft } from "@/assets/icons/move-left.svg"

const Header = () => {
  const { t } = useTranslation()

  const [showBack, setShowBack] = useState(false)
  const [productName, setProductName] = useState("")

  useEffect(() => {
    const ref = document.referrer

    if (ref !== "") {
      const splitRef = new URL(document.referrer).hostname.split(".")

      if (splitRef.length >= 2) {
        const domain = `${splitRef.at(-2)}.${splitRef.at(-1)}`
        const productName = splitRef.at(1)

        if (domain === "crypton.xyz") {
          setShowBack(true)

          if (productName) setProductName(productName)
        }
      }
    }
  }, [])

  return (
    <header className="flex justify-end items-center mb-10 3xl:mb-[2.604vw]">
      {showBack && (
        <a className="typography-btn-big flex items-center gap-2 3xl:gap-[0.521vw] hover:text-gray-3 w-fit cursor-pointer mr-auto">
          <MoveLeft className="w-3.5 h-3.5 3xl:w-[0.911vw] 3xl:h-[0.911vw]" />
          {productName ? (
            <p>
              {t("back-to")} <span className="capitalize">{productName}</span>
            </p>
          ) : (
            <span>{t("back")}</span>
          )}
        </a>
      )}

      <div className="hidden sm:flex items-center gap-3 3xl:gap-[0.781vw]">
        <LanguageToggle />
        <ThemeToggle />
        <ScaleToggle />
      </div>

      <div className="sm:hidden flex gap-6 3xl:gap-[1.563vw]">
        <div className="flex items-center gap-3 3xl:gap-[0.781vw]">
          <LanguageToggle />
          <ThemeToggle />
        </div>
        <AvatarMobile />
      </div>
    </header>
  )
}

export default Header
