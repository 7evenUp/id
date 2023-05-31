import { useTranslation } from "react-i18next"

import { HiOutlineArrowNarrowRight } from "react-icons/hi"

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
        <HiOutlineArrowNarrowRight />
        {t("website")}
      </a>
    </div>
  )
}

export default TabTitle
