import React, { useRef, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"

import EditContainer from "../../components/EditContainer"
import EditButton from "../../components/EditButton"
import SyncButton from "../../components/SyncButton"

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

  const onEdit = () => {
    setIsEditingMode(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
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
        disabled={!isEditingMode}
        onBlur={() => setTimeout(() => setIsEditingMode(false), 100)}
      />
      {!telegramId && !isEditingMode && !inputRef.current?.value.length && (
        <AiOutlinePlus className="absolute right-0 w-5 h-5 fill-gray-1 dark:fill-gray-5" />
      )}
      <EditContainer className="w-[48px] translate-x-[48px] xl:w-[60px] xl:translate-x-[60px] gap-1">
        <EditButton onClick={onEdit} />
        <SyncButton onClick={onSubmit} />
      </EditContainer>
    </RowItem>
  )
}

export default ProfileTelegram
