import { useTranslation } from "react-i18next"

import TabHeader from "../components/TabHeader"
import TabTitle from "../components/TabTitle"

import Subheading from "@/shared/typography/Subheading"
import ExternalLink from "@/shared/ui/ExternalLink"
import RowItem from "@/shared/components/RowItem"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const NutcrackerTab = () => {
  const { t } = useTranslation("products")

  const scale = useAppSelector((state) => state.scale.value)

  return (
    <>
      <TabHeader>
        <TabTitle
          title={t("nutcracker.title")}
          link="https://getgems.io/nutcrackers"
        />
      </TabHeader>

      <RowItem
        className={cn(
          "flex flex-col items-start gap-2",
          scale && "3xl:gap-[0.52vw]"
        )}
      >
        <ExternalLink
          href="https://nutcrackers-mint.crypton.xyz/"
          className="w-fit"
        >
          Сайт минта
        </ExternalLink>
        <ExternalLink href="https://getgems.io/nutcrackers" className="w-fit">
          Приобрести на GetGems
        </ExternalLink>
      </RowItem>

      <Subheading className={cn("mt-4", scale && "3xl:mt-[1vw]")}>
        Coming soon
      </Subheading>
    </>
  )
}

export default NutcrackerTab
