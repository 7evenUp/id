import { useTranslation } from "react-i18next"
import { toast } from "sonner"

import { ReactComponent as TrashIcon } from "@/assets/icons/trash.svg"
import { ReactComponent as EditIcon } from "@/assets/icons/edit.svg"

import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover"

import ChangeAvatar from "../modals/ChangeAvatar"

import ModalTrigger from "./ModalTrigger"

import { useUserProfileQuery } from "@/redux/api/profile"
import { useDeleteAvatarMutation } from "@/redux/api/avatar"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const Avatar = () => {
  const { t } = useTranslation()

  const scale = useAppSelector((state) => state.scale.value)

  const { data: profileData } = useUserProfileQuery()
  const [deleteAvatar] = useDeleteAvatarMutation()

  const { avatars } = profileData!

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

  return (
    <Popover>
      <PopoverTrigger
        className="rounded-full overflow-hidden hover:scale-105 will-change-transform transition-transform"
        asChild
        role="button"
      >
        <div
          className={cn(
            "w-[87px] h-[87px] border-[3px] border-gray-1 rounded-full flex items-center justify-center cursor-pointer",
            scale && "3xl:w-[5.664vw] 3xl:h-[5.664vw] 3xl:border-[0.195vw]"
          )}
        >
          {activeAvatar && (
            <img
              src={activeAvatar?.file}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "flex flex-col gap-1 typography-text-0 font-montserrat",
          scale && "typography-text-0_large 3xl:gap-[0.26vw]"
        )}
      >
        <ModalTrigger content={<ChangeAvatar />}>
          <button
            className={cn(
              "flex gap-2 items-center text-gray-1 dark:text-gray-6 px-2 rounded-md cursor-pointer hover:bg-gray-5 hover:bg-opacity-50 dark:hover:bg-gray-2 active:bg-opacity-80 dark:active:bg-opacity-70 transition-colors",
              scale &&
                "3xl:gap-[0.521vw] 3xl:px-[0.521vw] 3xl:rounded-[0.391vw]"
            )}
          >
            <EditIcon
              className={cn(
                "w-5 h-5",
                scale && "3xl:w-[1.302vw] 3xl:h-[1.302vw]"
              )}
            />
            <span className={cn("py-1.5", scale && "3xl:py-[0.391vw]")}>
              {t("avatar-change")}
            </span>
          </button>
        </ModalTrigger>
        <button
          className={cn(
            "flex gap-2 items-center text-gray-1 dark:text-gray-6 px-2 rounded-md cursor-pointer hover:bg-gray-5 hover:bg-opacity-50 dark:hover:bg-gray-2 active:bg-opacity-80 dark:active:bg-opacity-70 transition-colors",
            scale && "3xl:gap-[0.521vw] 3xl:px-[0.521vw] 3xl:rounded-[0.391vw]"
          )}
          onClick={onDelete}
        >
          <TrashIcon
            className={cn(
              "w-5 h-5 text-error",
              scale && "3xl:w-[1.302vw] 3xl:h-[1.302vw]"
            )}
          />{" "}
          <span className={cn("py-1.5", scale && "3xl:py-[0.391vw]")}>
            {t("avatar-delete")}
          </span>
        </button>
      </PopoverContent>
    </Popover>
  )
}

export default Avatar
