import { useTranslation } from "react-i18next"
import { toast } from "sonner"

import { ReactComponent as TrashIcon } from "@/assets/icons/trash.svg"
import { ReactComponent as EditIcon } from "@/assets/icons/edit.svg"
import { ReactComponent as LogoutIcon } from "@/assets/icons/logout.svg"
import { ReactComponent as DeactivateIcon } from "@/assets/icons/deactivate.svg"

import ModalTrigger from "@/modules/personal-account/components/ModalTrigger"
import ChangeAvatar from "@/modules/personal-account/modals/ChangeAvatar"
import Deactivation from "@/modules/personal-account/modals/Deactivation"

import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover"

import { useUserProfileQuery } from "@/redux/api/profile"
import { useLazyLogoutQuery } from "@/redux/api/auth"
import { useDeleteAvatarMutation } from "@/redux/api/avatar"

const AvatarMobile = () => {
  const { t } = useTranslation()

  const { data: profileData } = useUserProfileQuery()
  const [logout] = useLazyLogoutQuery()
  const [deleteAvatar] = useDeleteAvatarMutation()

  if (!profileData) return null

  const { avatars } = profileData

  const activeAvatar = avatars.find((avatar) => avatar.isActive)

  const onDelete = () => {
    if (activeAvatar) {
      toast.promise(deleteAvatar({ avatar_id: activeAvatar.id }), {
        loading: t("toast-loading"),
        success: t("photo-response-success"),
        error: t("photo-response-error"),
      })
    }
  }

  const onLogout = () => {
    logout()
    location.reload()
  }

  return (
    <Popover>
      <PopoverTrigger className="rounded-full">
        <div className="w-10 h-10 rounded-full border-2 border-gray-1 flex items-center justify-center">
          {activeAvatar && (
            <img
              src={activeAvatar?.file}
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-48 flex flex-col gap-1 typography-text-0 font-montserrat px-0 py-2"
      >
        <ModalTrigger content={<ChangeAvatar />}>
          <button className="flex gap-2 items-center text-gray-1 dark:text-gray-6 px-5 cursor-pointer hover:bg-gray-5 hover:bg-opacity-50 dark:hover:bg-gray-2 active:bg-opacity-80 dark:active:bg-opacity-70 transition-colors">
            <EditIcon className="w-5 h-5" />
            <span className="py-1.5">{t("avatar-mobile-change")}</span>
          </button>
        </ModalTrigger>
        <button
          className="flex gap-2 items-center text-gray-1 dark:text-gray-6 px-5 cursor-pointer hover:bg-gray-5 hover:bg-opacity-50 dark:hover:bg-gray-2 active:bg-opacity-80 dark:active:bg-opacity-70 transition-colors"
          onClick={onDelete}
        >
          <TrashIcon className="w-5 h-5" />{" "}
          <span className="py-1.5">{t("avatar-mobile-delete")}</span>
        </button>
        <div className="h-px bg-gray-5 dark:bg-gray-2" />
        <button
          className="flex gap-2 items-center text-gray-1 dark:text-gray-6 px-5 cursor-pointer hover:bg-gray-5 hover:bg-opacity-50 dark:hover:bg-gray-2 active:bg-opacity-80 dark:active:bg-opacity-70 transition-colors"
          onClick={onLogout}
        >
          <LogoutIcon className="w-5 h-5" />{" "}
          <span className="py-1.5">{t("mobile-logout")}</span>
        </button>
        <ModalTrigger content={<Deactivation />}>
          <button className="flex gap-2 items-center text-gray-1 dark:text-gray-6 px-5 cursor-pointer hover:bg-gray-5 hover:bg-opacity-50 dark:hover:bg-gray-2 active:bg-opacity-80 dark:active:bg-opacity-70 transition-colors">
            <DeactivateIcon className="w-5 h-5" />{" "}
            <span className="py-1.5">{t("mobile-deactivate")}</span>
          </button>
        </ModalTrigger>
      </PopoverContent>
    </Popover>
  )
}

export default AvatarMobile
