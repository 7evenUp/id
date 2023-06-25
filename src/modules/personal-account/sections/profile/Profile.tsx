import { useTranslation } from "react-i18next"

import Subheading from "@/shared/typography/Subheading"

import ProfileNickname from "./ProfileNickname"
import ProfileEmail from "./ProfileEmail"
import ProfileWallet from "./ProfileWallet"
import ProfileDiscord from "./ProfileDiscord"
import ProfileTelegram from "./ProfileTelegram"

const Profile = () => {
  const { t } = useTranslation("profile")
  return (
    <div>
      <Subheading className="mb-4 2xl:mb-[1.042vw]">{t("profile.heading")}</Subheading>
      <div className="flex flex-col border-t border-gray-4 dark:border-gray-1">
        <ProfileNickname />
        <ProfileEmail />
        <ProfileWallet />
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center xl:gap-10 2xl:gap-[2.604vw]">
          <ProfileDiscord />
          <ProfileTelegram />
        </div>
      </div>
    </div>
  )
}

export default Profile
