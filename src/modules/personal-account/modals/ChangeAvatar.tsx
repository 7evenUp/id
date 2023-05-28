import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"

import { ReactComponent as BearIcon } from "@/assets/icons/avatars/Star.svg"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"

import Button from "@/shared/ui/Button"

import { cn } from "@/lib/classNames"

import { useChangeAvatarMutation } from "@/redux/api/avatar"
import { useUserProfileQuery } from "@/redux/api/profile"

const ChangeAvatar = () => {
  const [file, setFile] = useState<File>()
  const [base64, setBase64] = useState("")

  const { data } = useUserProfileQuery()
  const [trigger, { isSuccess, isError }] = useChangeAvatarMutation()

  const { id, avatars } = data!

  const activeAvatar = avatars.find((avatar) => avatar.isActive)

  if (isSuccess) console.log("SUCCESS!!!")

  if (isError) console.log("ERROR!!!")

  const onSubmit = () => {
    trigger({ file_base64: base64, is_active: true, user: id })
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      setFile(file)
      console.log(file)
      const reader = new FileReader()

      reader.onabort = () => console.log("file reading was aborted")
      reader.onerror = () => console.log("file reading has failed")
      reader.onload = () => {
        const base64file = reader.result as string
        setBase64(base64file)
      }
      reader.readAsDataURL(file)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  })

  return (
    <DialogContent className="sm:w-[704px]">
      <DialogHeader className="flex-col mobile:flex-row mobile:items-center mb-4 mobile:mb-6 gap-2">
        <DialogTitle>Установить аватар профиля</DialogTitle>
        <Button disabled={!file} onClick={onSubmit}>
          сохранить изменения
        </Button>
      </DialogHeader>
      <div className="flex flex-col">
        <div className="flex gap-8">
          <div className="shrink-0 w-[60px] h-[60px] flex items-center justify-center bg-gray-1 dark:bg-gray-2 rounded-lg">
            <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center bg-res-bot-blue">
              {activeAvatar ? (
                <img
                  src={activeAvatar?.file}
                  alt="User Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <BearIcon className="w-10" />
              )}
            </div>
          </div>
          <div
            className={cn(
              "group h-[60px] w-full border border-dashed border-gray-4 dark:border-gray-2 flex items-center justify-center rounded-lg cursor-pointer outline-none hover:bg-gray-6 dark:hover:bg-gray-2 dark:hover:bg-opacity-20",
              isDragActive && "border-res-bot-blue dark:border-res-bot-blue"
            )}
            {...getRootProps()}
          >
            <input
              {...getInputProps()}
              multiple={false}
              accept="image/png, image/jpeg"
              className="outline-none"
            />
            <span className="typography-tip text-gray-3 select-none group-hover:text-gray-2 dark:group-hover:text-gray-4">
              область для загрузки изображения
            </span>
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <span className="typography-text-1">Предыдущие изображения</span>
          <div className="flex items-center gap-2">
            {avatars.map((avatar, i) => (
                <img key={i} className={cn("w-[60px] h-[60px] rounded-lg object-cover", avatar.isActive && "ring-1 ring-res-bot-blue ring-offset-2 ring-offset-res-bot-blue")} src={avatar.file} alt="previous avatar"  />
            ))}
          </div>
        </div>
        <span className="typography-semi-head mt-6">Выбрать NFT</span>
        <p className="typography-text-1 mt-2">
          Чтобы выбрать NFT-изображение, необходимо привязать Web 3.0 кошелёк.
        </p>
      </div>
    </DialogContent>
  )
}

export default ChangeAvatar
