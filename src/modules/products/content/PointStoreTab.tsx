import { useTranslation } from "react-i18next"

import CryptonIcon from "@/assets/icons/crypton-logo.svg?react"

import Subheading from "@/shared/typography/Subheading"
import Text0 from "@/shared/typography/Text0"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const PointStoreTab = () => {
  const { t } = useTranslation("products")

  const scale = useAppSelector((state) => state.scale.value)

  return (
    <div
      className={cn("typography-text-0", scale && "typography-text-0_large")}
    >
      <div className="border-b border-gray-4 dark:border-gray-1" />

      <div
        className={cn(
          "flex items-center gap-2 mt-5 pb-4",
          scale && "3xl:gap-[0.52vw] 3xl:mt-[1.302vw] 3xl:pb-[1.042vw]"
        )}
      >
        <Subheading>{t("points-store.title")}</Subheading>
        <CryptonIcon
          className={cn(
            "w-6 h-6",
            scale && "3xl:w-[1.5625vw] 3xl:h-[1.5625vw]"
          )}
        />
      </div>

      <Text0 className={cn("py-2", scale && "3xl:py-[0.52vw]")}>
        {t("points-store.disabled")}
      </Text0>
    </div>
  )
}

export default PointStoreTab
