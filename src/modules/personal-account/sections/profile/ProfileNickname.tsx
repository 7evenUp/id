import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

import EditButton from "../../components/EditButton"
import EditContainer from "../../components/EditContainer"
import ConfirmButton from "../../components/ConfirmButton"

import RowItem from "@/shared/components/RowItem"

import {
  useUpdateNicknameMutation,
  useUserProfileQuery,
} from "@/redux/api/profile"

const ProfileNickname = () => {
  const { t: tResponse } = useTranslation()
  const { t } = useTranslation("profile")

  const [inputValue, setInputValue] = useState("")
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

    toast.promise(updateNickname({ id, profileUsername: inputValue }), {
      loading: tResponse("toast-loading"),
      success: tResponse("nickname-response-success"),
      error: tResponse("nickname-response-error"),
    })
  }

  const onEdit = () => {
    setIsEditingMode(true)
    setInputValue(inputValue ? inputValue : profileUsername)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  return (
    <RowItem className="relative group justify-end">
      <span className="mr-auto">{t("profile.nickname")}</span>
      {isEditingMode ? (
        <input
          className="peer bg-transparent outline-none text-right text-gray-1 dark:text-gray-4 disabled:text-gray-1 dark:disabled:text-gray-4"
          value={inputValue ? inputValue : profileUsername}
          onChange={(evt) => setInputValue(evt.currentTarget.value)}
          ref={inputRef}
          onBlur={() => setTimeout(() => setIsEditingMode(false), 100)}
        />
      ) : (
        <span className="text-right text-gray-1 dark:text-gray-4">
          {inputValue ? inputValue : profileUsername}
        </span>
      )}

      {/* Mobile editing */}
      {isEditingMode ? (
        <ConfirmButton className="sm:hidden ml-6" onClick={onSubmit} />
      ) : (
        <EditButton className="sm:hidden ml-6" onClick={onEdit} />
      )}

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
