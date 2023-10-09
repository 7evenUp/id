import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

import { ReactComponent as Plus } from "@/assets/icons/plus.svg"

import EditContainer from "../../components/EditContainer"
import EditButton from "../../components/EditButton"
import ConfirmButton from "../../components/ConfirmButton"

import RowItem from "@/shared/components/RowItem"

import { useUpdateWaxMutation, useUserProfileQuery } from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const ERROR_LIMIT_REACHED = "limit_reached"

const ProfileWax = () => {
  const { t } = useTranslation()

  const scale = useAppSelector((state) => state.scale.value)

  const [inputValue, setInputValue] = useState("")
  const [isEditingMode, setIsEditingMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { data: userProfile } = useUserProfileQuery()
  const [updateWax] = useUpdateWaxMutation()

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

    toast.promise(updateWax({ wax_wallet: inputValue }).unwrap(), {
      loading: t("toast-loading"),
      success: t("wax-response-success"),
      error: (error) => {
        if (error.data.errorCode === ERROR_LIMIT_REACHED) {
          return t("wax-response-error-limit")
        } else {
          return t("wax-response-error")
        }
      },
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
        ) : waxWallet ? (
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
          waxWallet && <EditButton onClick={onEdit} />
        )}
      </EditContainer>
    </RowItem>
  )
}

export default ProfileWax
