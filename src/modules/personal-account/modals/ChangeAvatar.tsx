import { useState } from "react"

import { ReactComponent as BearIcon } from "@/assets/icons/avatars/Star.svg"

import UploadDropzone from "../components/UploadDropzone"
import PrevAvatars from "../components/PrevAvatars"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"

import { cn } from "@/lib/classNames"

import { useChangeAvatarMutation } from "@/redux/api/avatar"
import { useUserProfileQuery } from "@/redux/api/profile"

const ChangeAvatar = () => {
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
        <DialogTitle>Установить аватар профиля</DialogTitle>
        <Button
          disabled={!file}
          onClick={onSubmit}
          appearence={isSuccess && !file ? "success" : "outlined"}
          className="w-fit"
          isLoading={isLoading}
        >
          {isSuccess && !file ? "сохранено" : "сохранить"}
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
            {activeAvatar ? (
              <img
                src={base64 ? base64 : activeAvatar?.file}
                alt="User Avatar"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <BearIcon className="w-10" />
            )}
          </div>
          <UploadDropzone file={file} setFile={setFile} setBase64={setBase64} />
        </div>

        {Boolean(prevAvatars.length) && <PrevAvatars avatars={prevAvatars} />}

        <span className="typography-semi-head mt-6">Выбрать NFT</span>
        <p className="typography-text-1 mt-2">
          Чтобы выбрать NFT-изображение, необходимо привязать Web 3.0 кошелёк.
        </p>
      </div>
    </DialogContent>
  )
}

export default ChangeAvatar
