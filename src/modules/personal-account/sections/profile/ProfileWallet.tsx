import { useAccount, useConnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import { useTranslation } from "react-i18next"

import { AiOutlinePlus } from "react-icons/ai"

import EditContainer from "../../components/EditContainer"
import EditButton from "../../components/EditButton"

import RowItem from "@/shared/components/RowItem"

import { useMetamask } from "@/hooks/useMetamask"

import { cutWalletAddr } from "@/utils/cutWalletAddr"

import { cn } from "@/lib/classNames"

import {
  useUpdateWalletMutation,
  useUserProfileQuery,
} from "@/redux/api/profile"
const ProfileWallet = () => {
  const { t } = useTranslation("profile")

  const { address, isConnected } = useAccount()
  const { connectAsync, isLoading: isLoadingConnect } = useConnect({
    connector: new InjectedConnector(),
  })

  const { data: userProfile } = useUserProfileQuery()
  const [updateWallet] = useUpdateWalletMutation()

  const {
    state: { isMetamaskInstalled },
  } = useMetamask()

  if (!userProfile) return null

  const { wallet } = userProfile

  const handleConnect = async () => {
    if (isConnected && address) {
      console.log(address)
      updateWallet({ wallet: address.toLowerCase() })
    } else {
      const res = await connectAsync()
      console.log(res)
      updateWallet({ wallet: res.account.toLowerCase() })
    }
  }

  return (
    <RowItem className="relative group justify-end">
      <span
        className={cn(
          "mr-auto",
          wallet ? "text-gray-1 dark:text-gray-5" : "text-gray-3"
        )}
      >
        {t("profile.wallet")}
      </span>
      {wallet ? (
        <span>{cutWalletAddr(wallet)}</span>
      ) : (
        <AiOutlinePlus className="hidden sm:block absolute right-0 w-5 h-5 fill-gray-1 dark:fill-gray-5" />
      )}

      {/* Mobile editing */}
      <div className="sm:hidden ml-6">
        {!isMetamaskInstalled ? (
          <a href="https://metamask.io/" target="_blank">
            <EditButton />
          </a>
        ) : (
          <EditButton onClick={handleConnect} />
        )}
      </div>

      {/* Desktop editing */}
      <EditContainer className="hidden sm:flex">
        {!isMetamaskInstalled ? (
          <a href="https://metamask.io/" target="_blank">
            <EditButton />
          </a>
        ) : (
          <EditButton onClick={handleConnect} />
        )}
      </EditContainer>
    </RowItem>
  )
}

export default ProfileWallet
