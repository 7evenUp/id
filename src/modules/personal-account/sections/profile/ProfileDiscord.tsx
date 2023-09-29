import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import { ReactComponent as Plus } from "@/assets/icons/plus.svg"

import EditContainer from "../../components/EditContainer"
import EditButton from "../../components/EditButton"
import ConfirmButton from "../../components/ConfirmButton"

import { useToast } from "@/shared/ui/Toast/useToast"

import RowItem from "@/shared/components/RowItem"

import {
  useUpdateDiscordMutation,
  useUserProfileQuery,
} from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const ProfileDiscord = () => {
  const { t } = useTranslation()

  const scale = useAppSelector((state) => state.scale.value)

  const { toast } = useToast()

  const [inputValue, setInputValue] = useState("")
  const [isEditingMode, setIsEditingMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { data: userProfile } = useUserProfileQuery()
  const [updateDiscord, { isError, isSuccess }] = useUpdateDiscordMutation()

  useEffect(() => {
    if (isSuccess) {
      toast({ variant: "success", description: t("discord-response-success") })
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      toast({ variant: "error", description: t("discord-response-error") })
    }
  }, [isError])

  if (!userProfile) return null

  const { discordUsername } = userProfile

  const onSubmit = async () => {
    setIsEditingMode(false)

    if (!inputRef.current) return

    const inputValue = inputRef.current.value

    if (!inputValue.length) {
      if (discordUsername) inputRef.current.value = discordUsername
      return
    }

    if (discordUsername === inputValue) return

    updateDiscord({
      discordUsername: inputValue,
    })
  }

  const onEdit = () => {
    setIsEditingMode(true)
    setInputValue(inputValue ? inputValue : discordUsername)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  return (
    <RowItem className="flex-1 relative group">
      <span
        className={
          discordUsername ? "text-gray-1 dark:text-gray-4" : "text-gray-3"
        }
      >
        discord
      </span>

      {isEditingMode ? (
        <input
          className="peer bg-transparent outline-none text-right w-full text-gray-1 dark:text-gray-4 disabled:text-gray-1 dark:disabled:text-gray-4"
          value={inputValue ? inputValue : discordUsername}
          onChange={(evt) => setInputValue(evt.currentTarget.value)}
          ref={inputRef}
          onBlur={() => setTimeout(() => setIsEditingMode(false), 100)}
        />
      ) : (
        <span className="text-right w-full text-gray-1 dark:text-gray-4">
          {inputValue ? inputValue : discordUsername}
        </span>
      )}

      {!discordUsername &&
        !isEditingMode &&
        !inputRef.current?.value.length && (
          <div
            className={cn(
              "hidden sm:block absolute right-0 w-5 h-5 cursor-pointer rounded-full hover:shadow-[0_0_0_1px_#333333] dark:hover:shadow-[0_0_0_1px_#BDBDBD] transition-all active:opacity-80 dark:active:opacity-80",
              scale && "3xl:w-[1.302vw] 3xl:h-[1.302vw]"
            )}
            onClick={onEdit}
          >
            <Plus
              className={cn(
                "absolute w-5 h-5",
                scale && "3xl:w-[1.302vw] 3xl:h-[1.302vw]"
              )}
            />
          </div>
        )}

      {/* Mobile editing */}
      <div className="sm:hidden ml-6">
        {isEditingMode ? (
          <ConfirmButton onClick={onSubmit} />
        ) : discordUsername ? (
          <EditButton onClick={onEdit} />
        ) : (
          <div
            className={cn(
              "w-5 h-5 cursor-pointer rounded-full hover:shadow-[0_0_0_1px_#333333] dark:hover:shadow-[0_0_0_1px_#BDBDBD] transition-all active:opacity-80 dark:active:opacity-80",
              scale && "3xl:w-[1.302vw] 3xl:h-[1.302vw]"
            )}
            onClick={onEdit}
          >
            <Plus
              className={cn(
                "absolute w-5 h-5",
                scale && "3xl:w-[1.302vw] 3xl:h-[1.302vw]"
              )}
            />
          </div>
        )}
      </div>

      {/* Desktop editing */}
      <EditContainer className="hidden sm:flex">
        {isEditingMode ? (
          <ConfirmButton onClick={onSubmit} />
        ) : (
          discordUsername && <EditButton onClick={onEdit} />
        )}
      </EditContainer>
    </RowItem>
  )
}

export default ProfileDiscord
