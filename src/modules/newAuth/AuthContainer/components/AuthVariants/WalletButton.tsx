import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useAccount, useDisconnect, useSignMessage } from "wagmi"
import { useAppKit } from "@reown/appkit/react"
import { AxiosError } from "axios"

import Web3 from "../Icons/Web3"
import Button from "../../shared/Button"
import AuthApi from "../../api"
import { AuthByWalletRequest } from "../../api/types"
import { useMutation } from "@tanstack/react-query"
import Loader from "../../shared/Loader"

const AUTH_MESSAGE = "Authorization"

const WalletButton = ({
  setSignature,
  setIsUserNotFoundByWalletAuth,
  refetchAfterSuccessAuth,
}: {
  setSignature: Dispatch<SetStateAction<string>>
  setIsUserNotFoundByWalletAuth: Dispatch<SetStateAction<boolean>>
  refetchAfterSuccessAuth: VoidFunction
}) => {
  const [isAuthStarted, setIsAuthStarted] = useState(false)
  const [isOpenLoading, setIsOpenLoading] = useState(false)

  const { address, isConnected, isDisconnected } = useAccount()
  const { isPending: isLoadingSign, signMessageAsync } = useSignMessage()
  const { disconnect } = useDisconnect()
  const { open } = useAppKit()

  const {
    mutateAsync: authenticate,
    isPending: isAuthLoading,
    reset,
  } = useMutation({
    mutationFn: (body: AuthByWalletRequest) => AuthApi.authByWallet(body),
    onSuccess: () => {
      refetchAfterSuccessAuth()
    },
    onError: (error: Error) => {
      if (error instanceof AxiosError) {
        if (
          error.status === 400 &&
          error.response?.data.code === "user_does_not_exists"
        ) {
          setIsUserNotFoundByWalletAuth(true)
        }
      }
    },
  })

  // Обработка авторизации через кошлеь
  useEffect(() => {
    const login = async () => {
      let signature

      try {
        signature = await signMessageAsync({ message: AUTH_MESSAGE })
      } catch (error) {
        disconnect()
        setIsAuthStarted(false)
        return
      }

      setSignature(signature)
      const lowerAddress = isConnected && address ? address.toLowerCase() : ""
      await authenticate({
        address: lowerAddress,
        message: AUTH_MESSAGE,
        signature,
      })

      setIsAuthStarted(false)
    }
    if (isAuthStarted && isConnected) login()
  }, [isAuthStarted, isConnected])

  // Обработка отключения кошелька
  useEffect(() => {
    if (isDisconnected) {
      reset()
      setIsAuthStarted(false)
    }
  }, [isDisconnected])

  const handleConnect = async () => {
    setIsAuthStarted(true)
    if (!isConnected) {
      setIsOpenLoading(true)
      open({ view: "Connect" }).finally(() => {
        setIsOpenLoading(false)
      })
    }
  }

  return (
    <Button onClick={handleConnect}>
      {isLoadingSign || isAuthLoading || isOpenLoading ? (
        <Loader />
      ) : (
        <>
          <Web3 />
          Продолжить с Wallet
        </>
      )}
    </Button>
  )
}

export default WalletButton
