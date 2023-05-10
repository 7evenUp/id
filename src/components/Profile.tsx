import { useRef } from "react"
import { TbCheck } from "react-icons/tb"

import {
  useUserProfileQuery,
  useUpdateNicknameMutation,
  useUpdateWalletMutation,
} from "@/redux/api/core"

import UpdateEmailModal from "./modals/UpdateEmailModal"

import RowItem from "./RowItem"
import EditButton from "./EditButton"
import ModalTrigger from "./ModalTrigger"

import IconButton from "./ui/IconButton"

import Subheading from "./typography/Subheading"

const Profile = () => {
  const nickNameRef = useRef<HTMLInputElement>(null)
  const walletRef = useRef<HTMLInputElement>(null)

  const { isLoading, data: userProfile, error } = useUserProfileQuery()
  const [updateNickname, { data: nickNameMutation }] = useUpdateNicknameMutation()
  const [updateWallet, { data: walletMutation }] = useUpdateWalletMutation()

  if (userProfile) {
    console.log('Fetched user data: ', userProfile)
  }

  if (error) return <h2 className="text-5xl text-error">Error happened</h2>

  if (isLoading)
    return <h2 className="text-5xl text-process">Data loading...</h2>

  if (nickNameMutation) {
    console.log("nickNameMutation: ", nickNameMutation)
  }

  const changeNickname = () => {
    if (userProfile && nickNameRef.current) {
      if (userProfile.username === nickNameRef.current.value) {
        console.log("Error, apply some changes!")
      } else {
        console.log("New username!", nickNameRef.current.value)
        updateNickname({
          id: userProfile.id,
          username: nickNameRef.current.value,
        })
      }
    }
  }

  const changeWallet = () => {
    if (userProfile && walletRef.current) {
      if (userProfile.username === walletRef.current.value) {
        console.log("Error, apply some changes!")
      } else {
        console.log("New wallet!", walletRef.current.value)
        updateWallet({
          id: userProfile.id,
          username: userProfile.username,
          wallet: walletRef.current.value,
        })
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
            defaultValue={userProfile ? userProfile.username : "Loading..."}
            ref={nickNameRef}
          />
          <div className="absolute right-0 translate-x-[48px] w-[48px] xl:translate-x-[60px] xl:w-[60px] h-full flex items-center gap-1 xl:gap-2.5 pl-1 xl:pl-2.5 opacity-0 group-hover:opacity-100 peer-focus:opacity-100 transition-opacity">
            <EditButton
              onClick={() => {
                nickNameRef.current?.focus()
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
          <span>{userProfile?.email}</span>
          <div className="absolute right-0 translate-x-[48px] w-[48px] xl:translate-x-[60px] xl:w-[60px] h-full flex items-center gap-1 xl:gap-2.5 pl-1 xl:pl-2.5 opacity-0 group-hover:opacity-100 peer-focus:opacity-100 transition-opacity">
            <ModalTrigger content={<UpdateEmailModal />}>
              <EditButton />
            </ModalTrigger>
          </div>
        </RowItem>
        <RowItem className="relative group">
          <span>кошелёк</span>
          <input
            className="peer bg-transparent outline-none text-right"
            defaultValue={userProfile && userProfile.wallet ? userProfile.wallet : "+"}
            ref={walletRef}
          />
          <div className="absolute right-0 translate-x-[48px] w-[48px] xl:translate-x-[60px] xl:w-[60px] h-full flex items-center gap-1 xl:gap-2.5 pl-1 xl:pl-2.5 opacity-0 group-hover:opacity-100 peer-focus:opacity-100 transition-opacity">
            <EditButton
              onClick={() => {
                walletRef.current?.focus()
              }}
            />
            <IconButton
              className="bg-gray-1 hover:bg-gray-2 active:bg-opacity-80 rounded-full"
              onClick={changeWallet}
            >
              <TbCheck className="w-3.5 h-3.5 stroke-gray-5" />
            </IconButton>
          </div>
        </RowItem>
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center xl:gap-10">
          <RowItem className="flex-1">
            <span>discord</span>
            <span>{userProfile ? userProfile.discordUsername : "+"}</span>
          </RowItem>
          <RowItem className="flex-1">
            <span>telegram</span>
            <span>{userProfile ? userProfile.telegramId : "+"}</span>
          </RowItem>
        </div>
      </div>
    </div>
  )
}

export default Profile
