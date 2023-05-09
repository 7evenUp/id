import { useRef } from "react"
import { TbCheck } from "react-icons/tb"

import {
  useUserProfileQuery,
  useUpdateNicknameMutation,
} from "@/redux/api/core"

import UpdateEmailModal from "./modals/UpdateEmailModal"

import RowItem from "./RowItem"
import EditButton from "./EditButton"
import ModalTrigger from "./ModalTrigger"

import IconButton from "./ui/IconButton"

import Subheading from "./typography/Subheading"

const Profile = () => {
  const textRef = useRef<HTMLInputElement>(null)
  const { isLoading, data, error } = useUserProfileQuery()
  const [updateNickname, { data: dataMutation }] = useUpdateNicknameMutation()

  if (error) return <h2 className="text-5xl text-error">Error happened</h2>

  if (isLoading)
    return <h2 className="text-5xl text-process">Data loading...</h2>

  if (dataMutation) {
    console.log("dataMutation: ", dataMutation)
  }

  const changeNickname = () => {
    if (data && textRef.current) {
      if (data.username === textRef.current.value) {
        console.log("Error, apply changes!")
      } else {
        console.log("New username!", {
          ...data,
          username: textRef.current.value,
        })
        updateNickname({
          id: data.id,
          username: textRef.current.value,
        })
        console.log("Value: ", textRef.current?.value)
      }
    }
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
          <div className="absolute right-0 translate-x-[48px] w-[48px] xl:translate-x-[48px] xl:w-[48px] h-full flex items-center gap-1 xl:gap-2.5 pl-1 xl:pl-2.5 opacity-0 group-hover:opacity-100 peer-focus:opacity-100 transition-opacity">
            <EditButton
              className=""
              onClick={() => {
                textRef.current?.focus()
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
        <RowItem className="relative group">
          <span>почта</span>
          <span>{data?.email}</span>
          <div className="absolute right-0 translate-x-[48px] w-[48px] xl:translate-x-[48px] xl:w-[48px] h-full flex items-center gap-1 xl:gap-2.5 pl-1 xl:pl-2.5 opacity-0 group-hover:opacity-100 peer-focus:opacity-100 transition-opacity">
            <ModalTrigger content={<UpdateEmailModal />}>
              <EditButton />
            </ModalTrigger>
          </div>
        </RowItem>
        <RowItem>
          <span>кошелёк</span>
          <span>{data ? data.wallet : "+"}</span>
        </RowItem>
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center xl:gap-10">
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
