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

          <Text0>
            Crypton Points — это программа лояльности внутри экосистемы Crypton.
            Получайте кэшбэк от 5% до 20% в Crypton Points с каждой оплаты любой
            подписки.
          </Text0>
          <Text0>
            Функционал использования Crypton Points находится в разработке,
            следите за обновлениями в{" "}
            {language === "ru" ? (
              <>
                канале{" "}
                <a
                  href="https://t.me/cryptonannouncement"
                  target="_blank"
                  className="underline underline-offset-4 text-res-bot-blue hover:opacity-70 transition-opacity"
                >
                  анонсов
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
          <Text0>Базовый кэшбэк 5%.</Text0>

          <DialogTitle>Как увеличить кэшбэк?</DialogTitle>

          <Text0>
            Для владельцев нашей NFT коллекции{" "}
            <a
              href="https://getgems.io/nutcrackers"
              target="_blank"
              className="underline underline-offset-4 text-res-bot-blue hover:opacity-70 transition-opacity"
            >
              Nutcrackers
            </a>{" "}
            на TON, действует система повышенного кэшбэка от 10% до 20%. Размер
            кэшбэка зависит от степени редкости вашего NFT.
          </Text0>
          <Text0>
            Для получения повышенного кэшбэка обязательно привяжите TON кошелек
            в ЛК Crypton ID.
          </Text0>
          <Text0>Расчет кэшбэка берется с NFT самой высокой редкости.</Text0>
          <Text0>Бонусы не суммируются.</Text0>
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
    cashback: "10%",
    href: "https://getgems.io/nutcrackers?filter=%7B%22attributes%22%3A%7B%22Rarity%22%3A%5B%22Common%22%5D%7D%7D",
  },
  {
    rarity: "uncommon",
    cashback: "12%",
    href: "https://getgems.io/nutcrackers?filter=%7B%22attributes%22%3A%7B%22Rarity%22%3A%5B%22Uncommon%22%5D%7D%7D",
  },
  {
    rarity: "rare",
    cashback: "14%",
    href: "https://getgems.io/nutcrackers?filter=%7B%22attributes%22%3A%7B%22Rarity%22%3A%5B%22Rare%22%5D%7D%7D",
  },
  {
    rarity: "mythical",
    cashback: "16%",
    href: "https://getgems.io/nutcrackers?filter=%7B%22attributes%22%3A%7B%22Rarity%22%3A%5B%22Mythical%22%5D%7D%7D",
  },
  {
    rarity: "epic",
    cashback: "18%",
    href: "https://getgems.io/nutcrackers?filter=%7B%22attributes%22%3A%7B%22Rarity%22%3A%5B%22Epic%22%5D%7D%7D",
  },
  {
    rarity: "legendary",
    cashback: "20%",
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
              "flex items-center justify-between py-1 capitalize hover:underline underline-offset-4",
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
