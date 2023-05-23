import React, { useRef, useState } from "react"
import { TbCheck } from "react-icons/tb"

import EditButton from "../../components/EditButton"
import EditContainer from "../../components/EditContainer"

import RowItem from "@/shared/components/RowItem"

import IconButton from "@/shared/ui/IconButton"

import { useUpdateNicknameMutation } from "@/redux/api/core"

import { User } from "@/types/user"

const ProfileNickname: React.FC<User> = ({ id, username }) => {
  const [isEditingMode, setIsEditingMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [updateNickname] = useUpdateNicknameMutation()

  const onSubmit = () => {
    console.log("clicked")
    setIsEditingMode(false)

    if (!inputRef.current) return

    const inputValue = inputRef.current.value

    if (!inputValue.length) {
      if (username) inputRef.current.value = username
      return
    }

    if (username === inputValue) return

    updateNickname({
      id: id,
      username: inputValue,
    })
  }

  const onEdit = () => {
    setIsEditingMode(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  return (
    <RowItem className="relative group justify-end">
      <span className="mr-auto">ник</span>
      <input
        className="peer bg-transparent outline-none text-right"
        defaultValue={username}
        ref={inputRef}
        disabled={!isEditingMode}
        onBlur={() => setTimeout(() => setIsEditingMode(false), 100)}
      />

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

export default ProfileNickname
