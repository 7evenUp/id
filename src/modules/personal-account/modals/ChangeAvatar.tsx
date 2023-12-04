import { useState } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { useTranslation } from "react-i18next"

import Close from "@/assets/icons/close.svg?react"

import UploadDropzone from "../components/UploadDropzone"
import PrevAvatars from "../components/PrevAvatars"
import ModalTrigger from "../components/ModalTrigger"
import UploadButton from "../components/UploadButton"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"

// import Text1 from "@/shared/typography/Text1"

import { cn } from "@/lib/classNames"

import { useChangeAvatarMutation } from "@/redux/api/avatar"
import { useUserProfileQuery } from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

const ChangeAvatar = () => {
  const { t } = useTranslation("modals")

  const scale = useAppSelector((state) => state.scale.value)

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
    <DialogContent
      className={cn("sm:w-[85%] md:w-[640px]", scale && "3xl:w-[41.666vw]")}
    >
      <DialogHeader
        className={cn(
          "flex-col mobile:flex-row mobile:items-center mb-4 mobile:mb-6 gap-2",
          scale && "3xl:mb-[1.563vw] 3xl:gap-[0.521vw]"
        )}
      >
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
        <div className={cn("flex gap-8", scale && "3xl:gap-[2.083vw]")}>
          <div
            className={cn(
              "shrink-0 w-[60px] h-[60px] flex items-center justify-center rounded-lg",
              scale && "3xl:w-[3.906vw] 3xl:h-[3.906vw] 3xl:rounded-[0.521vw]",
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
                    className={cn(
                      "rounded-xl w-full min-w-[150px] sm:max-w-[550px] md:max-w-[640px] max-h-[500px] object-cover",
                      scale &&
                        "3xl:rounded-[0.781vw] 3xl:max-h-[32.552vw] 3xl:max-w-[41.666vw]"
                    )}
                  />
                </DialogContent>
              }
            >
              {activeAvatar && (
                <img
                  src={base64 ? base64 : activeAvatar?.file}
                  alt="User Avatar"
                  className={cn(
                    "w-full h-full object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform will-change-transform",
                    scale && "3xl:rounded-[0.521vw]"
                  )}
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
            className={cn(
              "flex sm:hidden mt-6 ml-auto",
              scale && "3xl:mt-[1.563vw]"
            )}
            file={file}
            isLoading={isLoading}
            isSuccess={isSuccess}
            onClick={onSubmit}
          />
        )}

        {/* <span
          className={cn(
            "typography-semi-head mt-6",
            scale && "typography-semi-head_large 3xl:mt-[1.563vw]"
          )}
        >
          {t("change-avatar.choose-nft")}
        </span>
        <Text1 className="mt-2">{t("change-avatar.nft-description")}</Text1> */}
      </div>
    </DialogContent>
  )
}

export default ChangeAvatar

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
