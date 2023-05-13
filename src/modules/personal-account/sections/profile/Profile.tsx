import { useUserProfileQuery } from "@/redux/api/core"

import Subheading from "@/shared/typography/Subheading"

import ProfileNickname from "./ProfileNickname"
import ProfileEmail from "./ProfileEmail"
import ProfileWallet from "./ProfileWallet"
import ProfileDiscord from "./ProfileDiscord"
import ProfileTelegram from "./ProfileTelegram"

const Profile = () => {
  const { data: userProfile } = useUserProfileQuery()

  if (userProfile) {
    console.log("Fetched user data: ", userProfile)
  }

  return (
    <div>
      <Subheading className="mb-4">Профиль</Subheading>
      {userProfile && (
        <div className="flex flex-col border-t border-gray-4 dark:border-gray-1">
          <ProfileNickname {...userProfile} />
          <ProfileEmail {...userProfile} />
          <ProfileWallet {...userProfile} />
          <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center xl:gap-10">
            <ProfileDiscord {...userProfile} />
            <ProfileTelegram {...userProfile} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
