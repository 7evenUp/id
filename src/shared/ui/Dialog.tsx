import React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import Close from "@/assets/icons/close.svg?react"

import { cn } from "@/lib/classNames"
import { useAppSelector } from "@/redux/hooks"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = ({
  className,
  children,
  ...props
}: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal className={cn(className)} {...props}>
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {children}
    </div>
  </DialogPrimitive.Portal>
)
DialogPortal.displayName = DialogPrimitive.Portal.displayName

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 backdrop-blur-sm", className)}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    customClose?: React.ReactNode
  }
>(({ className, children, customClose, ...props }, ref) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed z-50 grid w-11/12 max-w-[900px] gap-4 rounded-xl border border-gray-1 bg-white p-4 pt-10 font-montserrat text-gray-1 shadow-lg animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 dark:border-gray-3 dark:bg-gray-1 dark:text-gray-4 sm:w-fit sm:p-10 sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0",
          scale &&
            "3xl:max-w-[58.593vw] 3xl:gap-[1.042vw] 3xl:rounded-[0.781vw] 3xl:p-[2.604vw]",
          className
        )}
        {...props}
      >
        {children}
        {customClose ? (
          customClose
        ) : (
          <DialogPrimitive.Close
            className={cn(
              "absolute right-2 top-2 rounded-full border border-gray-1 p-0.5 opacity-70 transition-opacity hover:opacity-100 dark:border-white dark:text-white sm:right-0 sm:top-0 sm:translate-x-9",
              scale && "3xl:translate-x-[2.344vw] 3xl:p-[0.13vw]"
            )}
          >
            <Close
              className={cn(
                "h-5 w-5",
                scale && "3xl:h-[1.302vw] 3xl:w-[1.302vw]"
              )}
            />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
})
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex justify-between", className)} {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 w-full rounded-b-xl bg-res-bot-blue px-4 py-1.5 text-[10px] font-medium leading-[140%] text-white sm:px-10",
        scale &&
          "3xl:rounded-b-[0.781vw] 3xl:px-[2.604vw] 3xl:py-[0.391vw] 3xl:text-[0.651vw]",
        className
      )}
      {...props}
    />
  )
}
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(
        "text-lg font-semibold -tracking-[0.01em] text-gray-1 dark:text-gray-5",
        scale && "3xl:text-[1.172vw]/[1.823vw]",
        className
      )}
      {...props}
    />
  )
})
DialogTitle.displayName = DialogPrimitive.Title.displayName

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
}
