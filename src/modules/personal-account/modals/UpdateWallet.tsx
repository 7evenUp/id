// import { useState } from "react"
import { useAccount, useDisconnect } from "wagmi"
// import { isMobile } from "react-device-detect"
import { useTranslation } from "react-i18next"
import { useWeb3Modal } from "@web3modal/wagmi/react"

import ResponseErrorText from "@/components/ResponseErrorText"
import ResponseSuccessText from "@/components/ResponseSuccessText"
// import ConnectWalletModal from "@/components/ConnectWalletModal"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"

import Text0 from "@/shared/typography/Text0"
import Text1 from "@/shared/typography/Text1"

import { cutWalletAddr } from "@/utils/cutWalletAddr"
import { LIMIT_REACHED, USER_WALLET_ALREADY_EXISTS } from "@/utils/errorCodes"

import {
  useUpdateWalletMutation,
  useUserProfileQuery,
} from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const UpdateWallet = () => {
  const { t } = useTranslation("modals")
  const { t: tErrorResponses } = useTranslation("reqResponses")

  const scale = useAppSelector((state) => state.scale.value)

  const { open } = useWeb3Modal()
  // const [connectModalOpened, setConnectModalOpened] = useState(false)

  const { data: userProfileData } = useUserProfileQuery()
  const [updateWallet, { isLoading: isUpdateLoading, error, isSuccess }] =
    useUpdateWalletMutation()

  const { address, isConnected } = useAccount()
  const { disconnect, isPending: isDisconnectLoading } = useDisconnect()

  const { wallet } = userProfileData!

  // const openConnectModal = () => {
  //   setConnectModalOpened(true)
  // }

  // const closeConnectWalletModal = () => {
  //   setConnectModalOpened(false)
  // }

  const handleConnect = async () => {
    if (!isConnected) open({ view: "Connect" })
  }

  return (
    <DialogContent
      className={cn(
        "mobile:w-[370px] sm:w-[500px]",
        scale && "3xl:w-[32.552vw]"
      )}
      onPointerDownOutside={(event) => event.preventDefault()}
      onInteractOutside={(event) => event.preventDefault()}
      onCloseAutoFocus={(event) => event.preventDefault()}
    >
      <DialogHeader>
        <DialogTitle>{t("change-wallet.heading")}</DialogTitle>
      </DialogHeader>

      {/* <ConnectWalletModal
        open={connectModalOpened}
        onOpenChange={setConnectModalOpened}
        close={closeConnectWalletModal}
      /> */}

      {!wallet ? (
        <>
          <Text0>{t("change-wallet.wallet-acc-unpresent.status")}</Text0>

          {isConnected && address ? (
            <>
              <Text0>
                {t("change-wallet.wallet-acc-unpresent.wallet-connected")}{" "}
                <span>{cutWalletAddr(address.toLowerCase())}</span>
              </Text0>
              <Text1>
                {t("change-wallet.wallet-acc-unpresent.confirm-text")}
              </Text1>
            </>
          ) : (
            <Text0>
              {t("change-wallet.wallet-acc-unpresent.wallet-disconnected")}
            </Text0>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-col">
            <Text0>{t("change-wallet.wallet-acc-present.status")}</Text0>{" "}
            <span
              className={cn(
                "text-base font-mono text-black dark:text-gray-5",
                scale && "3xl:text-[1.0417vw]/[1.5625vw]"
              )}
            >
              {cutWalletAddr(wallet)}
            </span>
          </div>

          {isConnected && address ? (
            <>
              <div className="flex flex-col">
                <Text0>
                  {t("change-wallet.wallet-acc-present.wallet-connected")}
                </Text0>{" "}
                <span
                  className={cn(
                    "text-base font-mono text-black dark:text-gray-5",
                    scale && "3xl:text-[1.0417vw]/[1.5625vw]"
                  )}
                >
                  {cutWalletAddr(address.toLowerCase())}
                </span>
              </div>
              {address.toLowerCase() === wallet ? (
                <>
                  <Text1>
                    {t("change-wallet.wallet-acc-present.wallets-equal")}
                  </Text1>
                </>
              ) : (
                <>
                  <Text1>
                    {t(
                      "change-wallet.wallet-acc-present.confirm-text-1-part-1"
                    )}{" "}
                    <span className="font-mono text-black dark:text-gray-5">
                      {cutWalletAddr(wallet)}
                    </span>
                    {t(
                      "change-wallet.wallet-acc-present.confirm-text-1-part-2"
                    )}
                    <span className="font-mono text-black dark:text-gray-5">
                      {cutWalletAddr(address.toLowerCase())}
                    </span>
                  </Text1>

                  <Text1>
                    {t("change-wallet.wallet-acc-present.confirm-text-2")}
                  </Text1>
                </>
              )}
            </>
          ) : (
            <Text0>
              {t("change-wallet.wallet-acc-present.wallet-disconnected")}
            </Text0>
          )}
        </>
      )}

      {isSuccess && (
        <ResponseSuccessText>
          {wallet
            ? t("change-wallet.wallet-connected-successfully")
            : t("change-wallet.wallet-changed-successfully")}
        </ResponseSuccessText>
      )}

      {error && (
        <ResponseErrorText>
          {
            /* @ts-expect-error No-Error-Types */
            error.errorCode === LIMIT_REACHED
              ? tErrorResponses("wallet_limit_reached")
              : /* @ts-expect-error No-Error-Types */
              error.errorCode === USER_WALLET_ALREADY_EXISTS
              ? tErrorResponses("wallet_alredy_exists")
              : tErrorResponses("server-error")
          }
        </ResponseErrorText>
      )}

      {isConnected && address ? (
        <div className="flex flex-wrap-reverse gap-4">
          <Button
            className="w-fit"
            onClick={() => updateWallet({ wallet: address.toLowerCase() })}
            isLoading={isUpdateLoading}
            disabled={Boolean(wallet) && wallet === address.toLowerCase()}
          >
            {t("change-wallet.confirm-btn")}
          </Button>
          <Button onClick={() => disconnect()} isLoading={isDisconnectLoading}>
            {t("change-wallet.disconnect-btn")}
          </Button>
        </div>
      ) : (
        <Button className="w-fit" onClick={handleConnect}>
          {t("change-wallet.connect-btn")}
        </Button>
      )}

      {/* {isConnected && address ? (
        <Button
          className="w-fit"
          onClick={() => updateWallet({ wallet: address.toLowerCase() })}
          isLoading={isUpdateLoading}
          disabled={Boolean(wallet) && wallet === address.toLowerCase()}
        >
          {t("change-wallet.confirm-btn")}
        </Button>
      ) : isMobile ? (
        <Button className="w-fit" onClick={handleConnect}>
          {t("change-wallet.connect-btn")}
        </Button>
      ) : (
        <Button className="w-fit" onClick={openConnectModal}>
          {t("change-wallet.connect-btn")}
        </Button>
      )} */}
    </DialogContent>
  )
}

export default UpdateWallet
