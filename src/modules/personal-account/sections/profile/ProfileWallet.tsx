import React from "react"

import AddButton from "../../components/AddButton"

import RowItem from "@/shared/components/RowItem"

import { useMetamask } from "@/hooks/useMetamask"

import { useUpdateWalletMutation } from "@/redux/api/core"

import { cutWalletAddr } from "@/utils/cutWalletAddr"

import { User } from "@/types/types"

const ProfileWallet: React.FC<User> = ({ id, username, wallet }) => {
  const [updateWallet] = useUpdateWalletMutation()
  const {
    dispatch,
    state: { status, isMetamaskInstalled, walletAddress },
  } = useMetamask()

  const showInstallMetamask = status !== "pageNotLoaded" && !isMetamaskInstalled
  const showConnectButton =
    status !== "pageNotLoaded" && isMetamaskInstalled && !walletAddress

  const isConnected =
    status !== "pageNotLoaded" && typeof walletAddress === "string"

  const handleConnect = async () => {
    dispatch({ type: "loading" })
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })

    if (accounts.length > 0) {
      dispatch({ type: "connect", walletAddress: accounts[0] })
      updateWallet({
        id: id,
        username: username,
        wallet: accounts[0],
      })
    }
  }

  return (
    <RowItem className="relative group">
      <span>кошелёк</span>
      {walletAddress ? (
        <span>{cutWalletAddr(walletAddress)}</span>
      ) : showInstallMetamask ? (
        <a href="https://metamask.io/" target="_blank">
          <AddButton />
        </a>
      ) : (
        showConnectButton && <AddButton onClick={handleConnect} />
      )}
    </RowItem>
  )
}

export default ProfileWallet
