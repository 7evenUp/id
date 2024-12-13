import { useTranslation } from "react-i18next"

import { useCheckRetrodropQuery } from "@/redux/api/nutsfarm"
import { useUserProfileQuery } from "@/redux/api/profile"

import "./styles.css"

const Retrodrop = () => {
  const { t } = useTranslation()

  const { data: profile, isLoading } = useUserProfileQuery()

  const { isSuccess } = useCheckRetrodropQuery(
    { telegramId: profile?.telegramId || -1 },
    { skip: isLoading || !profile || profile.telegramId === null }
  )

  if (isSuccess)
    return (
      <a
        className="relative text-[#222222] px-2.5 py-2 rounded-lg bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#FEEA1C] to-[#FACD09] font-semibold text-xs overflow-hidden max-sm:px-1.5 max-sm:py-1 max-sm:rounded-md max-sm:text-[10px] text-center"
        href="https://t.me/nutsfarm_bot/nutscoin"
        target="_blank"
      >
        <div className="animated absolute -left-[100px] h-full top-0 w-3 -translate-x-full blur-sm bg-[#FFFCE9] skew-x-[30deg]" />
        {t("Забрать $NUTS Airdrop")}
      </a>
    )

  return null
}

export default Retrodrop
