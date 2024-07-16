import { useTranslation } from "react-i18next"

import { DialogContent, DialogTitle } from "@/shared/ui/Dialog"

import Text1 from "@/shared/typography/Text1"
import Text0 from "@/shared/typography/Text0"
import TextAccent from "@/shared/typography/TextAccent"

import { useUserProfileQuery } from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const PointsInfo = () => {
  const { t } = useTranslation("modals")

  const scale = useAppSelector((state) => state.scale.value)
  const language = useAppSelector((state) => state.language.value)

  const { data: profileData } = useUserProfileQuery()

  if (!profileData) return null

  return (
    <DialogContent
      className={cn(
        "sm:max-w-[550px] md:max-w-[680px] 2xl:max-w-[800px]",
        scale && "3xl:w-[44.27vw]"
      )}
      onCloseAutoFocus={(event) => event.preventDefault()}
    >
      <div
        className={cn(
          "flex flex-col md:flex-row justify-between items-center mobile:items-start md:items-stretch h-[400px] md:h-auto overflow-auto pr-2 gap-6",
          scale && "3xl:pr-[0.521vw] 3xl:gap-[1.563vw]"
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-2 basis-1/2",
            scale && "3xl:gap-[0.52vw]"
          )}
        >
          <DialogTitle>{t("points-info.heading")}</DialogTitle>

          <Text0>{t("points-info.text-1")}</Text0>
          <Text0>
            {t("points-info.text-2")}{" "}
            {language === "ru" ? (
              <>
                <a
                  href="https://t.me/cryptonannouncement"
                  target="_blank"
                  className="underline underline-offset-4 text-res-bot-blue hover:opacity-70 transition-opacity"
                >
                  канале анонсов
                </a>
              </>
            ) : (
              <a
                href="https://twitter.com/cryptonxyz"
                target="_blank"
                className="underline underline-offset-4 text-res-bot-blue hover:opacity-70 transition-opacity"
              >
                twitter
              </a>
            )}{" "}
            .
          </Text0>
          <Text0>{t("points-info.text-3")}</Text0>

          <DialogTitle>{t("points-info.part-2-heading")}</DialogTitle>

          <Text0>
            {t("points-info.part-2-text-1-1")}{" "}
            <a
              href="https://getgems.io/nutcrackers"
              target="_blank"
              className="underline underline-offset-4 text-res-bot-blue hover:opacity-70 transition-opacity"
            >
              Nutcrackers
            </a>{" "}
            {t("points-info.part-2-text-1-2")}
          </Text0>
          <Text0>{t("points-info.part-2-text-2")}</Text0>
          <Text0>{t("points-info.part-2-text-3")}</Text0>
          <Text0>{t("points-info.part-2-text-4")}</Text0>
        </div>
        <div
          className={cn(
            "w-full mobile:w-[210px] 2xl:w-[270px] flex flex-col gap-5",
            scale && "3xl:w-[13.671vw] 3xl:gap-[1.302vw]"
          )}
        >
          <TextAccent>{t("points-info.table-title")}</TextAccent>
          <RarityTable />
          <Text1>{t("points-info.base-cashback")}</Text1>
        </div>
      </div>
    </DialogContent>
  )
}

const rarityData = [
  {
    rarity: "common",
    cashback: "100%",
    href: "https://getgems.io/nutcrackers?filter=%7B%22attributes%22%3A%7B%22Rarity%22%3A%5B%22Common%22%5D%7D%7D",
  },
  {
    rarity: "uncommon",
    cashback: "120%",
    href: "https://getgems.io/nutcrackers?filter=%7B%22attributes%22%3A%7B%22Rarity%22%3A%5B%22Uncommon%22%5D%7D%7D",
  },
  {
    rarity: "rare",
    cashback: "140%",
    href: "https://getgems.io/nutcrackers?filter=%7B%22attributes%22%3A%7B%22Rarity%22%3A%5B%22Rare%22%5D%7D%7D",
  },
  {
    rarity: "mythical",
    cashback: "160%",
    href: "https://getgems.io/nutcrackers?filter=%7B%22attributes%22%3A%7B%22Rarity%22%3A%5B%22Mythical%22%5D%7D%7D",
  },
  {
    rarity: "epic",
    cashback: "180%",
    href: "https://getgems.io/nutcrackers?filter=%7B%22attributes%22%3A%7B%22Rarity%22%3A%5B%22Epic%22%5D%7D%7D",
  },
  {
    rarity: "legendary",
    cashback: "200%",
    href: "https://getgems.io/nutcrackers?filter=%7B%22attributes%22%3A%7B%22Rarity%22%3A%5B%22Legendary%22%5D%7D%7D",
  },
]

const RarityTable = () => {
  const { t } = useTranslation("modals")

  const scale = useAppSelector((state) => state.scale.value)

  const { data: profileData } = useUserProfileQuery()

  if (!profileData) return null

  return (
    <div
      className={cn(
        "text-gray-3 typography-text-2",
        scale && "typography-text-2_large"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between pb-3",
          scale && "3xl:pb-[0.781vw]"
        )}
      >
        <span>{t("points-info.rarity")}</span>
        <span>{t("points-info.cashback")}</span>
      </div>
      <div
        className={cn(
          "typography-accent divide-y divide-gray-4 dark:divide-gray-2",
          scale && "typography-accent_large"
        )}
      >
        {rarityData.map((el) => (
          <a
            href={el.href}
            target="_blank"
            key={el.rarity}
            className={cn(
              "flex items-center justify-between py-1 capitalize hover:underline",
              scale && "3xl:py-[0.26vw]",
              el.rarity === "uncommon"
                ? "text-tools-green"
                : el.rarity === "rare"
                ? "text-res-bot-blue"
                : el.rarity === "mythical"
                ? "text-prime-pink"
                : el.rarity === "epic"
                ? "text-university-velvet"
                : el.rarity === "legendary" && "text-academy-gold"
            )}
          >
            <span>{el.rarity}</span>
            <span>{el.cashback}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default PointsInfo
