import { ReactComponent as Plus } from "@/assets/icons/plus.svg"

import UpdateTelegram from "../../modals/UpdateTelegram"

import EditContainer from "../../components/EditContainer"
import EditButton from "../../components/EditButton"
import ModalTrigger from "../../components/ModalTrigger"

import RowItem from "@/shared/components/RowItem"

import { useUserProfileQuery } from "@/redux/api/profile"

const ProfileTelegram = () => {
  const { data: userProfile } = useUserProfileQuery()

  if (!userProfile) return null

  const { telegramUsername } = userProfile

  return (
    <RowItem className="flex-1 relative group">
      <span
        className={
          telegramUsername ? "text-gray-1 dark:text-gray-5" : "text-gray-3"
        }
      >
        telegram
      </span>
      {telegramUsername ? (
        <span className="text-right w-full">{telegramUsername}</span>
      ) : (
        <Plus className="hidden sm:block absolute right-0 w-5 h-5" />
      )}

      {/* Mobile editing */}
      <div className="sm:hidden ml-6">
        <ModalTrigger content={<UpdateTelegram />}>
          <EditButton />
        </ModalTrigger>
      </div>

      {/* Desktop editing */}
      <EditContainer className="hidden sm:flex">
        <ModalTrigger content={<UpdateTelegram />}>
          <EditButton />
        </ModalTrigger>
      </EditContainer>
    </RowItem>
  )
}

export default ProfileTelegram
