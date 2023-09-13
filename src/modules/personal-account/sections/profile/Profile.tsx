import { useTranslation } from "react-i18next"

import Subheading from "@/shared/typography/Subheading"

import ProfileNickname from "./ProfileNickname"
import ProfileEmail from "./ProfileEmail"
import ProfileWallet from "./ProfileWallet"
import ProfileWax from "./ProfileWax"
import ProfileDiscord from "./ProfileDiscord"
import ProfileTelegram from "./ProfileTelegram"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const Profile = () => {
  const { t } = useTranslation("profile")

  const scale = useAppSelector((state) => state.scale.value)

  return (
    <div>
      <Subheading className={cn("mb-4", scale && "3xl:mb-[1.042vw]")}>
        {t("profile.heading")}
      </Subheading>
      <div className="flex flex-col border-t border-gray-4 dark:border-gray-1">
        <ProfileNickname />
        <ProfileEmail />
        <ProfileWallet />
        <ProfileWax />
        <div
          className={cn(
            "flex flex-col xl:flex-row xl:justify-between xl:items-center xl:gap-10",
            scale && "3xl:gap-[2.604vw]"
          )}
        >
          <ProfileDiscord />
          <ProfileTelegram />
        </div>
      </div>
    </div>
  )
}

export default Profile
