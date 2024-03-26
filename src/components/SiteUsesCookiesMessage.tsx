import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import ArrowRight from "@/assets/icons/move-right.svg?react"

import Text0 from "@/shared/typography/Text0"
import TextAccent from "@/shared/typography/TextAccent"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setHasShown } from "@/redux/cookie/slice"

import { cn } from "@/lib/classNames"

const SiteUsesCookiesMessage = () => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <div
      className={cn(
        "fixed mobile:w-[280px] xl:w-[320px] bottom-4 left-4 mobile:left-auto right-4 flex flex-col gap-3 bg-black/70 dark:bg-gray-1/70 text-white backdrop-blur-sm p-5 rounded-2xl animate-in slide-in-from-bottom-20 fade-in-20 duration-500 transition-colors",
        scale &&
          "3xl:w-[20.83vw] 3xl:bottom-[1.041vw] 3xl:right-[1.041vw] 3xl:gap-[0.78125vw] 3xl:p-[1.302vw] 3xl:rounded-[1.041vw]"
      )}
    >
      <div
        className={cn("flex items-center gap-2", scale && "3xl:gap-[0.52vw]")}
      >
        <Text0>{t("we-use-cookie")}</Text0>
        <Link to="/privacy-policy" onClick={() => dispatch(setHasShown())}>
          <ArrowRight
            className={cn(
              "w-4 h-4",
              scale && "3xl:w-[1.041vw] 3xl:h-[1.041vw]"
            )}
          />
        </Link>
      </div>
      <button
        className={cn(
          "border border-white rounded-lg transition-colors hover:bg-white hover:text-black active:bg-white/80",
          scale && "3xl:rounded-[0.52vw] 3xl:py-[0.13vw]"
        )}
        onClick={() => dispatch(setHasShown())}
      >
        <TextAccent>Ok</TextAccent>
      </button>
    </div>
  )
}

export default SiteUsesCookiesMessage
