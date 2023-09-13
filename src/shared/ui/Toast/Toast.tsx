import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"

import { ReactComponent as Close } from "@/assets/icons/close.svg"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <ToastPrimitives.Viewport
      ref={ref}
      className={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-4 p-4 mobile:top-0 mobile:right-0 mobile:max-w-[420px]",
        scale && "3xl:gap-[1.042vw] 3xl:p-[1.042vw] 3xl:max-w-[27.343vw]",
        className
      )}
      {...props}
    />
  )
})
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-xl border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full",
  {
    variants: {
      variant: {
        default:
          "bg-white dark:bg-gray-1 text-gray-1 dark:text-gray-6 border-gray-5 dark:border-gray-2",
        error: "group border-error bg-error text-white",
        success: "group border-success bg-success text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(
        toastVariants({ variant }),
        scale && "3xl:rounded-[0.781vw] 3xl:p-[0.781vw] 3xl:pr-[1.563vw]",
        className
      )}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <ToastPrimitives.Action
      ref={ref}
      className={cn(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-xl border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.error]:border-muted/40 group-[.error]:hover:border-destructive/30 group-[.error]:hover:bg-destructive group-[.error]:hover:text-destructive-foreground group-[.error]:focus:ring-destructive",
        scale && "3xl:rounded-[0.781vw] 3xl:text-[0.911vw]/[1.302vw]",
        className
      )}
      {...props}
    />
  )
})
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <ToastPrimitives.Close
      ref={ref}
      className={cn(
        "absolute right-1 top-1 rounded-md p-1 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100",
        scale &&
          "3xl:right-[0.26vw] 3xl:top-[0.26vw] 3xl:rounded-[0.39vw] 3xl:p-[0.26vw]",
        className
      )}
      toast-close=""
      {...props}
    >
      <Close
        className={cn("h-4 w-4", scale && "3xl:h-[1.041vw] 3xl:w-[1.041vw]")}
      />
    </ToastPrimitives.Close>
  )
})
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <ToastPrimitives.Title
      ref={ref}
      className={cn(
        "text-sm font-semibold [&+div]:text-xs",
        scale &&
          "3xl:text-[0.911vw]/[1.302vw] 3xl:[&+div]:text-[0.781vw]/[1.041vw]",
        className
      )}
      {...props}
    />
  )
})
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <ToastPrimitives.Description
      ref={ref}
      className={cn(
        "text-sm opacity-90",
        scale && "3xl:text-[0.911vw]/[1.302vw]",
        className
      )}
      {...props}
    />
  )
})
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
