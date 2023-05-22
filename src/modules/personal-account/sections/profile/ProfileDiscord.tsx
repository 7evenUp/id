import React, { useRef, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"

import EditContainer from "../../components/EditContainer"
import EditButton from "../../components/EditButton"
import SyncButton from "../../components/SyncButton"

import RowItem from "@/shared/components/RowItem"

import { useUpdateDiscordMutation } from "@/redux/api/core"

import { User } from "@/types/user"

const ProfileDiscord: React.FC<User> = ({ id, username, discordUsername }) => {
  const [isEditingMode, setIsEditingMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [updateDiscord] = useUpdateDiscordMutation()

  const onSubmit = () => {
    console.log("clicked")
    setIsEditingMode(false)

    if (!inputRef.current) return

    const inputValue = inputRef.current.value

    if (!inputValue.length) {
      if (discordUsername) inputRef.current.value = discordUsername
      return
    }

    if (discordUsername === inputValue) return

    updateDiscord({
      id: id,
      username: username,
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
    <RowItem className="relative group">
      <span
        className={
          discordUsername ? "text-gray-1 dark:text-gray-5" : "text-gray-3"
        }
      >
        discord
      </span>
      <input
        className="peer bg-transparent outline-none text-right w-full"
        defaultValue={discordUsername}
        ref={inputRef}
        disabled={!isEditingMode}
        onBlur={() => setTimeout(() => setIsEditingMode(false), 100)}
      />
      {!discordUsername &&
        !isEditingMode &&
        !inputRef.current?.value.length && (
          <AiOutlinePlus className="absolute right-0 w-5 h-5 fill-gray-1 dark:fill-gray-5" />
        )}
      <EditContainer>
        {isEditingMode ? (
          <SyncButton onClick={onSubmit} />
        ) : (
          <EditButton onClick={onEdit} />
        )}
      </EditContainer>
    </RowItem>
  )
}

export default ProfileDiscord
