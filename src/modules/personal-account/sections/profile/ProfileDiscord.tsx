import { useRef, useState } from "react"

import { ReactComponent as Plus } from "@/assets/icons/plus.svg"

import EditContainer from "../../components/EditContainer"
import EditButton from "../../components/EditButton"
import ConfirmButton from "../../components/ConfirmButton"

import RowItem from "@/shared/components/RowItem"

import {
  useUpdateDiscordMutation,
  useUserProfileQuery,
} from "@/redux/api/profile"

const ProfileDiscord = () => {
  const [isEditingMode, setIsEditingMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { data: userProfile } = useUserProfileQuery()
  const [updateDiscord] = useUpdateDiscordMutation()

  if (!userProfile) return null

  const { discordUsername } = userProfile

  const onSubmit = async () => {
    console.log("clicked")
    setIsEditingMode(false)

    if (!inputRef.current) return

    const inputValue = inputRef.current.value

    if (!inputValue.length) {
      if (discordUsername) inputRef.current.value = discordUsername
      return
    }

    if (discordUsername === inputValue) return

    console.log("Discord changed with new value: ", inputValue)
    updateDiscord({
      discordUsername: inputValue,
    })
  }

  const onEdit = () => {
    setIsEditingMode(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  return (
    <RowItem className="flex-1 relative group">
      <span
        className={
          discordUsername ? "text-gray-1 dark:text-gray-5" : "text-gray-3"
        }
      >
        discord
      </span>
      <input
        className="peer bg-transparent outline-none text-right w-full text-gray-1 dark:text-gray-4"
        defaultValue={discordUsername}
        ref={inputRef}
        disabled={!isEditingMode}
        onBlur={() => setTimeout(() => setIsEditingMode(false), 100)}
      />
      {!discordUsername &&
        !isEditingMode &&
        !inputRef.current?.value.length && (
          <Plus className="hidden sm:block absolute right-0 w-5 h-5 2xl:w-[1.302vw] 2xl:h-[1.302vw]" />
        )}

      {/* Mobile editing */}
      <div className="sm:hidden ml-6">
        {isEditingMode ? (
          <ConfirmButton onClick={onSubmit} />
        ) : (
          <EditButton onClick={onEdit} />
        )}
      </div>

      {/* Desktop editing */}
      <EditContainer className="hidden sm:flex">
        {isEditingMode ? (
          <ConfirmButton onClick={onSubmit} />
        ) : (
          <EditButton onClick={onEdit} />
        )}
      </EditContainer>
    </RowItem>
  )
}

export default ProfileDiscord
