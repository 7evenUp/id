import * as DialogPrimitive from "@radix-ui/react-dialog"
import { useTranslation } from "react-i18next"

import { IoCloseOutline } from "react-icons/io5"

import { DialogContent } from "@/shared/ui/Dialog"

import ModalTrigger from "./ModalTrigger"

import { Avatar } from "@/types/user"

const PrevAvatars = ({
  avatars,
  SaveBtn,
}: {
  avatars: Avatar[]
  SaveBtn: React.ReactNode
}) => {
  const { t } = useTranslation("modals")
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-6">
      <div className="flex justify-between items-center">
        <span className="typography-text-1 w-[75px]">
          {t("change-avatar.prev-images")}
        </span>
        {SaveBtn}
      </div>
      <div className="flex items-center flex-wrap gap-2">
        {avatars.map((avatar, i) => (
          <ModalTrigger
            key={i}
            content={
              <DialogContent
                className="p-0 sm:p-0 rounded-none border-none bg-transparent dark:bg-transparent shadow-none"
                customClose={<CustomDialogClose />}
              >
                <img
                  src={avatar.file}
                  alt="previous avatar"
                  className="rounded-xl w-full min-w-[150px] sm:max-w-[550px] md:max-w-[640px] max-h-[500px] object-cover"
                />
              </DialogContent>
            }
          >
            <img
              className="w-[60px] h-[60px] rounded-lg object-cover cursor-pointer hover:scale-105 transition-transform will-change-transform"
              src={avatar.file}
              alt="previous avatar"
            />
          </ModalTrigger>
        ))}
      </div>
    </div>
  )
}

export default PrevAvatars

const CustomDialogClose = () => (
  <DialogPrimitive.Close className="absolute border bg-white dark:bg-gray-1 border-gray-1 dark:border-white dark:text-white right-2 top-2 sm:right-0 sm:top-0 sm:translate-x-9 rounded-full opacity-100 transition-opacity hover:opacity-80">
    <IoCloseOutline className="h-[26px] w-[26px]" />
  </DialogPrimitive.Close>
)
