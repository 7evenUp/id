import { useTranslation } from "react-i18next"

import Text0 from "@/shared/typography/Text0"
import Text1 from "@/shared/typography/Text1"

import { DialogTitle } from "@/shared/ui/Dialog"

import { useAppSelector } from "@/redux/hooks"

const CryptonPointsInfo = ({ small }: { small?: boolean }) => {
  const { t } = useTranslation("modals")

  const language = useAppSelector((state) => state.language.value)

  if (small)
    return (
      <>
        <DialogTitle>{t("points-info.heading")}</DialogTitle>

        <Text1>{t("points-info.text-1")}</Text1>
        <Text1>
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
        </Text1>
        <Text1>{t("points-info.text-3")}</Text1>

        <DialogTitle>{t("points-info.part-2-heading")}</DialogTitle>

        <Text1>
          {t("points-info.part-2-text-1-1")}{" "}
          <a
            href="https://getgems.io/nutcrackers"
            target="_blank"
            className="underline underline-offset-4 text-res-bot-blue hover:opacity-70 transition-opacity"
          >
            Nutcrackers
          </a>{" "}
          {t("points-info.part-2-text-1-2")}
        </Text1>
        <Text1>{t("points-info.part-2-text-2")}</Text1>
        <Text1>{t("points-info.part-2-text-3")}</Text1>
        <Text1>{t("points-info.part-2-text-4")}</Text1>
      </>
    )

  return (
    <>
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
    </>
  )
}

export default CryptonPointsInfo
