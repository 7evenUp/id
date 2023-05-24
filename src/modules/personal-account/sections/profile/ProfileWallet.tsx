import { AiOutlinePlus } from "react-icons/ai"

import EditContainer from "../../components/EditContainer"
import EditButton from "../../components/EditButton"

import RowItem from "@/shared/components/RowItem"

import { useMetamask } from "@/hooks/useMetamask"

import { useUpdateWalletMutation, useUserProfileQuery } from "@/redux/api/core"

import { cutWalletAddr } from "@/utils/cutWalletAddr"

const ProfileWallet = () => {
  const { data: userProfile } = useUserProfileQuery()

  const [updateWallet] = useUpdateWalletMutation()
  const {
    dispatch,
    state: { status, isMetamaskInstalled, walletAddress },
  } = useMetamask()

  if (!userProfile) return null

  const { wallet } = userProfile

  const showInstallMetamask = status !== "pageNotLoaded" && !isMetamaskInstalled
  const showConnectButton =
    status !== "pageNotLoaded" && isMetamaskInstalled && !walletAddress

  // const isConnected =
  //   status !== "pageNotLoaded" && typeof walletAddress === "string"

  const handleConnect = async () => {
    dispatch({ type: "loading" })
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })

    if (accounts.length > 0) {
      dispatch({ type: "connect", walletAddress: accounts[0] })
      updateWallet({
        wallet: accounts[0],
      })
    }
  }

  return (
    <RowItem className="relative group">
      <span className={wallet ? "text-gray-1 dark:text-gray-5" : "text-gray-3"}>
        кошелёк
      </span>
      {wallet ? (
        <span>{cutWalletAddr(wallet)}</span>
      ) : (
        <AiOutlinePlus className="hidden sm:block absolute right-0 w-5 h-5 fill-gray-1 dark:fill-gray-5" />
      )}

      {/* Mobile editing */}
      <div className="sm:hidden ml-6">
        {showInstallMetamask && (
          <a href="https://metamask.io/" target="_blank">
            <EditButton />
          </a>
        )}
        {showConnectButton && <EditButton onClick={handleConnect} />}
      </div>

      {/* Desktop editing */}
      <EditContainer className="hidden sm:flex">
        {showInstallMetamask && (
          <a href="https://metamask.io/" target="_blank">
            <EditButton />
          </a>
        )}
        {showConnectButton && <EditButton onClick={handleConnect} />}
      </EditContainer>
    </RowItem>
  )
}

export default ProfileWallet
