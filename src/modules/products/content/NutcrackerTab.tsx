import { useTranslation } from "react-i18next"

import TabHeader from "../components/TabHeader"
import TabTitle from "../components/TabTitle"

import ExternalLink from "@/shared/ui/ExternalLink"
import { Skeleton } from "@/shared/ui/Skeleton"

import RowItem from "@/shared/components/RowItem"

import Text1 from "@/shared/typography/Text1"

import { useAppSelector } from "@/redux/hooks"
import { useNutcrackersQuery } from "@/redux/api/profile"

import { cn } from "@/lib/classNames"

const NutcrackerTab = () => {
  const { t } = useTranslation("products")

  const scale = useAppSelector((state) => state.scale.value)

  const { data, isLoading } = useNutcrackersQuery()

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
          {t("nutcracker.mint-website")}
        </ExternalLink>
        <ExternalLink href="https://getgems.io/nutcrackers" className="w-fit">
          {t("nutcracker.buy-on-getgems")}
        </ExternalLink>
      </RowItem>

      <RowItem
        className={cn(
          "flex-col items-stretch gap-3",
          scale && "3xl:gap-[0.781vw]"
        )}
      >
        {t("nutcracker.your-nutcrackers")}
        {isLoading ? (
          <div
            className={cn("flex gap-4 flex-wrap", scale && "3xl:gap-[1.041vw]")}
          >
            <Skeleton
              className={cn(
                "w-[160px] aspect-square rounded-xl",
                scale && "3xl:w-[10.416vw]"
              )}
            />
            <Skeleton
              className={cn(
                "w-[160px] aspect-square rounded-xl",
                scale && "3xl:w-[10.416vw]"
              )}
            />
            <Skeleton
              className={cn(
                "w-[160px] aspect-square rounded-xl",
                scale && "3xl:w-[10.416vw]"
              )}
            />
            <Skeleton
              className={cn(
                "w-[160px] aspect-square rounded-xl",
                scale && "3xl:w-[10.416vw]"
              )}
            />
          </div>
        ) : data ? (
          data.nutcrackers.length === 0 ? (
            <Text1>{t("nutcracker.you-have-not-nutcrackers")}</Text1>
          ) : (
            <div
              className={cn(
                "flex gap-4 flex-wrap",
                scale && "3xl:gap-[1.041vw]"
              )}
            >
              {data.nutcrackers.map(({ imageLink, name, getGemsLink }, i) => (
                <a
                  key={i}
                  href={getGemsLink}
                  target="_blank"
                  className={cn(
                    "max-w-[160px] rounded-xl",
                    scale && "3xl:max-w-[10.416vw] 3xl:rounded-[0.78125vw]"
                  )}
                >
                  <img
                    src={imageLink}
                    alt={name}
                    className={cn(
                      "rounded-xl",
                      scale && "3xl:rounded-[0.78125vw]"
                    )}
                  />
                </a>
              ))}
            </div>
          )
        ) : (
          <Text1>{t("nutcracker.load-error")}</Text1>
        )}
      </RowItem>
    </>
  )
}

export default NutcrackerTab
