import { useEffect } from "react"
import { useTranslation } from "react-i18next"

import { ReactComponent as TrashIcon } from "@/assets/icons/trash.svg"
import { ReactComponent as EditIcon } from "@/assets/icons/edit.svg"

import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover"
import { useToast } from "@/shared/ui/Toast/useToast"

import ChangeAvatar from "../modals/ChangeAvatar"

import ModalTrigger from "./ModalTrigger"

import { useUserProfileQuery } from "@/redux/api/profile"
import { useDeleteAvatarMutation } from "@/redux/api/avatar"

const Avatar = () => {
  const { t } = useTranslation()

  const { toast } = useToast()

  const { data: profileData } = useUserProfileQuery()
  const [deleteAvatar, { isSuccess, isError }] = useDeleteAvatarMutation()

  useEffect(() => {
    if (isSuccess) {
      toast({ variant: "success", description: t("photo-response-success") })
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      toast({ variant: "error", description: t("photo-response-error") })
    }
  }, [isError])

  const { avatars } = profileData!

  const activeAvatar = avatars.find((avatar) => avatar.isActive)

  const onDelete = () => {
    if (activeAvatar) deleteAvatar({ avatar_id: activeAvatar.id })
  }

  return (
    <Popover>
      <PopoverTrigger
        className="rounded-full overflow-hidden hover:scale-105 will-change-transform transition-transform"
        asChild
        role="button"
      >
        <div className="w-[87px] h-[87px] 2xl:w-[5.664vw] 2xl:h-[5.664vw] border-[3px] 2xl:border-[0.195vw] border-gray-1 rounded-full flex items-center justify-center cursor-pointer">
          {activeAvatar && (
            <img
              src={activeAvatar?.file}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-1 2xl:gap-[0.26vw] typography-text-0 font-montserrat">
        <ModalTrigger content={<ChangeAvatar />}>
          <button className="flex gap-2 2xl:gap-[0.521vw] items-center text-gray-1 dark:text-gray-6 px-2 2xl:px-[0.521vw] rounded-md 2xl:rounded-[0.391vw] cursor-pointer hover:bg-gray-5 hover:bg-opacity-50 dark:hover:bg-gray-2 active:bg-opacity-80 dark:active:bg-opacity-70 transition-colors">
            <EditIcon className="w-5 h-5 2xl:w-[1.302vw] 2xl:h-[1.302vw]" />
            <span className="py-1.5 2xl:py-[0.391vw]">
              {t("avatar-change")}
            </span>
          </button>
        </ModalTrigger>
        <button
          className="flex gap-2 2xl:gap-[0.521vw] items-center text-gray-1 dark:text-gray-6 px-2 2xl:px-[0.521vw] rounded-md 2xl:rounded-[0.391vw] cursor-pointer hover:bg-gray-5 hover:bg-opacity-50 dark:hover:bg-gray-2 active:bg-opacity-80 dark:active:bg-opacity-70 transition-colors"
          onClick={onDelete}
        >
          <TrashIcon className="w-5 h-5 2xl:w-[1.302vw] 2xl:h-[1.302vw] text-error" />{" "}
          <span className="py-1.5 2xl:py-[0.391vw]">{t("avatar-delete")}</span>
        </button>
      </PopoverContent>
    </Popover>
  )
}

export default Avatar
