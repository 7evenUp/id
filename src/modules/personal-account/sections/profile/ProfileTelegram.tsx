import React, { useRef, useState } from "react"

import EditContainer from "../../components/EditContainer"
import EditButton from "../../components/EditButton"
import SyncButton from "../../components/SyncButton"
import AddButton from "../../components/AddButton"

import RowItem from "@/shared/components/RowItem"

import { useUpdateTelegramMutation } from "@/redux/api/core"

import { User } from "@/types/types"

const ProfileTelegram: React.FC<User> = ({ id, username, telegramId }) => {
  const [isEditingMode, setIsEditingMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [updateTelegram] = useUpdateTelegramMutation()

  const onSubmit = () => {
    console.log("clicked")
    setIsEditingMode(false)

    if (!inputRef.current) return

    const inputValue = inputRef.current.value

    if (!inputValue.length) {
      if (telegramId) inputRef.current.value = telegramId.toString()
      return
    }

    if (telegramId === parseInt(inputValue)) return

    updateTelegram({
      id: id,
      username: username,
      telegramId: parseInt(inputValue),
    })
  }

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
        onBlur={() => setTimeout(() => setIsEditingMode(false), 100)}
      />
      {telegramId ? (
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

export default ProfileTelegram
