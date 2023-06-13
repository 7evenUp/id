import { useAccount, useConnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import { useTranslation } from "react-i18next"

import { useMetamask } from "@/hooks/useMetamask"

import ResponseErrorText from "@/components/ResponseErrorText"
import ResponseSuccessText from "@/components/ResponseSuccessText"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"

import { cutWalletAddr } from "@/utils/cutWalletAddr"

import {
  useUpdateWalletMutation,
  useUserProfileQuery,
} from "@/redux/api/profile"

const UpdateWallet = () => {
  const { t } = useTranslation("modals")

  const { data: userProfileData } = useUserProfileQuery()
  const [updateWallet, { isLoading: isUpdateLoading, error, isSuccess }] =
    useUpdateWalletMutation()

  const { address, isConnected } = useAccount()

  const { wallet } = userProfileData!

  return (
    <DialogContent className="mobile:w-[370px] sm:w-[500px]">
      <DialogHeader>
        <DialogTitle>Синхронизация кошелька</DialogTitle>
      </DialogHeader>

      {!wallet ? (
        <>
          <p className="typography-text-0">
            К вашей учётной записи не привязан кошелёк
          </p>

          {isConnected && address ? (
            <>
              <p className="typography-text-0">
                Вы подключили кошелёк с адресом{" "}
                <span className="typography-accent">
                  {address.toLowerCase()}
                </span>
              </p>
              <p className="typography-text-1">
                При подтверждении данный адрес будет привязан к вашей учётной
                записи. В будущем вы сможете входить в аккаунт с помощью
                кошелька с данным адресом.
              </p>
            </>
          ) : (
            <p className="typography-text-0">
              Чтобы привязать, подключите Metamask кошелёк к сайту.
            </p>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-col typography-text-0">
            <p>К вашей учётной записи привязан кошелёк:</p>
            <span className="text-base font-mono text-black dark:text-gray-5">
              {wallet}
            </span>
          </div>

          {isConnected && address ? (
            <>
              <div className="flex flex-col typography-text-0">
                <p>Сайт подключен к кошельку с адресом:</p>
                <span className="text-base font-mono text-black dark:text-gray-5">
                  {address.toLowerCase()}
                </span>
              </div>
              {address.toLowerCase() === wallet ? (
                <>
                  <p className="typography-text-1">
                    Чтобы изменить кошелёк, смените аккаунт кошелька через
                    Metamask
                  </p>
                </>
              ) : (
                <>
                  <p className="typography-text-1">
                    {" "}
                    При подтверждении текущий адрес{" "}
                    <span className="font-mono text-black dark:text-gray-5">
                      {cutWalletAddr(wallet)}
                    </span>{" "}
                    будет изменён на{" "}
                    <span className="font-mono text-black dark:text-gray-5">
                      {cutWalletAddr(address.toLowerCase())}
                    </span>
                  </p>

                  <p className="typography-text-1">
                    В будущем вы сможете входить в аккаунт с помощью нового
                    адреса.
                  </p>
                </>
              )}
            </>
          ) : (
            <p className="typography-text-0">
              Для изменения, подключите к сайту Metamask кошелёк с другим
              адресом.
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
          подтвердить
        </Button>
      ) : (
        <ConnectWallet />
      )}
    </DialogContent>
  )
}

export default UpdateWallet

const ConnectWallet = () => {
  const {
    state: { isMetamaskInstalled },
  } = useMetamask()

  const { connect, isLoading: isLoadingConnect } = useConnect({
    connector: new InjectedConnector(),
  })

  const handleConnect = () => {
    connect()
  }

  if (isMetamaskInstalled)
    return (
      <Button
        className="w-fit"
        onClick={handleConnect}
        isLoading={isLoadingConnect}
      >
        подключить
      </Button>
    )

  return (
    <a href="https://metamask.io/" target="_blank">
      <Button className="w-fit">подключить</Button>
    </a>
  )
}
