import * as DialogPrimitive from "@radix-ui/react-dialog"
import { useTranslation } from "react-i18next"

import { ReactComponent as Close } from "@/assets/icons/close.svg"

import { DialogContent } from "@/shared/ui/Dialog"

import Text1 from "@/shared/typography/Text1"

import ModalTrigger from "./ModalTrigger"

import { Avatar } from "@/types/user"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const PrevAvatars = ({
  avatars,
  SaveBtn,
}: {
  avatars: Avatar[]
  SaveBtn: React.ReactNode
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
                  className={cn(
                    "rounded-xl w-full min-w-[150px] sm:max-w-[550px] md:max-w-[640px] max-h-[500px] object-cover",
                    scale &&
                      "3xl:rounded-[0.781vw] 3xl:max-w-[41.666vw] 3xl:max-h-[32.552vw]"
                  )}
                />
              </DialogContent>
            }
          >
            <img
              className={cn(
                "w-[60px] h-[60px] rounded-lg object-cover cursor-pointer hover:scale-105 transition-transform will-change-transform",
                scale && "3xl:w-[3.906vw] 3xl:h-[3.906vw] 3xl:rounded-[0.521vw]"
              )}
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
