import React from "react"
import { AiOutlinePlus } from "react-icons/ai"

import RowItem from "@/shared/components/RowItem"

import IconButton from "@/shared/ui/IconButton"

import { useMetamask } from "@/hooks/useMetamask"

import { useUpdateWalletMutation } from "@/redux/api/core"

import { cutWalletAddr } from "@/utils/cutWalletAddr"

import { User } from "@/types/types"

const ProfileWallet: React.FC<User> = ({ id, username, wallet }) => {
  const [updateWallet, { data: walletMutation }] = useUpdateWalletMutation()
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

  if (walletMutation) {
    console.log("walletMutation: ", walletMutation)
  }

  return (
    <RowItem className="relative group">
      <span>кошелёк</span>
      {walletAddress ? (
        <span>{cutWalletAddr(walletAddress)}</span>
      ) : showInstallMetamask ? (
        <a href="https://metamask.io/" target="_blank">
          <IconButton className="hover:border border-gray-1 dark:border-gray-5 transition-all">
            <AiOutlinePlus className="fill-gray-1 dark:fill-gray-5 transition-all" />
          </IconButton>
        </a>
      ) : (
        showConnectButton && (
          <IconButton
            onClick={handleConnect}
            className="hover:border border-gray-1 dark:border-gray-5 transition-all"
          >
            <AiOutlinePlus className="fill-gray-1 dark:fill-gray-5 transition-all" />
          </IconButton>
        )
      )}
    </RowItem>
  )
}

export default ProfileWallet

{
  /* <div className="absolute right-0 translate-x-[48px] w-[48px] xl:translate-x-[60px] xl:w-[60px] h-full flex items-center gap-1 xl:gap-2.5 pl-1 xl:pl-2.5 opacity-0 group-hover:opacity-100 peer-focus:opacity-100 transition-opacity">
  <EditButton
    onClick={() => {
      inputRef.current?.focus()
    }}
  />
  <IconButton
    className="bg-gray-1 hover:bg-gray-2 active:bg-opacity-80 rounded-full"
    onClick={onSubmit}
  >
    <TbCheck className="w-3.5 h-3.5 stroke-gray-5" />
  </IconButton>
</div> */
}
