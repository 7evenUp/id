import React, { useRef } from "react"
import { TbCheck } from "react-icons/tb"

import RowItem from "../RowItem"
import EditButton from "../EditButton"

import IconButton from "../ui/IconButton"

import { useUpdateNicknameMutation } from "@/redux/api/core"

import { User } from "@/types/types"

const ProfileNickname: React.FC<User> = ({ id, username }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [updateNickname, { data: nickNameMutation }] =
    useUpdateNicknameMutation()

  const changeNickname = () => {
    if (inputRef.current) {
      if (username === inputRef.current.value) {
        console.log("Error, apply some changes!")
      } else {
        console.log("New username!", inputRef.current.value)
        updateNickname({
          id: id,
          username: inputRef.current.value,
        })
      }
    }
  }

  if (nickNameMutation) {
    console.log("nickNameMutation: ", nickNameMutation)
  }

  return (
    <RowItem className="relative group">
      <span>ник</span>
      <input
        className="peer bg-transparent outline-none text-right"
        defaultValue={username ? username : "Loading..."}
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
          onClick={changeNickname}
        >
          <TbCheck className="w-3.5 h-3.5 stroke-gray-5" />
        </IconButton>
      </div>
    </RowItem>
  )
}

export default ProfileNickname
