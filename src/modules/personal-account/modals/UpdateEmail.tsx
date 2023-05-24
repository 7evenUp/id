import { useState } from "react"
// import { DialogClose } from "@radix-ui/react-dialog"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"
import Input from "@/shared/ui/Input"

import { useUpdateEmailMutation, useUserProfileQuery } from "@/redux/api/core"
// import { useMetamask } from "@/hooks/useMetamask"

const UpdateEmail = () => {
  const [oldEmail, setOldEmail] = useState("")
  const [newEmail, setNewEmail] = useState("")
  // const [error, setError] = useState("")

  const { data: userProfileData } = useUserProfileQuery()
  const [updateEmail] = useUpdateEmailMutation()

  // const {
  //   dispatch,
  //   state: { status, isMetamaskInstalled, walletAddress },
  // } = useMetamask()

  // const showConnectButton =
  //   status !== "pageNotLoaded" && isMetamaskInstalled && !walletAddress
  // const isConnected =
  //   status !== "pageNotLoaded" && typeof walletAddress === "string"

  // const isOldEmailCorrect = oldEmail === userProfileData?.email

  const onSubmit = () => {
    if (!/.+@.+\..+/.test(newEmail)) {
      console.log("email is not valid")
      return
    }

    if (userProfileData) {
      updateEmail({
        email: newEmail,
      })
    }
  }

  // const handleConnect = async () => {
  //   dispatch({ type: "loading" })
  //   const accounts = await window.ethereum.request({
  //     method: "eth_requestAccounts",
  //   })

  //   if (accounts.length > 0) {
  //     dispatch({ type: "connect", walletAddress: accounts[0] })

  //     // const exampleMessage = 'Example `personal_sign` message.';

  //     // try {
  //     //   const from = accounts[0];
  //     //   // For historical reasons, you must submit the message to sign in hex-encoded UTF-8.
  //     //   // This uses a Node.js-style buffer shim in the browser.
  //     //   const msg = `0x${Buffer.from(exampleMessage, 'utf8').toString('hex')}`;
  //     //   const sign = await window.ethereum.request({
  //     //     method: 'personal_sign',
  //     //     params: [msg, from, 'Example password'],
  //     //   });
  //     //   console.log(sign)
  //     // } catch (err) {
  //     //   console.error(err);
  //     // }
  //   }
  // }

  return (
    <DialogContent className="mobile:w-[370px] sm:w-[370px]">
      <DialogHeader>
        <DialogTitle>Изменить почту</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-[18px]">
        <div className="group flex flex-col gap-1">
          <label
            htmlFor="oldEmail"
            className="typography-text-1 text-gray-3 dark:text-gray-4 group-focus-within:text-gray-1 dark:group-focus-within:text-gray-5"
          >
            Старая почта
          </label>
          <Input
            id="oldEmail"
            type="email"
            placeholder="Введите вашу старую почту"
            value={oldEmail}
            onChange={(evt) => setOldEmail(evt.currentTarget.value)}
          />
        </div>
        <div className="group flex flex-col gap-1">
          <label
            htmlFor="newEmail"
            className="typography-text-1 text-gray-3 dark:text-gray-4 group-focus-within:text-gray-1 dark:group-focus-within:text-gray-5"
          >
            Новая почта
          </label>
          <Input
            id="newEmail"
            type="email"
            placeholder="Введите вашу новую почту"
            value={newEmail}
            onChange={(evt) => setNewEmail(evt.currentTarget.value)}
          />
        </div>
        {/* {showConnectButton && (
          <Button
            className="w-fit mt-2"
            onClick={handleConnect}
            disabled={!isOldEmailCorrect || !newEmail.length}
          >
            подключить Metamask
          </Button>
        )}
        {isConnected && (
          <DialogClose asChild>
            <Button
              className="w-fit mt-2"
              onClick={onSubmit}
              disabled={!isOldEmailCorrect || !newEmail.length}
            >
              подтвердить
            </Button>
          </DialogClose>
        )} */}
        <Button
          className="w-fit mt-2"
          onClick={onSubmit}
          // disabled={!isOldEmailCorrect || !newEmail.length}
        >
          подтвердить
        </Button>
      </div>
    </DialogContent>
  )
}

export default UpdateEmail
