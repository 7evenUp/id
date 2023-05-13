import React, { useRef } from "react"
import { TbCheck } from "react-icons/tb"

import EditButton from "../../components/EditButton"

import RowItem from "@/shared/components/RowItem"

import IconButton from "@/shared/ui/IconButton"

import { useUpdateWalletMutation } from "@/redux/api/core"

import { User } from "@/types/types"

const ProfileWallet: React.FC<User> = ({ id, username, wallet }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [updateWallet, { data: walletMutation }] = useUpdateWalletMutation()

  const onSubmit = () => {
    if (inputRef.current) {
      if (wallet === inputRef.current.value) {
        console.log("Error, apply some changes!")
      } else {
        console.log("New wallet!", inputRef.current.value)
        updateWallet({
          id: id,
          username: username,
          wallet: inputRef.current.value,
        })
      }
    }
  }

  if (walletMutation) {
    console.log("walletMutation: ", walletMutation)
  }

  return (
    <RowItem className="relative group">
      <span>кошелёк</span>
      <input
        className="peer bg-transparent outline-none text-right"
        defaultValue={wallet ? wallet : "+"}
        ref={inputRef}
      />
      <div className="absolute right-0 translate-x-[48px] w-[48px] xl:translate-x-[60px] xl:w-[60px] h-full flex items-center gap-1 xl:gap-2.5 pl-1 xl:pl-2.5 opacity-0 group-hover:opacity-100 peer-focus:opacity-100 transition-opacity">
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
      </div>
    </RowItem>
  )
}

export default ProfileWallet
