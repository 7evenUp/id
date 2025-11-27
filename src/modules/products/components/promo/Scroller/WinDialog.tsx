import * as Dialog from "@radix-ui/react-dialog"
import { useTranslation } from "react-i18next"

import CloseIcon from "@/assets/icons/close.svg?react"

import TextAccent from "@/shared/typography/TextAccent"
import Subheading from "@/shared/typography/Subheading"

import { OpenContainerResponse, FreeSpinResponse } from "@/types/crypton-events"

const WinDialog = ({
  open,
  onOpenChange,
  data,
  freeSpinData,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: OpenContainerResponse | undefined
  freeSpinData: FreeSpinResponse | undefined
}) => {
  const { t } = useTranslation("products")

  // const dispatch = useAppDispatch()

  // const goToInventory = () => {
  //   onOpenChange(false)
  //   dispatch(changeRootTab("inventory"))
  // }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 backdrop-blur-sm" />
        <Dialog.Content
          className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] z-50 h-[100dvh] w-screen translate-x-[-50%] translate-y-[-50%] bg-white text-gray-1 focus:outline-none dark:bg-gray-1 dark:text-gray-5 sm:h-[240px] sm:w-[500px] sm:rounded-xl md:h-[280px] md:w-[600px] lg:h-[300px] lg:w-[640px] 2xl:h-[360px] 2xl:w-[760px] 3xl:h-[442px] 3xl:w-[930px]"
          onOpenAutoFocus={(event) => event.preventDefault()}
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          {data === undefined && freeSpinData === undefined ? (
            <>
              <div className="flex items-center justify-center pt-10 text-3xl">
                {t("Не удалось узнать приз")}
              </div>
              <Dialog.Close className="absolute right-4 top-4 text-black dark:text-white sm:left-full sm:top-0 sm:translate-x-2 md:translate-x-5">
                <CloseIcon className="h-6 w-6 [filter:_drop-shadow(0_0_1px_rgb(0_0_0/0.5));] sm:h-[36px] sm:w-[36px] 3xl:h-[44px] 3xl:w-[44px]" />
              </Dialog.Close>
            </>
          ) : data !== undefined ? (
            <>
              <div className="flex h-full w-full flex-col-reverse items-center justify-center gap-6 text-xs/[125%] tracking-[0.02em] mobile-sm:text-sm/[125%] sm:h-auto sm:flex-row sm:items-stretch sm:justify-start sm:gap-0 sm:text-xs/[125%] md:text-sm/[125%] 2xl:text-base/[125%] 3xl:text-[20px]/[125%]">
                <div className="flex shrink-0">
                  <img
                    src={data.prize.image!}
                    className="h-[85vw] w-[85vw] object-cover mobile-sm:h-[320px] mobile-sm:w-[320px] sm:h-[240px] sm:w-[240px] sm:rounded-l-xl md:h-[280px] md:w-[280px] lg:h-[300px] lg:w-[300px] 2xl:h-[360px] 2xl:w-[360px] 3xl:h-[442px] 3xl:w-[442px]"
                  />
                </div>
                <div className="flex flex-col p-3 mobile-sm:px-6 mobile-sm:py-0 sm:p-4 2xl:p-6 3xl:p-8">
                  <TextAccent className="mb-2">
                    {t("Поздравляем! Вы выиграли:")}
                  </TextAccent>
                  <Subheading className="mb-1">{data.prize.title}</Subheading>
                  <p className="sm:max-w-auto max-w-[380px]">
                    {data.prize.description}
                  </p>
                  <div className="mt-4 flex items-center gap-3 sm:mt-auto">
                    {data.prize.link ? (
                      data.prize.link === data.prize.nftImageUrl ? (
                        <a
                          href={data.prize.nftImageUrl}
                          target="_blank"
                          className="underline underline-offset-2 hover:opacity-70"
                        >
                          GetGems
                        </a>
                      ) : (
                        <>
                          <a
                            href={data.prize.link}
                            target="_blank"
                            className="underline underline-offset-2 hover:opacity-70"
                          >
                            Подробнее
                          </a>
                          {data.prize.nftImageUrl && (
                            <a
                              href={data.prize.nftImageUrl}
                              target="_blank"
                              className="underline underline-offset-2 hover:opacity-70"
                            >
                              GetGems
                            </a>
                          )}
                        </>
                      )
                    ) : (
                      data.prize.nftImageUrl && (
                        <a
                          href={data.prize.nftImageUrl}
                          target="_blank"
                          className="underline underline-offset-2 hover:opacity-70"
                        >
                          GetGems
                        </a>
                      )
                    )}
                  </div>
                  {/* <button
                    className="mt-4 sm:mt-auto text-xs flex items-center justify-center w-full font-semibold gap-2 h-8 px-6 rounded-lg bg-[#FFE19D] text-gray-1 hover:shadow-[0_1px_2px_0_rgba(0,0,0,0.3),_0_1px_3px_1px_rgba(0,0,0,0.15)] active:shadow-none transition-all duration-100 hover:bg-[#f5d383] active:bg-[#ecc76f]"
                    onClick={goToInventory}
                  >
                    {t("Посмотреть в инвентаре")}
                  </button> */}
                </div>
              </div>
              <Dialog.Close className="absolute right-4 top-4 text-black dark:text-white sm:left-full sm:top-0 sm:translate-x-2 md:translate-x-5">
                <CloseIcon className="h-6 w-6 [filter:_drop-shadow(0_0_1px_rgb(0_0_0/0.5));] sm:h-[36px] sm:w-[36px] 3xl:h-[44px] 3xl:w-[44px]" />
              </Dialog.Close>
            </>
          ) : (
            freeSpinData !== undefined && (
              <>
                <div className="flex h-full w-full flex-col-reverse items-center justify-center gap-6 text-xs/[125%] tracking-[0.02em] mobile-sm:text-sm/[125%] sm:h-auto sm:flex-row sm:items-stretch sm:justify-start sm:gap-0 sm:text-xs/[125%] md:text-sm/[125%] 2xl:text-base/[125%] 3xl:text-[20px]/[125%]">
                  <div className="flex shrink-0">
                    <img
                      src={freeSpinData.image}
                      className="h-[85vw] w-[85vw] object-cover mobile-sm:h-[320px] mobile-sm:w-[320px] sm:h-[240px] sm:w-[240px] sm:rounded-l-xl md:h-[280px] md:w-[280px] lg:h-[300px] lg:w-[300px] 2xl:h-[360px] 2xl:w-[360px] 3xl:h-[442px] 3xl:w-[442px]"
                    />
                  </div>
                  <div className="flex flex-col p-3 mobile-sm:px-6 mobile-sm:py-0 sm:p-4 2xl:p-6 3xl:p-8">
                    <TextAccent className="mb-2">
                      {t("Поздравляем! Вы выиграли:")}
                    </TextAccent>
                    {freeSpinData.title && (
                      <Subheading className="mb-1">
                        {freeSpinData.title}
                      </Subheading>
                    )}
                    <p className="sm:max-w-auto max-w-[380px]">
                      {freeSpinData.description}
                    </p>
                    <p className="sm:max-w-auto mt-2 max-w-[380px]">
                      Чтобы активировать её, перейди по ссылке ниже «Подробнее»
                      в инвентарь ID и продай подарок — нажми на зелёные монетки
                      в правом верхнем углу.
                    </p>
                    <div className="mt-4 flex items-center gap-3 sm:mt-auto">
                      <a
                        href="https://id.crypton.xyz?open_tab=inventory"
                        target="_blank"
                        className="underline underline-offset-2 hover:opacity-70"
                      >
                        Подробнее
                      </a>
                    </div>
                  </div>
                </div>
                <Dialog.Close className="absolute right-4 top-4 text-black dark:text-white sm:left-full sm:top-0 sm:translate-x-2 md:translate-x-5">
                  <CloseIcon className="h-6 w-6 [filter:_drop-shadow(0_0_1px_rgb(0_0_0/0.5));] sm:h-[36px] sm:w-[36px] 3xl:h-[44px] 3xl:w-[44px]" />
                </Dialog.Close>
              </>
            )
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default WinDialog
