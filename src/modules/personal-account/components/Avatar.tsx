import { useTranslation } from "react-i18next"

import { ReactComponent as TrashIcon } from "@/assets/icons/trash.svg"
import { ReactComponent as EditIcon } from "@/assets/icons/edit.svg"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/ui/HoverCard"

import ChangeAvatar from "../modals/ChangeAvatar"

import ModalTrigger from "./ModalTrigger"

import { useUserProfileQuery } from "@/redux/api/profile"

const Avatar = () => {
  const { t } = useTranslation()

  const { data: profileData } = useUserProfileQuery()

  const { avatars } = profileData!

  const activeAvatar = avatars.find((avatar) => avatar.isActive)

  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger
        className="rounded-full overflow-hidden hover:scale-105 will-change-transform transition-transform"
        asChild
        role="button"
      >
        <div className="w-[87px] h-[87px] border-[3px] border-gray-1 rounded-full flex items-center justify-center cursor-pointer">
          {activeAvatar && (
            <img
              src={activeAvatar?.file}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="flex flex-col gap-1 typography-text-0 font-montserrat">
        <ModalTrigger content={<ChangeAvatar />}>
          <button className="flex gap-2 items-center text-gray-1 dark:text-gray-6 px-2 rounded-md cursor-pointer hover:bg-gray-5 hover:bg-opacity-50 dark:hover:bg-gray-2 active:bg-opacity-80 dark:active:bg-opacity-70 transition-colors">
            <EditIcon className="w-5 h-5" />
            <span className="py-1.5">Изменить</span>
          </button>
        </ModalTrigger>
        <button className="flex gap-2 items-center text-gray-1 dark:text-gray-6 px-2 rounded-md cursor-pointer hover:bg-gray-5 hover:bg-opacity-50 dark:hover:bg-gray-2 active:bg-opacity-80 dark:active:bg-opacity-70 transition-colors">
          <TrashIcon className="w-5 h-5 text-error" />{" "}
          <span className="py-1.5">Удалить</span>
        </button>
      </HoverCardContent>
    </HoverCard>
  )
}

export default Avatar
