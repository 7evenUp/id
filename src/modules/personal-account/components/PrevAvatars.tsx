import * as DialogPrimitive from "@radix-ui/react-dialog"
import { useTranslation } from "react-i18next"

import Close from "@/assets/icons/close.svg?react"

import { DialogContent, Dialog, DialogTrigger } from "@/shared/ui/Dialog"

import Text1 from "@/shared/typography/Text1"

import { Avatar } from "@/types/user"

import { useAppSelector } from "@/redux/hooks"
import {
  useActivatePreviousMutation,
  useDeleteAvatarMutation,
} from "@/redux/api/avatar"

import { cn } from "@/lib/classNames"
import Button from "@/shared/ui/Button"
import { useState } from "react"

const PrevAvatars = ({
  avatars,
  SaveBtn,
  resetBase64State,
}: {
  avatars: Avatar[]
  SaveBtn: React.ReactNode
  resetBase64State: () => void
}) => {
  const { t } = useTranslation("modals")

  const scale = useAppSelector((state) => state.scale.value)

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row gap-2 sm:gap-4 mt-6",
        scale && "3xl:gap-[1.042vw] 3xl:mt-[1.563vw]"
      )}
    >
      <div className="flex justify-between items-center">
        <Text1 className={cn("w-[75px]", scale && "3xl:w-[4.882vw]")}>
          {t("change-avatar.prev-images")}
        </Text1>
        {SaveBtn}
      </div>
      <div
        className={cn(
          "flex items-center flex-wrap gap-2",
          scale && "3xl:gap-[0.521vw]"
        )}
      >
        {avatars.map((avatar, i) => (
          <PrevAvatarDialog
            key={i}
            {...avatar}
            resetBase64State={resetBase64State}
          />
        ))}
      </div>
    </div>
  )
}

export default PrevAvatars

const PrevAvatarDialog = ({
  id,
  file,
  resetBase64State,
}: Avatar & { resetBase64State: () => void }) => {
  const { t } = useTranslation("modals")

  const [dialogOpen, setDialogOpen] = useState(false)

  const scale = useAppSelector((state) => state.scale.value)

  const [activatePrevious, { isLoading: isActivateLoading }] =
    useActivatePreviousMutation()
  const [deleteAvatar, { isLoading: isDeleteLoading }] =
    useDeleteAvatarMutation()

  const onActivateClick = async (avatarId: number) => {
    await activatePrevious({ avatar_id: avatarId }).unwrap()
    setDialogOpen(false)
    resetBase64State()
  }

  const onDeleteClick = async (avatarId: number) => {
    await deleteAvatar({ avatar_id: avatarId }).unwrap()
    setDialogOpen(false)
    resetBase64State()
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <img
          className={cn(
            "w-[60px] h-[60px] rounded-lg object-cover cursor-pointer hover:scale-105 transition-transform will-change-transform",
            scale && "3xl:w-[3.906vw] 3xl:h-[3.906vw] 3xl:rounded-[0.521vw]"
          )}
          src={file}
          alt="previous avatar"
        />
      </DialogTrigger>
      <DialogContent
        className="p-0 sm:p-0 rounded-none border-none bg-transparent dark:bg-transparent shadow-none"
        customClose={<CustomDialogClose />}
      >
        <img
          src={file}
          alt="previous avatar"
          className={cn(
            "rounded-xl w-full min-w-[150px] sm:max-w-[550px] md:max-w-[640px] max-h-[500px] object-cover",
            scale &&
              "3xl:rounded-[0.781vw] 3xl:max-w-[41.666vw] 3xl:max-h-[32.552vw]"
          )}
        />
        <div className="flex flex-col mobile:flex-row justify-end items-end mobile:items-center gap-3">
          <Button
            onClick={() => onActivateClick(id)}
            isLoading={isActivateLoading}
          >
            {t("change-avatar.activate-btn")}
          </Button>
          <Button onClick={() => onDeleteClick(id)} isLoading={isDeleteLoading}>
            {t("change-avatar.delete-btn")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const CustomDialogClose = () => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <DialogPrimitive.Close
      className={cn(
        "absolute border bg-white dark:bg-gray-1 border-gray-1 dark:border-white dark:text-white right-2 top-2 sm:right-0 sm:top-0 sm:translate-x-9 rounded-full opacity-100 hover:opacity-80 p-0.5",
        scale &&
          "3xl:right-[1.302vw] 3xl:top-[1.302vw] 3xl:translate-x-[2.344vw] 3xl:p-[0.13vw]"
      )}
    >
      <Close
        className={cn("w-5 h-5", scale && "3xl:w-[1.302vw] 3xl:h-[1.302vw]")}
      />
    </DialogPrimitive.Close>
  )
}
