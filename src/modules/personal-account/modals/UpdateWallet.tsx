import { useState } from "react"
import { useAccount } from "wagmi"
import { isMobile } from "react-device-detect"
import { useTranslation } from "react-i18next"

import ResponseErrorText from "@/components/ResponseErrorText"
import ResponseSuccessText from "@/components/ResponseSuccessText"
import ConnectWalletModal from "@/components/ConnectWalletModal"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"

import { cutWalletAddr } from "@/utils/cutWalletAddr"

import {
  useUpdateWalletMutation,
  useUserProfileQuery,
} from "@/redux/api/profile"

const UpdateWallet = () => {
  const { t } = useTranslation("modals")

  const [connectModalOpened, setConnectModalOpened] = useState(false)

  const { data: userProfileData } = useUserProfileQuery()
  const [updateWallet, { isLoading: isUpdateLoading, error, isSuccess }] =
    useUpdateWalletMutation()

  const { address, isConnected } = useAccount()

  const { wallet } = userProfileData!

  const openConnectModal = () => {
    setConnectModalOpened(true)
  }

  const closeConnectWalletModal = () => {
    setConnectModalOpened(false)
  }

  const handleConnect = async () => {
    if (!isConnected) open()
  }

  return (
    <DialogContent className="mobile:w-[370px] sm:w-[500px]">
      <DialogHeader>
        <DialogTitle>{t("change-wallet.heading")}</DialogTitle>
      </DialogHeader>

      <ConnectWalletModal
        open={connectModalOpened}
        onOpenChange={setConnectModalOpened}
        close={closeConnectWalletModal}
      />

      {!wallet ? (
        <>
          <p className="typography-text-0">
            {t("change-wallet.wallet-acc-unpresent.status")}
          </p>

          {isConnected && address ? (
            <>
              <p className="typography-text-0">
                {t("change-wallet.wallet-acc-unpresent.wallet-connected")}{" "}
                <span className="typography-accent">
                  {cutWalletAddr(address.toLowerCase())}
                </span>
              </p>
              <p className="typography-text-1">
                {t("change-wallet.wallet-acc-unpresent.confirm-text")}
              </p>
            </>
          ) : (
            <p className="typography-text-0">
              {t("change-wallet.wallet-acc-unpresent.wallet-disconnected")}
            </p>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-col typography-text-0">
            <p>{t("change-wallet.wallet-acc-present.status")}</p>{" "}
            <span className="text-base font-mono text-black dark:text-gray-5">
              {cutWalletAddr(wallet)}
            </span>
          </div>

          {isConnected && address ? (
            <>
              <div className="flex flex-col typography-text-0">
                <p>{t("change-wallet.wallet-acc-present.wallet-connected")}</p>{" "}
                <span className="text-base font-mono text-black dark:text-gray-5">
                  {cutWalletAddr(address.toLowerCase())}
                </span>
              </div>
              {address.toLowerCase() === wallet ? (
                <>
                  <p className="typography-text-1">
                    {t("change-wallet.wallet-acc-present.wallets-equal")}
                  </p>
                </>
              ) : (
                <>
                  <p className="typography-text-1">
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
                  </p>

                  <p className="typography-text-1">
                    {t("change-wallet.wallet-acc-present.confirm-text-2")}
                  </p>
                </>
              )}
            </>
          ) : (
            <p className="typography-text-0">
              {t("change-wallet.wallet-acc-present.wallet-disconnected")}
            </p>
          )}
        </>
      )}

      {isSuccess && (
        <ResponseSuccessText>
          {wallet
            ? "Кошелёк успешно привязан к вашему аккаунту"
            : "Кошелёк успешно изменён"}
        </ResponseSuccessText>
      )}

      {error && <ResponseErrorText error={error} />}

      {isConnected && address ? (
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
      )}
    </DialogContent>
  )
}

export default UpdateWallet
