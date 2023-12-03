import { useTranslation } from "react-i18next"

import MoveRight from "@/assets/icons/move-right.svg?react"

import Subheading from "@/shared/typography/Subheading"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const TabTitle = ({ title, link }: { title: string; link: string }) => {
  const { t } = useTranslation("products")

  const scale = useAppSelector((state) => state.scale.value)

  return (
    <div className={cn("flex gap-5", scale && "3xl:gap-[1.302vw]")}>
      <Subheading>{title}</Subheading>
      <a
        className={cn(
          "typography-btn-big dark:text-gray-5 flex items-center shrink-0 gap-2 hover:text-gray-3 dark:hover:text-gray-3",
          scale && "typography-btn-big_large 3xl:gap-[0.521vw]"
        )}
        href={link}
        target="_blank"
      >
        <MoveRight
          className={cn(
            "w-3.5 h-3.5",
            scale && "3xl:w-[0.911vw] 3xl:h-[0.911vw]"
          )}
        />
        {t("website")}
      </a>
    </div>
  )
}

export default TabTitle
