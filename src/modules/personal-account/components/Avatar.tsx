import { ReactComponent as BearIcon } from "@/assets/icons/avatars/Star.svg"

import ChangeAvatar from "../modals/ChangeAvatar"

import ModalTrigger from "./ModalTrigger"

import { useUserProfileQuery } from "@/redux/api/profile"

const Avatar = () => {
  const { data: profileData } = useUserProfileQuery()

  const { avatars } = profileData!

  const activeAvatar = avatars.find((avatar) => avatar.isActive)

  return (
    <ModalTrigger content={<ChangeAvatar />}>
      <div className="group relative w-[87px] h-[87px] border-[3px] border-gray-1 rounded-full flex items-center justify-center bg-res-bot-blue overflow-hidden cursor-pointer">
        {activeAvatar ? (
          <img
            src={activeAvatar?.file}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <BearIcon />
        )}

        <div className="absolute bottom-0 flex justify-center pt-1 w-full h-[30px] translate-y-[30px] group-hover:translate-y-0 will-change-transform transition-transform bg-white dark:bg-gray-2 text-gray-1 dark:text-gray-5">
          <span className="typography-text-2 select-none">Изменить</span>
        </div>
      </div>
    </ModalTrigger>
  )
}

export default Avatar
