import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import EditButton from "../../components/EditButton"
import EditContainer from "../../components/EditContainer"
import ConfirmButton from "../../components/ConfirmButton"

import RowItem from "@/shared/components/RowItem"

import {
  useUpdateNicknameMutation,
  useUserProfileQuery,
} from "@/redux/api/profile"

const ProfileNickname = () => {
  const { t } = useTranslation("profile")

  const [isEditingMode, setIsEditingMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { data: userProfile } = useUserProfileQuery()
  const [updateNickname] = useUpdateNicknameMutation()

  const { id, profileUsername } = userProfile!

  const onSubmit = () => {
    setIsEditingMode(false)

    if (!inputRef.current) return

    const inputValue = inputRef.current.value

    if (!inputValue.length) {
      if (profileUsername) inputRef.current.value = profileUsername
      return
    }

    if (profileUsername === inputValue) return

    updateNickname({
      id,
      profileUsername: inputValue,
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
      <span className="mr-auto">{t("profile.nickname")}</span>
      <input
        className="peer bg-transparent outline-none text-right text-gray-1 dark:text-gray-4"
        defaultValue={profileUsername}
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
