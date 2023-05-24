import { useRef, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"

import UpdateTelegram from "../../modals/UpdateTelegram"

import EditContainer from "../../components/EditContainer"
import EditButton from "../../components/EditButton"
import ModalTrigger from "../../components/ModalTrigger"

import RowItem from "@/shared/components/RowItem"

import { useUserProfileQuery } from "@/redux/api/profile"

const ProfileTelegram = () => {
  const [isEditingMode, setIsEditingMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { data: userProfile } = useUserProfileQuery()

  if (!userProfile) return null

  const { telegramId } = userProfile

  return (
    <RowItem className="relative group">
      <span
        className={telegramId ? "text-gray-1 dark:text-gray-5" : "text-gray-3"}
      >
        telegram
      </span>
      <input
        className="peer bg-transparent outline-none text-right w-full"
        defaultValue={telegramId}
        ref={inputRef}
        disabled={!isEditingMode}
        onBlur={() => setTimeout(() => setIsEditingMode(false), 100)}
      />
      {!telegramId && !isEditingMode && !inputRef.current?.value.length && (
        <AiOutlinePlus className="hidden sm:block absolute right-0 w-5 h-5 fill-gray-1 dark:fill-gray-5" />
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
