import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

import Plus from "@/assets/icons/plus.svg?react"

import EditContainer from "../../components/EditContainer"
import EditButton from "../../components/EditButton"
import ConfirmButton from "../../components/ConfirmButton"

import RowItem from "@/shared/components/RowItem"

import { LIMIT_REACHED } from "@/utils/errorCodes"

import { useUpdateTonMutation, useUserProfileQuery } from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

import { cutWalletAddr } from "@/utils/cutWalletAddr"

const MAX_WALLET_LENGTH = 48

const ProfileTon = () => {
  const { t } = useTranslation()

  const scale = useAppSelector((state) => state.scale.value)

  const [inputValue, setInputValue] = useState("")
  const [isEditingMode, setIsEditingMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { data: userProfile } = useUserProfileQuery()
  const [updateTon] = useUpdateTonMutation()

  if (!userProfile) return null

  const { tonWallet } = userProfile

  const onSubmit = async () => {
    if (!inputRef.current) return

    const inputValue = inputRef.current.value

    if (!inputValue.length) {
      if (tonWallet) inputRef.current.value = tonWallet
      return
    }

    if (tonWallet === inputValue) return

    if (inputValue.length > MAX_WALLET_LENGTH) {
      toast.error("Максимальное количество символов - 48")
      return
    }

    toast.promise(updateTon({ address: inputValue }).unwrap(), {
      loading: t("toast-loading"),
      success: t("ton-response-success"),
      error: (error) => {
        if (error.errorCode === LIMIT_REACHED) {
          return t("ton-response-error-limit")
        } else {
          return t("ton-response-error")
        }
      },
    })
  }

  const onEdit = () => {
    setIsEditingMode(true)
    // @ts-expect-error null-check
    setInputValue(inputValue ? inputValue : tonWallet)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  return (
    <RowItem className="relative group justify-end">
      <span
        className={cn(
          "mr-auto",
          tonWallet ? "text-gray-1 dark:text-gray-4" : "text-gray-3"
        )}
      >
        ton
      </span>

      {isEditingMode ? (
        <input
          className="peer bg-transparent outline-none text-right text-gray-1 dark:text-gray-4 disabled:text-gray-1 dark:disabled:text-gray-4"
          value={inputValue ? inputValue : tonWallet === null ? "" : tonWallet}
          onChange={(evt) => setInputValue(evt.currentTarget.value)}
          ref={inputRef}
          onBlur={() => setTimeout(() => setIsEditingMode(false), 100)}
        />
      ) : (
        <span className="text-right text-gray-1 dark:text-gray-4 pl-2 overflow-hidden">
          {
            // @ts-expect-error No-Null-Check for `tonWallet`
            inputValue ? cutWalletAddr(inputValue) : cutWalletAddr(tonWallet)
          }
        </span>
      )}

      {!tonWallet && !isEditingMode && !inputValue && (
        <button
          className={cn(
            "hidden sm:block absolute right-0 w-5 h-5 cursor-pointer rounded-full hover:shadow-[0_0_0_1px_#333333] dark:hover:shadow-[0_0_0_1px_#BDBDBD] transition-all active:opacity-80 dark:active:opacity-80",
            scale && "3xl:w-[1.302vw] 3xl:h-[1.302vw]"
          )}
          onClick={onEdit}
        >
          <Plus
            className={cn(
              "absolute top-0 w-5 h-5",
              scale && "3xl:w-[1.302vw] 3xl:h-[1.302vw]"
            )}
          />
        </button>
      )}

      {/* Mobile editing */}
      <div className="sm:hidden ml-6">
        {isEditingMode ? (
          <ConfirmButton onClick={onSubmit} />
        ) : tonWallet ? (
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
          (tonWallet || inputValue) && <EditButton onClick={onEdit} />
        )}
      </EditContainer>
    </RowItem>
  )
}

export default ProfileTon
