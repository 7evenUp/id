import { useRef, useState } from "react"

import EditButton from "../../components/EditButton"
import EditContainer from "../../components/EditContainer"
import ConfirmButton from "../../components/ConfirmButton"

import RowItem from "@/shared/components/RowItem"

import {
  useUpdateNicknameMutation,
  useUserProfileQuery,
} from "@/redux/api/core"

const ProfileNickname = () => {
  const [isEditingMode, setIsEditingMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { data: userProfile } = useUserProfileQuery()
  const [updateNickname] = useUpdateNicknameMutation()

  if (!userProfile) return null

  const { username, id } = userProfile

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

export default ProfileNickname
