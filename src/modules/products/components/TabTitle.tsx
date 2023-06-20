import { useTranslation } from "react-i18next"

import { ReactComponent as MoveRight } from "@/assets/icons/move-right.svg"

import Subheading from "@/shared/typography/Subheading"

const TabTitle = ({ title, link }: { title: string; link: string }) => {
  const { t } = useTranslation("products")

  return (
    <div className="flex gap-5">
      <Subheading>{title}</Subheading>
      <a
        className="typography-btn-big dark:text-gray-5 flex items-center gap-2 hover:text-gray-3 dark:hover:text-gray-3"
        href={link}
        target="_blank"
      >
        <MoveRight className="w-3.5 h-3.5" />
        {t("website")}
      </a>
    </div>
  )
}

export default TabTitle
