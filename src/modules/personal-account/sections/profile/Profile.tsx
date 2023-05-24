import Subheading from "@/shared/typography/Subheading"

import ProfileNickname from "./ProfileNickname"
import ProfileEmail from "./ProfileEmail"
import ProfileWallet from "./ProfileWallet"
import ProfileDiscord from "./ProfileDiscord"
import ProfileTelegram from "./ProfileTelegram"

const Profile = () => {
  return (
    <div>
      <Subheading className="mb-4">Профиль</Subheading>
      <div className="flex flex-col border-t border-gray-4 dark:border-gray-1">
        <ProfileNickname />
        <ProfileEmail />
        <ProfileWallet />
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center xl:gap-10">
          <ProfileDiscord />
          <ProfileTelegram />
        </div>
      </div>
    </div>
  )
}

export default Profile
