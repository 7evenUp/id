import { useMeQuery, useUpdateNicknameMutation } from "@/redux/api/core"

import RowItem from "./RowItem"

import Subheading from "./typography/Subheading"
import IconButton from "./ui/IconButton"

import { MdEdit } from "react-icons/md"
import { useRef } from "react"
import { TbCheck } from "react-icons/tb"

const Profile = () => {
  const textRef = useRef<HTMLInputElement>(null)
  const { isLoading, data, error } = useMeQuery()
  const [updateNickname, {data: dataMutation}] = useUpdateNicknameMutation()

  if (error) return <h2 className="text-5xl text-error">Error happened</h2>

  if (isLoading)
    return <h2 className="text-5xl text-process">Data loading...</h2>

  if (dataMutation) {
    console.log('dataMutation: ', dataMutation)
  }

  return (
    <div>
      <Subheading className="mb-4">Профиль</Subheading>
      <div className="flex flex-col border-t border-gray-4 dark:border-gray-1">
        <RowItem className="relative group">
          <span>ник</span>
          <input
            className="peer bg-transparent outline-none text-right"
            defaultValue={data ? data.username : "Loading..."}
            ref={textRef}
          />
          <IconButton
            className="opacity-0 group-hover:opacity-100 absolute right-0 translate-x-6 bg-gray-1 hover:bg-gray-2 active:bg-opacity-80 rounded-full"
            onClick={() => {
              textRef.current?.focus()
            }}
          >
            <MdEdit className="w-3 h-3 fill-gray-5" />
          </IconButton>
          <IconButton
            className="opacity-0 group-hover:opacity-100 absolute right-0 translate-x-12 bg-gray-1 hover:bg-gray-2 active:bg-opacity-80 rounded-full"
            onClick={() => {
              if (data && textRef.current) {
                const newObj = {...data, username: textRef.current.value}
                // console.log(newObj)
                updateNickname(newObj)
                // console.log('Value: ', textRef.current?.value)
              }
            }}
          >
            <TbCheck className="w-3.5 h-3.5 stroke-gray-5" />
          </IconButton>
        </RowItem>
        <RowItem>
          <span>почта</span>
          <span>{data?.email}</span>
        </RowItem>
        <RowItem>
          <span>кошелёк</span>
          <span>{data ? data.wallet : "+"}</span>
        </RowItem>
        <div className="flex justify-between items-center gap-10">
          <RowItem className="flex-1">
            <span>discord</span>
            <span>{data ? data.discordUsername : "+"}</span>
          </RowItem>
          <RowItem className="flex-1">
            <span>telegram</span>
            <span>{data ? data.telegramId : "+"}</span>
          </RowItem>
        </div>
      </div>
    </div>
  )
}

export default Profile
