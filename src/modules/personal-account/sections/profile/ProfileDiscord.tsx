import React, { useRef, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"

import EditContainer from "../../components/EditContainer"
import EditButton from "../../components/EditButton"

import RowItem from "@/shared/components/RowItem"

import { useUpdateDiscordMutation } from "@/redux/api/core"

import { User } from "@/types/user"
import IconButton from "@/shared/ui/IconButton"
import { TbCheck } from "react-icons/tb"

const ProfileDiscord: React.FC<User> = ({ discordUsername }) => {
  const [isEditingMode, setIsEditingMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [updateDiscord] = useUpdateDiscordMutation()

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

    // try {
    //   const res = await fetch(
    //     "https://union-api.crypton.xyz/api/v1/users/change-discord/", {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ "discord_username":inputValue}),
    //       credentials: 'include'
    //   }
    //   )
    // } catch (error) {
    //   console.error("Error happened: ")
    // }

    updateDiscord({
      discordUsername: inputValue,
    })

    // updateDiscord({
    //   discordUsername: inputValue,
    // })
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
          <AiOutlinePlus className="hidden sm:block absolute right-0 w-5 h-5 fill-gray-1 dark:fill-gray-5" />
        )}

      {/* Mobile editing */}
      <div className="sm:hidden ml-6">
        {isEditingMode ? (
          <IconButton
            className="bg-gray-1 hover:bg-gray-2 active:bg-opacity-80 rounded-full"
            onClick={onSubmit}
          >
            <TbCheck className="w-3.5 h-3.5 stroke-gray-5" />
          </IconButton>
        ) : (
          <EditButton onClick={onEdit} />
        )}
      </div>

      {/* Desktop editing */}
      <EditContainer className="hidden sm:flex">
        {isEditingMode ? (
          <IconButton
            className="bg-gray-1 hover:bg-gray-2 active:bg-opacity-80 rounded-full"
            onClick={onSubmit}
          >
            <TbCheck className="w-3.5 h-3.5 stroke-gray-5" />
          </IconButton>
        ) : (
          <EditButton onClick={onEdit} />
        )}
      </EditContainer>
    </RowItem>
  )
}

export default ProfileDiscord
