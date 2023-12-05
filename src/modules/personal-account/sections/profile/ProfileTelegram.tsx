import Plus from "@/assets/icons/plus.svg?react"

import UpdateTelegram from "../../modals/UpdateTelegram"

import EditContainer from "../../components/EditContainer"
import EditButton from "../../components/EditButton"
import ModalTrigger from "../../components/ModalTrigger"

import RowItem from "@/shared/components/RowItem"

import { useUserProfileQuery } from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const ProfileTelegram = () => {
  const { data: userProfile } = useUserProfileQuery()

  const scale = useAppSelector((state) => state.scale.value)

  if (!userProfile) return null

  const { telegramUsername } = userProfile

  return (
    <RowItem className="flex-1 relative group">
      <span
        className={
          telegramUsername ? "text-gray-1 dark:text-gray-4" : "text-gray-3"
        }
      >
        telegram
      </span>
      {telegramUsername ? (
        <span className="text-right w-full pl-2 overflow-hidden">{telegramUsername}</span>
      ) : (
        <ModalTrigger content={<UpdateTelegram />}>
          <button
            className={cn(
              "hidden sm:block absolute right-0 w-5 h-5 cursor-pointer rounded-full hover:shadow-[0_0_0_1px_#333333] dark:hover:shadow-[0_0_0_1px_#BDBDBD] transition-all active:opacity-80 dark:active:opacity-80",
              scale && "3xl:w-[1.302vw] 3xl:h-[1.302vw]"
            )}
          >
            <Plus
              className={cn(
                "absolute top-0 w-5 h-5",
                scale && "3xl:w-[1.302vw] 3xl:h-[1.302vw]"
              )}
            />
          </button>
        </ModalTrigger>
      )}

      {/* Mobile editing */}
      <div className="sm:hidden ml-6">
        <ModalTrigger content={<UpdateTelegram />}>
          {telegramUsername ? (
            <EditButton />
          ) : (
            <div
              className={cn(
                "w-5 h-5 cursor-pointer rounded-full hover:shadow-[0_0_0_1px_#333333] dark:hover:shadow-[0_0_0_1px_#BDBDBD] transition-all active:opacity-80 dark:active:opacity-80",
                scale && "3xl:w-[1.302vw] 3xl:h-[1.302vw]"
              )}
            >
              <Plus
                className={cn(
                  "absolute w-5 h-5",
                  scale && "3xl:w-[1.302vw] 3xl:h-[1.302vw]"
                )}
              />
            </div>
          )}
        </ModalTrigger>
      </div>

      {/* Desktop editing */}
      {telegramUsername && (
        <EditContainer className="hidden sm:flex">
          <ModalTrigger content={<UpdateTelegram />}>
            <EditButton />
          </ModalTrigger>
        </EditContainer>
      )}
    </RowItem>
  )
}

export default ProfileTelegram
