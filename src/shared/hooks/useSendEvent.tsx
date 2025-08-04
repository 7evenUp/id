import { useCallback } from "react"
import { sendEvent as sendCryptonEvent } from "web-analytics-crypton"

import { useUserProfileQuery } from "@/redux/api/profile"

const useSendEvent = () => {
  const { data: userProfile } = useUserProfileQuery()

  const sendEvent = useCallback(
    ({
      name,
      payload = {},
    }: {
      name: string
      payload?: Record<string, string>
    }) => {
      if (userProfile === undefined) {
        sendCryptonEvent({
          name,
          payload,
          email: null,
          evmWallet: null,
          telegramId: null,
          tonWallet: null,
          userId: null,
        })
      } else {
        sendCryptonEvent({
          name,
          payload,
          email: userProfile.email,
          evmWallet: userProfile.wallet,
          telegramId: userProfile.telegramId,
          tonWallet: userProfile.tonWallet,
          userId: userProfile.id,
        })
      }
    },
    [userProfile]
  )

  return { sendEvent }
}

export default useSendEvent
