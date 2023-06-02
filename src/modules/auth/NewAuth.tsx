import React from "react"
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"

const NewAuth = () => {
  const [message, setMessage] = React.useState("")

  const { address, isConnected } = useAccount()
  const {
    connectAsync,
    isLoading: isLoadingConnect,
    isError: isConnectError,
  } = useConnect({
    connector: new InjectedConnector(),
  })
  const {
    data: signature,
    isError: isSignError,
    isLoading: isLoadingSign,
    signMessage,
  } = useSignMessage()

  const handleSign = async () => {
    signMessage({ message: message || "Example message" })
  }

  const handleAuth = async () => {
    const res = await connectAsync()
    console.log(res)
  }

  const { disconnect } = useDisconnect()

  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-center">Another auth (dev mode)</h1>
      {isConnected && address ? (
        <>
          <p>
            Connected to {address.slice(0, 6)}...
            {address.slice(address.length - 4)}
          </p>
          
          <div className="flex items-start gap-2">
            <div className="flex flex-col gap-1">

            <input
              className="py-1 px-3 rounded-md outline-none text-zinc-700"
              value={message}
              onChange={(evt) => setMessage(evt.currentTarget.value)}
              placeholder="Type the message"
            />
            <p className="text-sm">(Could get message from backend)</p>
            </div>
            <button
              onClick={() => handleSign()}
              className="bg-zinc-700 text-zinc-300 rounded-md py-1 px-3 w-fit"
            >
              {isLoadingSign ? "Signing..." : "Sign the message"}
            </button>
          </div>
          {signature && (
            <p className="break-all">
              Message:{" "}
              <span className="text-[10px] p-0.5 rounded-sm bg-rose-200 text-rose-600">
                {message}
              </span>{" "}
              <br /> Address:{" "}
              <span className="text-[10px] p-0.5 rounded-sm bg-rose-200 text-rose-600">
                {address}
              </span>
              <br /> Signature:{" "}
              <span className="text-[10px] p-0.5 rounded-sm bg-rose-200 text-rose-600">
                {signature}
              </span>
            </p>
          )}
          {isSignError && (
            <span className="text-[10px] p-0.5 rounded-sm bg-rose-200 text-rose-600">
              User denied message signing
            </span>
          )}
          <button
            onClick={() => disconnect()}
            className="bg-zinc-700 text-zinc-300 rounded-md py-1 px-3 w-fit"
          >
            Disconnect
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleAuth}
            className="bg-zinc-700 text-zinc-300 rounded-md py-1 px-3 w-fit"
          >
            {isLoadingConnect ? "Connecting..." : "Connect Wallet"}
          </button>
          {isConnectError && (
            <span className="text-[10px] p-0.5 rounded-sm bg-rose-200 text-rose-600">
              User denied connection
            </span>
          )}
        </>
      )}
    </div>
  )
}

export default NewAuth
