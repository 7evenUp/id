import React, { useRef, useState } from "react"
import { TbCheck } from "react-icons/tb"

import EditButton from "../../components/EditButton"

import RowItem from "@/shared/components/RowItem"

import IconButton from "@/shared/ui/IconButton"

import { useUpdateTelegramMutation } from "@/redux/api/core"

import { User } from "@/types/types"

const ProfileTelegram: React.FC<User> = ({ id, username, telegramId }) => {
  const [isEditingMode, setIsEditingMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [updateTelegram, { data: telegramMutation }] =
    useUpdateTelegramMutation()

  const onSubmit = () => {
    if (inputRef.current) {
      const inputId = parseInt(inputRef.current.value)

      if (telegramId === inputId) {
        setIsEditingMode(false)
        return
      }

      updateTelegram({
        id: id,
        username: username,
        telegramId: inputId,
      })
    }
    setIsEditingMode(false)
  }

  if (telegramMutation) {
    console.log("telegramMutation: ", telegramMutation)
  }

  return (
    <RowItem className="relative group">
      <span>telegram</span>
      <input
        className="peer bg-transparent outline-none text-right w-full"
        defaultValue={telegramId ? telegramId : "+"}
        ref={inputRef}
      />
      <div className="absolute right-0 translate-x-[30px] w-[30px] h-full flex items-center gap-1 xl:gap-2.5 pl-1 xl:pl-2.5 opacity-0 group-hover:opacity-100 peer-focus:opacity-100 transition-opacity">
        {isEditingMode ? (
          <IconButton
            className="bg-gray-1 hover:bg-gray-2 active:bg-opacity-80 rounded-full"
            onClick={onSubmit}
          >
            <TbCheck className="w-3.5 h-3.5 stroke-gray-5" />
          </IconButton>
        ) : (
          <EditButton
            onClick={() => {
              inputRef.current?.focus()
              setIsEditingMode(true)
            }}
          />
        )}
      </div>
    </RowItem>
  )
}

export default ProfileTelegram
