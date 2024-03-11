import { useState } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { useTranslation } from "react-i18next"
// import { useTonConnectModal, useTonConnectUI } from "@tonconnect/ui-react"
import { toast } from "sonner"

import Close from "@/assets/icons/close.svg?react"

import UploadDropzone from "../components/UploadDropzone"
import PrevAvatars from "../components/PrevAvatars"
import ModalTrigger from "../components/ModalTrigger"
import UploadButton from "../components/UploadButton"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
// import Button from "@/shared/ui/Button"

// import TextAccent from "@/shared/typography/TextAccent"
// import Text0 from "@/shared/typography/Text0"

import { useChangeAvatarMutation } from "@/redux/api/avatar"
import { useUserProfileQuery } from "@/redux/api/profile"
// import { useGetNFTsQuery } from "@/redux/ton-api/nfts"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

// const NUTCRACKERS_ADDRESS = "EQB3Pd1e7fs89vw6wwlDzS-CrdvDY8phfdn7yKgvL6UQn6ij"
// const TON_PAYLOAD_SECRET = "979ef024cb967134d0fd43556582b374"

const ChangeAvatar = ({ closeDialog }: { closeDialog: () => void }) => {
  const { t } = useTranslation("modals")

  const scale = useAppSelector((state) => state.scale.value)

  // const [tonConnectUI] = useTonConnectUI()
  // const { open: openTon } = useTonConnectModal()

  const [file, setFile] = useState<File | null>(null)
  const [base64, setBase64] = useState("")

  const { data } = useUserProfileQuery()

  const { id, avatars } = data!

  // const { data: nftsData, isLoading: isNftsLoading } = useGetNFTsQuery(
  //   {
  //     account_address: tonWallet!,
  //     collection_address: NUTCRACKERS_ADDRESS,
  //   },
  //   { skip: tonWallet === null }
  // )
  const [trigger, { isSuccess, isLoading }] = useChangeAvatarMutation()

  const activeAvatar = avatars.find((avatar) => avatar.isActive)
  const prevAvatars = avatars.filter((avatar) => !avatar.isActive)

  const onSubmit = async () => {
    try {
      await trigger({ file_base64: base64, is_active: true, user: id }).unwrap()
    } catch {
      toast.error("Произошла ошибка загрузки аватарки")
    } finally {
      setFile(null)
    }
  }

  // const handleConnect = async () => {
  //   closeDialog()
  //   tonConnectUI.setConnectRequestParameters({
  //     state: "ready",
  //     value: { tonProof: TON_PAYLOAD_SECRET },
  //   })
  //   if (tonConnectUI.connected) {
  //     await tonConnectUI.disconnect()
  //     openTon()
  //   } else {
  //     openTon()
  //   }
  // }

  return (
    <DialogContent
      className={cn("sm:w-[85%] md:w-[640px]", scale && "3xl:w-[41.666vw]")}
    >
      <DialogHeader
        className={cn(
          "flex-col mobile:flex-row mobile:items-center mobile:mb-6 gap-2",
          scale && "3xl:mb-[1.563vw] 3xl:gap-[0.521vw]"
        )}
      >
        <DialogTitle>{t("change-avatar.heading")}</DialogTitle>
        <UploadButton
          className="hidden sm:flex"
          file={file}
          isLoading={isLoading}
          isSuccess={isSuccess}
          onClick={onSubmit}
        />
      </DialogHeader>
      <div className="flex flex-col">
        <div
          className={cn("flex gap-4 sm:gap-8", scale && "3xl:gap-[2.083vw]")}
        >
          <div
            className={cn(
              "shrink-0 w-[60px] h-[60px] flex items-center justify-center rounded-lg",
              scale && "3xl:w-[3.906vw] 3xl:h-[3.906vw] 3xl:rounded-[0.521vw]",
              !activeAvatar && "bg-res-bot-blue"
            )}
          >
            <ModalTrigger
              content={
                <DialogContent
                  className="p-0 sm:p-0 rounded-none border-none bg-transparent dark:bg-transparent shadow-none"
                  customClose={<CustomDialogClose />}
                >
                  <img
                    src={base64 ? base64 : activeAvatar?.file}
                    alt="previous avatar"
                    className={cn(
                      "rounded-xl w-full min-w-[150px] sm:max-w-[550px] md:max-w-[640px] max-h-[500px] object-cover",
                      scale &&
                        "3xl:rounded-[0.781vw] 3xl:max-h-[32.552vw] 3xl:max-w-[41.666vw]"
                    )}
                  />
                </DialogContent>
              }
            >
              {activeAvatar && (
                <img
                  src={base64 ? base64 : activeAvatar?.file}
                  alt="User Avatar"
                  className={cn(
                    "w-full h-full object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform will-change-transform",
                    scale && "3xl:rounded-[0.521vw]"
                  )}
                />
              )}
            </ModalTrigger>
          </div>
          <UploadDropzone file={file} setFile={setFile} setBase64={setBase64} />
        </div>

        {prevAvatars.length > 0 ? (
          <PrevAvatars
            resetBase64State={() => setBase64("")}
            avatars={prevAvatars}
            SaveBtn={
              <UploadButton
                className="flex sm:hidden"
                file={file}
                isLoading={isLoading}
                isSuccess={isSuccess}
                onClick={onSubmit}
              />
            }
          />
        ) : (
          <UploadButton
            className={cn(
              "flex sm:hidden mt-6 ml-auto",
              scale && "3xl:mt-[1.563vw]"
            )}
            file={file}
            isLoading={isLoading}
            isSuccess={isSuccess}
            onClick={onSubmit}
          />
        )}

        {/* <TextAccent className={cn("mt-6", scale && "3xl:mt-[1.563vw]")}>
          {t("change-avatar.choose-nft")}
        </TextAccent>
        <div
          className={cn(
            "mt-2 max-h-[240px] mobile-sm:max-h-[300px] md:max-h-[330px] pr-2 overflow-auto",
            prevAvatars.length > 0 && "max-h-[180px] mobile-sm:max-h-[260px]",
            scale && "3xl:mt-[0.52vw] 3xl:max-h-[21.5vw]"
          )}
        >
          {!tonWallet ? (
            <>
              <Text0>{t("change-avatar.nft-description")}</Text0>
              <Button
                className={cn("mt-2", scale && "3xl:mt-[0.52vw]")}
                onClick={handleConnect}
              >
                {t("change-avatar.link-btn")}
              </Button>
            </>
          ) : isNftsLoading ? (
            <Text0>{t("change-avatar.nutcrackers-loading")}</Text0>
          ) : nftsData ? (
            nftsData.nft_items.length === 0 ? (
              <Text0>{t("change-avatar.nutcrackers-empty")}</Text0>
            ) : (
              <div
                className={cn(
                  "grid grid-cols-2 mobile:grid-cols-3 w-fit gap-2",
                  scale && "3xl:gap-[0.52vw]"
                )}
              >
                {nftsData.nft_items.map((nft) => (
                  <button
                    key={nft.index}
                    className={cn(
                      "rounded-md w-fit overflow-hidden group max-w-[160px]",
                      scale && "3xl:rounded-[0.4vw] 3xl:max-w-[10.416vw]"
                    )}
                  >
                    <img
                      id="imageid"
                      src={nft.previews[3].url}
                      className="aspect-square rounded-md group-hover:scale-110 transition-transform"
                    />
                  </button>
                ))}
              </div>
            )
          ) : (
            <Text0>{t("change-avatar.nutcrackers-error")}</Text0>
          )}
        </div> */}
      </div>
    </DialogContent>
  )
}

export default ChangeAvatar

const CustomDialogClose = () => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <DialogPrimitive.Close
      className={cn(
        "absolute border bg-white dark:bg-gray-1 border-gray-1 dark:border-white dark:text-white right-2 top-2 sm:right-0 sm:top-0 sm:translate-x-9 rounded-full opacity-100 hover:opacity-80 p-0.5",
        scale &&
          "3xl:right-[1.302vw] 3xl:top-[1.302vw] 3xl:translate-x-[2.344vw] 3xl:p-[0.13vw]"
      )}
    >
      <Close
        className={cn("w-5 h-5", scale && "3xl:w-[1.302vw] 3xl:h-[1.302vw]")}
      />
    </DialogPrimitive.Close>
  )
}
