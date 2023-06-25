import React from "react"
import hotToast, { Toaster as HotToaster } from "react-hot-toast"

import { ReactComponent as Close } from "@/assets/icons/close.svg"

import { cn } from "@/lib/classNames"

export const Toaster = HotToaster

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  visible: boolean
}

export const Toast = ({ visible, className, ...props }: ToastProps) => {
  return (
    <div
      className={cn(
        "relative mb-2 2xl:mb-[0.521vw] flex w-[350px] 2xl:w-[22.786vw] flex-col items-start gap-1 rounded-xl 2xl:gap-[0.26vw] 2xl:rounded-[0.781vw] bg-white dark:bg-gray-1 text-gray-1 dark:text-gray-6 px-6 py-4 2xl:px-[1.563vw] 2xl:py-[0.781vw] shadow-md overflow-hidden",
        visible &&
          "animate-in slide-in-from-top-5 2xl:slide-in-from-top-[1.302vw]",
        className
      )}
      {...props}
    />
  )
}

Toast.Title = ({ className, ...props }: React.ComponentProps<"h3">) => (
  <h3
    className={cn(
      "text-sm 2xl:text-[0.911vw]/[1.302vw] font-medium",
      className
    )}
    {...props}
  />
)

Toast.Description = ({ className, ...props }: React.ComponentProps<"p">) => (
  <p
    className={cn("text-sm 2xl:text-[0.911vw]/[1.302vw] opacity-80", className)}
    {...props}
  />
)

Toast.Close = ({ onClose }: { onClose: () => void }) => (
  <button
    onClick={onClose}
    className="absolute right-4 top-4 w-5 h-5 2xl:right-[1.042vw] 2xl:top-[1.042vw] 2xl:w-[1.302vw] 2xl:h-[1.302vw]"
  >
    <Close className="w-5 h-5 2xl:w-[1.302vw] 2xl:h-[1.302vw]" />
  </button>
)

interface ToastOpts {
  title?: string
  message: string
  type?: "success" | "error" | "default"
  duration?: number
  providedId?: string
}

export const toast = (opts: ToastOpts) => {
  const { title, message, type = "default", duration = 3000, providedId } = opts

  return hotToast.custom(
    ({ visible, id }) => {
      return (
        <Toast
          visible={visible}
          className={cn({
            "bg-error text-white dark:bg-error": type === "error",
            "bg-success text-white dark:bg-success": type === "success",
          })}
        >
          {title && <Toast.Title>{title}</Toast.Title>}
          <Toast.Description>{message}</Toast.Description>
          <Toast.Close onClose={() => hotToast.remove(id)} />
        </Toast>
      )
    },
    { duration, id: providedId }
  )
}
