import React, { useRef, useState } from "react"
import { TbCheck } from "react-icons/tb"

import EditButton from "../../components/EditButton"

import RowItem from "@/shared/components/RowItem"

import IconButton from "@/shared/ui/IconButton"

import { useUpdateDiscordMutation } from "@/redux/api/core"

import { User } from "@/types/types"

const ProfileDiscord: React.FC<User> = ({ id, username, discordUsername }) => {
  const [isEditingMode, setIsEditingMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [updateDiscord, { data: discordMutation }] = useUpdateDiscordMutation()

  const onSubmit = () => {
    if (inputRef.current) {
      const inputValue = inputRef.current.value

      if (discordUsername === inputValue) {
        setIsEditingMode(false)
        return
      }
      updateDiscord({
        id: id,
        username: username,
        discordUsername: inputValue,
      })
    }
    setIsEditingMode(false)
  }

  if (discordMutation) {
    console.log("discordMutation: ", discordMutation)
  }

  return (
    <RowItem className="relative group">
      <span>discord</span>
      <input
        className="peer bg-transparent outline-none text-right w-full"
        defaultValue={discordUsername ? discordUsername : "+"}
        ref={inputRef}
      />
      <div className="absolute right-0 translate-x-[48px] w-[48px] xl:translate-x-[60px] xl:w-[60px] h-full flex items-center gap-1 xl:gap-2.5 pl-1 xl:pl-2.5 opacity-0 group-hover:opacity-100 peer-focus:opacity-100 transition-opacity">
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

export default ProfileDiscord
