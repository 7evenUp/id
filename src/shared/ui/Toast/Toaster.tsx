import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./Toast"
import { useToast } from "./useToast"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

export function Toaster() {
  const { toasts } = useToast()

  const scale = useAppSelector((state) => state.scale.value)

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className={cn("grid gap-1", scale && "3xl:gap-[0.26vw]")}>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
