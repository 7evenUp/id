import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import { ReactComponent as Plus } from "@/assets/icons/plus.svg"

import EditContainer from "../../components/EditContainer"
import EditButton from "../../components/EditButton"
import ConfirmButton from "../../components/ConfirmButton"

import RowItem from "@/shared/components/RowItem"

import { useToast } from "@/shared/ui/Toast/useToast"

import { useUpdateWaxMutation, useUserProfileQuery } from "@/redux/api/profile"

import { cn } from "@/lib/classNames"

const ProfileWax = () => {
  const { t } = useTranslation()

  const { toast } = useToast()

  const [inputValue, setInputValue] = useState("")
  const [isEditingMode, setIsEditingMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { data: userProfile } = useUserProfileQuery()
  const [updateWax, { isError, isSuccess }] = useUpdateWaxMutation()

  useEffect(() => {
    if (isSuccess) {
      toast({ variant: "success", description: t("wax-response-success") })
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      toast({ variant: "error", description: t("wax-response-error") })
    }
  }, [isError])

  if (!userProfile) return null

  const { waxWallet } = userProfile

  const onSubmit = async () => {
    setIsEditingMode(false)

    if (!inputRef.current) return

    const inputValue = inputRef.current.value

    if (!inputValue.length) {
      if (waxWallet) inputRef.current.value = waxWallet
      return
    }

    if (waxWallet === inputValue) return

    updateWax({
      wax_wallet: inputValue,
    })
  }

  const onEdit = () => {
    setIsEditingMode(true)
    // @ts-expect-error null-check
    setInputValue(inputValue ? inputValue : waxWallet)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  return (
    <RowItem className="relative group justify-end">
      <span
        className={cn(
          "mr-auto",
          waxWallet ? "text-gray-1 dark:text-gray-4" : "text-gray-3"
        )}
      >
        wax
      </span>
      {isEditingMode ? (
        <input
          className="peer bg-transparent outline-none text-right text-gray-1 dark:text-gray-4 disabled:text-gray-1 dark:disabled:text-gray-4"
          // @ts-expect-error null-check
          value={inputValue ? inputValue : waxWallet}
          onChange={(evt) => setInputValue(evt.currentTarget.value)}
          ref={inputRef}
          onBlur={() => setTimeout(() => setIsEditingMode(false), 100)}
        />
      ) : (
        <span className="text-right text-gray-1 dark:text-gray-4">
          {inputValue ? inputValue : waxWallet}
        </span>
      )}
      {!waxWallet && !isEditingMode && !inputRef.current?.value.length && (
        <Plus className="hidden sm:block absolute right-0 w-5 h-5 2xl:w-[1.302vw] 2xl:h-[1.302vw]" />
      )}

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

export default ProfileWax
