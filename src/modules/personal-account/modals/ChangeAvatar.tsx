import { useState } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { useTranslation } from "react-i18next"

import { ReactComponent as Close } from "@/assets/icons/close.svg"

import UploadDropzone from "../components/UploadDropzone"
import PrevAvatars from "../components/PrevAvatars"
import ModalTrigger from "../components/ModalTrigger"
import UploadButton from "../components/UploadButton"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"

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
    <DialogContent className="sm:w-[85%] md:w-[640px] 2xl:w-[41.666vw]">
      <DialogHeader className="flex-col mobile:flex-row mobile:items-center mb-4 mobile:mb-6 2xl:mb-[1.563vw] gap-2 2xl:gap-[0.521vw]">
        <DialogTitle>{t("change-avatar.heading")}</DialogTitle>
        <UploadButton
          className="hidden sm:flex"
          file={file}
          isLoading={isLoading}
          isSuccess={isSuccess}
          onClick={onSubmit}
        />
      </DialogHeader>
      <div className="flex flex-col">
        <div className="flex gap-8 2xl:gap-[2.083vw]">
          <div
            className={cn(
              "shrink-0 w-[60px] h-[60px] 2xl:w-[3.906vw] 2xl:h-[3.906vw] flex items-center justify-center rounded-lg 2xl:rounded-[0.521vw]",
              !activeAvatar && "bg-res-bot-blue"
            )}
          >
            <ModalTrigger
              content={
                <DialogContent
                  className="p-0 sm:p-0 rounded-none border-none bg-transparent dark:bg-transparent shadow-none"
                  customClose={<CustomDialogClose />}
                >
                  <img
                    src={base64 ? base64 : activeAvatar?.file}
                    alt="previous avatar"
                    className="rounded-xl 2xl:rounded-[0.781vw] w-full min-w-[150px] sm:max-w-[550px] md:max-w-[640px] 2xl:max-w-[41.666vw] max-h-[500px] 2xl:max-h-[32.552vw] object-cover"
                  />
                </DialogContent>
              }
            >
              {activeAvatar && (
                <img
                  src={base64 ? base64 : activeAvatar?.file}
                  alt="User Avatar"
                  className="w-full h-full object-cover rounded-lg 2xl:rounded-[0.521vw] cursor-pointer hover:scale-105 transition-transform will-change-transform"
                />
              )}
            </ModalTrigger>
          </div>
          <UploadDropzone file={file} setFile={setFile} setBase64={setBase64} />
        </div>

        {prevAvatars.length > 0 ? (
          <PrevAvatars
            avatars={prevAvatars}
            SaveBtn={
              <UploadButton
                className="flex sm:hidden"
                file={file}
                isLoading={isLoading}
                isSuccess={isSuccess}
                onClick={onSubmit}
              />
            }
          />
        ) : (
          <UploadButton
            className="flex sm:hidden mt-6 2xl:mt-[1.563vw] ml-auto"
            file={file}
            isLoading={isLoading}
            isSuccess={isSuccess}
            onClick={onSubmit}
          />
        )}

        <span className="typography-semi-head mt-6 2xl:mt-[1.563vw]">
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
  <DialogPrimitive.Close className="absolute border bg-white dark:bg-gray-1 border-gray-1 dark:border-white dark:text-white right-2 top-2 2xl:right-[1.302vw] 2xl:top-[1.302vw] sm:right-0 sm:top-0 sm:translate-x-9 2xl:translate-x-[2.344vw] rounded-full opacity-100 hover:opacity-80 p-0.5 2xl:p-[0.13vw]">
    <Close className="w-5 h-5 2xl:w-[1.302vw] 2xl:h-[1.302vw]" />
  </DialogPrimitive.Close>
)
