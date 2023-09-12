import * as DialogPrimitive from "@radix-ui/react-dialog"
import { useTranslation } from "react-i18next"

import { ReactComponent as Close } from "@/assets/icons/close.svg"

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
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 3xl:gap-[1.042vw] mt-6 3xl:mt-[1.563vw]">
      <div className="flex justify-between items-center">
        <span className="typography-text-1 w-[75px] 3xl:w-[4.882vw]">
          {t("change-avatar.prev-images")}
        </span>
        {SaveBtn}
      </div>
      <div className="flex items-center flex-wrap gap-2 3xl:gap-[0.521vw]">
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
                  className="rounded-xl 3xl:rounded-[0.781vw] w-full min-w-[150px] sm:max-w-[550px] md:max-w-[640px] 3xl:max-w-[41.666vw] max-h-[500px] 3xl:max-h-[32.552vw] object-cover"
                />
              </DialogContent>
            }
          >
            <img
              className="w-[60px] h-[60px] 3xl:w-[3.906vw] 3xl:h-[3.906vw] rounded-lg 3xl:rounded-[0.521vw] object-cover cursor-pointer hover:scale-105 transition-transform will-change-transform"
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
  <DialogPrimitive.Close className="absolute border bg-white dark:bg-gray-1 border-gray-1 dark:border-white dark:text-white right-2 top-2 3xl:right-[1.302vw] 3xl:top-[1.302vw] sm:right-0 sm:top-0 sm:translate-x-9 3xl:translate-x-[2.344vw] rounded-full opacity-100 hover:opacity-80 p-0.5 3xl:p-[0.13vw]">
    <Close className="w-5 h-5 3xl:w-[1.302vw] 3xl:h-[1.302vw]" />
  </DialogPrimitive.Close>
)
