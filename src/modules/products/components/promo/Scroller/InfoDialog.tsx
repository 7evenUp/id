import React from "react"
import * as Dialog from "@radix-ui/react-dialog"

import CloseIcon from "@/assets/icons/close.svg?react"

import Subheading from "@/shared/typography/Subheading"

const InfoDialog = ({
  children,
  image,
  title,
  description,
  getgemsLink,
  moreLink,
}: {
  children: React.ReactNode
  image: string
  title: string | null
  description: string
  getgemsLink: string | null
  moreLink: string | null
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 backdrop-blur-sm" />
        <Dialog.Content
          className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] z-50 h-[100dvh] w-screen translate-x-[-50%] translate-y-[-50%] bg-white text-gray-1 focus:outline-none dark:bg-gray-1 dark:text-gray-5 sm:h-[240px] sm:w-[500px] sm:rounded-xl md:h-[280px] md:w-[600px] lg:h-[300px] lg:w-[640px] 2xl:h-[360px] 2xl:w-[760px] 3xl:h-[442px] 3xl:w-[930px]"
          onOpenAutoFocus={(event) => event.preventDefault()}
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          <>
            <div className="flex h-full w-full flex-col-reverse items-center justify-center gap-6 text-xs/[125%] tracking-[0.02em] mobile-sm:text-sm/[125%] sm:h-auto sm:flex-row sm:items-stretch sm:justify-start sm:gap-0 sm:text-xs/[125%] md:text-sm/[125%] 2xl:text-base/[125%] 3xl:text-[20px]/[125%]">
              <div className="flex shrink-0">
                <img
                  src={image}
                  className="h-[85vw] w-[85vw] object-cover mobile-sm:h-[320px] mobile-sm:w-[320px] sm:h-[240px] sm:w-[240px] sm:rounded-l-xl md:h-[280px] md:w-[280px] lg:h-[300px] lg:w-[300px] 2xl:h-[360px] 2xl:w-[360px] 3xl:h-[442px] 3xl:w-[442px]"
                />
              </div>
              <div className="flex flex-col p-3 mobile-sm:px-6 mobile-sm:py-0 sm:p-4 2xl:p-6 3xl:p-8">
                <Subheading className="mb-1">{title}</Subheading>
                <p className="sm:max-w-auto max-w-[380px]">{description}</p>
                <div className="mt-auto flex items-center gap-3">
                  {moreLink ? (
                    moreLink === getgemsLink ? (
                      <a
                        href={getgemsLink}
                        target="_blank"
                        className="underline underline-offset-2 hover:opacity-70"
                      >
                        GetGems
                      </a>
                    ) : (
                      <>
                        <a
                          href={moreLink}
                          target="_blank"
                          className="underline underline-offset-2 hover:opacity-70"
                        >
                          Подробнее
                        </a>
                        {getgemsLink && (
                          <a
                            href={getgemsLink}
                            target="_blank"
                            className="underline underline-offset-2 hover:opacity-70"
                          >
                            GetGems
                          </a>
                        )}
                      </>
                    )
                  ) : (
                    getgemsLink && (
                      <a
                        href={getgemsLink}
                        target="_blank"
                        className="underline underline-offset-2 hover:opacity-70"
                      >
                        GetGems
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
            <Dialog.Close className="absolute right-4 top-4 text-black dark:text-white sm:left-full sm:top-0 sm:translate-x-2 md:translate-x-5">
              <CloseIcon className="h-6 w-6 [filter:_drop-shadow(0_0_1px_rgb(0_0_0/0.5));] sm:h-[36px] sm:w-[36px] 3xl:h-[44px] 3xl:w-[44px]" />
            </Dialog.Close>
          </>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default InfoDialog
