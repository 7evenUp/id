import { ReactComponent as BearIcon } from "@/assets/icons/avatars/Star.svg"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"

import Button from "@/shared/ui/Button"

// TODO https://www.npmjs.com/package/react-dropzone

const ChangeAvatar = () => {
  return (
    <DialogContent className="sm:w-[704px]">
      <DialogHeader className="flex-col mobile:flex-row mobile:items-center mb-4 mobile:mb-6 gap-2">
        <DialogTitle>Установить аватар профиля</DialogTitle>
        <Button disabled>сохранить изменения</Button>
      </DialogHeader>
      <div className="flex flex-col">
        <div className="flex gap-8">
          <div className="shrink-0 w-[60px] h-[60px] flex items-center justify-center bg-gray-1 dark:bg-gray-2 rounded-lg">
            <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center bg-res-bot-blue">
              <BearIcon className="w-10" />
            </div>
          </div>
          <div className="h-[60px] w-full border border-dashed border-gray-4 dark:border-gray-2 flex items-center justify-center rounded-lg">
            <span className="typography-tip text-gray-3 select-none">
              область для загрузки изображения
            </span>
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
