import ModalTrigger from "@/modules/personal-account/components/ModalTrigger"
import ChangeAvatar from "@/modules/personal-account/modals/ChangeAvatar"

import { useUserProfileQuery } from "@/redux/api/profile"

const AvatarMobile = () => {
  const { data: profileData } = useUserProfileQuery()

  if (!profileData) return null

  const { avatars } = profileData

  const activeAvatar = avatars.find((avatar) => avatar.isActive)

  return (
    <ModalTrigger content={<ChangeAvatar />}>
      <div className="w-8 h-8 rounded-full border-2 border-gray-1 flex items-center justify-center">
        {activeAvatar && (
          <img
            src={activeAvatar?.file}
            alt="User Avatar"
            className="w-full h-full object-cover rounded-full"
          />
        )}
      </div>
    </ModalTrigger>
  )
}

export default AvatarMobile
