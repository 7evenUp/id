import React, { useRef, useState } from "react"

import EditContainer from "../../components/EditContainer"
import AddButton from "../../components/AddButton"
import EditButton from "../../components/EditButton"
import SyncButton from "../../components/SyncButton"

import RowItem from "@/shared/components/RowItem"

import { useUpdateDiscordMutation } from "@/redux/api/core"

import { User } from "@/types/types"

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
        onBlur={() => setTimeout(() => setIsEditingMode(false), 100)}
      />
      {discordUsername ? (
        <EditContainer>
          {isEditingMode ? (
            <SyncButton onClick={onSubmit} />
          ) : (
            <EditButton
              onClick={() => {
                inputRef.current?.focus()
                setIsEditingMode(true)
              }}
            />
          )}
        </EditContainer>
      ) : !isEditingMode ? (
        <AddButton
          className="absolute right-0"
          onClick={() => {
            inputRef.current?.focus()
            setIsEditingMode(true)
          }}
        />
      ) : (
        <EditContainer>
          <SyncButton onClick={onSubmit} />
        </EditContainer>
      )}
    </RowItem>
  )
}

export default ProfileDiscord
