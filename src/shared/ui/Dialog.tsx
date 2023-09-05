import React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { ReactComponent as Close } from "@/assets/icons/close.svg"

import { cn } from "@/lib/classNames"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = ({
  className,
  children,
  ...props
}: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal className={cn(className)} {...props}>
    <div className="fixed inset-0 z-50 flex justify-center items-center">
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
>(({ className, children, customClose, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "grid gap-4 2xl:gap-[1.042vw] fixed z-50 w-11/12 sm:w-fit max-w-[900px] 2xl:max-w-[58.593vw] p-4 sm:p-10 2xl:p-[2.604vw] pt-10 rounded-xl 2xl:rounded-[0.781vw] shadow-lg font-montserrat border border-gray-1 dark:border-gray-3 bg-white dark:bg-gray-1 text-gray-1 dark:text-gray-4 animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0",
        className
      )}
      {...props}
    >
      {children}
      {customClose ? (
        customClose
      ) : (
        <DialogPrimitive.Close className="absolute border border-gray-1 dark:border-white dark:text-white right-2 top-2 sm:right-0 sm:top-0 sm:translate-x-9 2xl:translate-x-[2.344vw] rounded-full p-0.5 2xl:p-[0.13vw] opacity-70 transition-opacity hover:opacity-100">
          <Close className="w-5 h-5 2xl:w-[1.302vw] 2xl:h-[1.302vw]" />
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
))
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
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "bg-res-bot-blue rounded-b-xl 2xl:rounded-b-[0.781vw] absolute left-0 bottom-0 w-full text-[10px] leading-[140%] 2xl:text-[0.7813vw] font-medium text-white px-4 sm:px-10 2xl:px-[2.604vw] py-1.5 2xl:py-[0.391vw]",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg -tracking-[0.01em] font-semibold 2xl:text-[1.172vw]/[1.823vw] text-gray-1 dark:text-gray-5",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
}
