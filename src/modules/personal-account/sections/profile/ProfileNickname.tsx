import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import EditButton from "../../components/EditButton"
import EditContainer from "../../components/EditContainer"
import ConfirmButton from "../../components/ConfirmButton"

import { useToast } from "@/shared/ui/Toast/useToast"

import RowItem from "@/shared/components/RowItem"

import {
  useUpdateNicknameMutation,
  useUserProfileQuery,
} from "@/redux/api/profile"

const ProfileNickname = () => {
  const { t: tResponse } = useTranslation()
  const { t } = useTranslation("profile")

  const { toast } = useToast()

  const [inputValue, setInputValue] = useState("")
  const [isEditingMode, setIsEditingMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { data: userProfile } = useUserProfileQuery()
  const [updateNickname, { isError, isSuccess }] = useUpdateNicknameMutation()

  useEffect(() => {
    if (isSuccess) {
      toast({
        variant: "success",
        description: tResponse("nickname-response-success"),
      })
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      toast({
        variant: "error",
        description: tResponse("nickname-response-error"),
      })
    }
  }, [isError])

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
