import { useState } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { useTranslation } from "react-i18next"

import { IoCloseOutline } from "react-icons/io5"

import { ReactComponent as BearIcon } from "@/assets/icons/avatars/Star.svg"

import UploadDropzone from "../components/UploadDropzone"
import PrevAvatars from "../components/PrevAvatars"
import ModalTrigger from "../components/ModalTrigger"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"

import { cn } from "@/lib/classNames"

import { useChangeAvatarMutation } from "@/redux/api/avatar"
import { useUserProfileQuery } from "@/redux/api/profile"

const ChangeAvatar = () => {
  const { t } = useTranslation("modals")

  const [file, setFile] = useState<File | null>(null)
  const [base64, setBase64] = useState("")

  const { data } = useUserProfileQuery()
  const [trigger, { isSuccess, isLoading, isError }] = useChangeAvatarMutation()

  const { id, avatars } = data!

  const activeAvatar = avatars.find((avatar) => avatar.isActive)
  const prevAvatars = avatars.filter((avatar) => !avatar.isActive)

  if (isError) console.log("ERROR!!!")

  const onSubmit = () => {
    trigger({ file_base64: base64, is_active: true, user: id })
    setFile(null)
  }

  return (
    <DialogContent className="sm:w-[85%] md:w-[640px]">
      <DialogHeader className="flex-col mobile:flex-row mobile:items-center mb-4 mobile:mb-6 gap-2">
        <DialogTitle>{t("change-avatar.heading")}</DialogTitle>
        <Button
          disabled={!file}
          onClick={onSubmit}
          appearence={isSuccess && !file ? "success" : "outlined"}
          className="w-fit hidden mobile:flex"
          isLoading={isLoading}
        >
          {isSuccess && !file
            ? t("change-avatar.save-success")
            : t("change-avatar.save-button")}
        </Button>
      </DialogHeader>
      <div className="flex flex-col">
        <div className="flex gap-8">
          <div
            className={cn(
              "shrink-0 w-[60px] h-[60px] flex items-center justify-center rounded-lg",
              !activeAvatar && "bg-res-bot-blue"
            )}
          >
            <ModalTrigger
              content={
                <DialogContent
                  className="p-0 sm:p-0"
                  customClose={<CustomDialogClose />}
                >
                  <img
                    src={base64 ? base64 : activeAvatar?.file}
                    alt="previous avatar"
                    className="rounded-xl w-full sm:max-w-[550px] md:max-w-[640px] max-h-[500px] object-cover"
                  />
                </DialogContent>
              }
            >
              {activeAvatar ? (
                <img
                  src={base64 ? base64 : activeAvatar?.file}
                  alt="User Avatar"
                  className="w-full h-full object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform will-change-transform"
                />
              ) : (
                <BearIcon className="w-10" />
              )}
            </ModalTrigger>
          </div>
          <UploadDropzone file={file} setFile={setFile} setBase64={setBase64} />
        </div>

        {Boolean(prevAvatars.length) ? (
          <PrevAvatars
            SaveBtn={
              <Button
                disabled={!file}
                onClick={onSubmit}
                appearence={isSuccess && !file ? "success" : "outlined"}
                className="w-fit flex mobile:hidden"
                isLoading={isLoading}
              >
                {isSuccess && !file
                  ? t("change-avatar.save-success")
                  : t("change-avatar.save-button")}
              </Button>
            }
            avatars={prevAvatars}
          />
        ) : (
          <Button
            disabled={!file}
            onClick={onSubmit}
            appearence={isSuccess && !file ? "success" : "outlined"}
            className="w-fit flex mobile:hidden mt-6 ml-auto"
            isLoading={isLoading}
          >
            {isSuccess && !file
              ? t("change-avatar.save-success")
              : t("change-avatar.save-button")}
          </Button>
        )}

        <span className="typography-semi-head mt-6">
          {t("change-avatar.choose-nft")}
        </span>
        <p className="typography-text-1 mt-2">
          {t("change-avatar.nft-description")}
        </p>
      </div>
    </DialogContent>
  )
}

export default ChangeAvatar

const CustomDialogClose = () => (
  <DialogPrimitive.Close className="absolute border bg-white dark:bg-gray-1 border-gray-1 dark:border-white dark:text-white right-2 top-2 sm:right-0 sm:top-0 sm:translate-x-9 rounded-full opacity-100 transition-opacity hover:opacity-80">
    <IoCloseOutline className="h-[26px] w-[26px]" />
  </DialogPrimitive.Close>
)
