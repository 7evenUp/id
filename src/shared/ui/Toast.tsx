import React from "react"
import hotToast, { Toaster as HotToaster } from "react-hot-toast"
import { IoMdClose } from "react-icons/io"

import { cn } from "@/lib/classNames"

export const Toaster = HotToaster

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  visible: boolean
}

export const Toast = ({ visible, className, ...props }: ToastProps) => {
  return (
    <div
      className={cn(
        "relative min-h-16 mb-2 flex w-[350px] flex-col items-start gap-1 rounded-xl bg-white dark:bg-gray-1 text-gray-1 dark:text-gray-6 px-6 py-4 shadow-md overflow-hidden",
        visible && "animate-in slide-in-from-top-5",
        className
      )}
      {...props}
    />
  )
}

Toast.Title = ({ className, ...props }: React.ComponentProps<"h3">) => (
  <h3 className={cn("text-sm font-medium", className)} {...props} />
)

Toast.Description = ({ className, ...props }: React.ComponentProps<"p">) => (
  <p className={cn("text-sm opacity-80", className)} {...props} />
)

Toast.Close = ({ onClose }: { onClose: () => void }) => (
  <button onClick={onClose} className="absolute right-4 top-4 w-4 h-4">
    <IoMdClose className="w-4 h-4 fill-gray-1 dark:fill-gray-6" />
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
            "bg-error text-white": type === "error",
            "bg-black text-white": type === "success",
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
