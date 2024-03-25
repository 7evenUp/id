import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import Subheading from "@/shared/typography/Subheading"
import TextAccent from "@/shared/typography/TextAccent"
import Text0 from "@/shared/typography/Text0"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const PrivacyPolicy = () => {
  const { t } = useTranslation()

  const scale = useAppSelector((state) => state.scale.value)

  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center gap-6",
        scale && "3xl:gap-[1.5625vw]"
      )}
    >
      <Subheading>{t("privacy-user-agreement")}</Subheading>

      <div
        className={cn(
          "flex flex-col gap-3 max-w-[700px]",
          scale && "3xl:gap-[0.78125vw] 3xl:max-w-[45vw]"
        )}
      >
        <Text0>{t("privacy-1")}</Text0>
        <Text0>{t("privacy-2")}</Text0>
        <Text0>{t("privacy-3")}</Text0>
        <Text0>{t("privacy-4")}</Text0>
        <Text0>{t("privacy-5")}</Text0>
        <Text0>{t("privacy-6")}</Text0>
        <Text0>{t("privacy-7")}</Text0>
        <Text0>{t("privacy-8")}</Text0>
        <Text0>{t("privacy-9")}</Text0>
        <Text0>{t("privacy-10")}</Text0>
        <Text0>{t("privacy-11")}</Text0>
        <Text0>{t("privacy-12")}</Text0>

        <div className="flex flex-col">
          <TextAccent>{t("privacy-13")}</TextAccent>
          <a
            href="mailto:help@crypton.xyz"
            className="w-fit underline-offset-4 hover:underline hover:opacity-80"
          >
            help@crypton.xyz
          </a>
        </div>
      </div>

      <Link to={"/"} className="underline underline-offset-4 hover:opacity-80">
        <Text0>{t("payment-page-go-to-main")}</Text0>
      </Link>
    </div>
  )
}

export default PrivacyPolicy
