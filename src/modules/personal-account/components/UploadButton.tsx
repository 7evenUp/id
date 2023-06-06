import React from "react"
import { useTranslation } from "react-i18next"

import Button from "@/shared/ui/Button"

import { cn } from "@/lib/classNames"

const UploadButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button> & {
    isLoading: boolean
    isSuccess: boolean
    file: File | null
  }
>(
  (
    { className, isSuccess, file, isLoading, ...props },
    forwardedRef
  ) => {
    const { t } = useTranslation("modals")

    return (
      <Button
        disabled={!file}
        appearence={isSuccess && !file ? "success" : "outlined"}
        className={cn("w-fit", className)}
        isLoading={isLoading}
        ref={forwardedRef}
        {...props}
      >
        {isSuccess && !file
          ? t("change-avatar.save-success")
          : t("change-avatar.save-button")}
      </Button>
    )
  }
)

export default UploadButton
