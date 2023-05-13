import React from "react"

import UpdateEmail from "../../modals/UpdateEmail"

import ModalTrigger from "../../components/ModalTrigger"
import EditButton from "../../components/EditButton"

import RowItem from "@/shared/components/RowItem"

import { User } from "@/types/types"

const ProfileEmail: React.FC<User> = ({ email }) => {
  return (
    <RowItem className="relative group">
      <span>почта</span>
      <span>{email}</span>
      <div className="absolute right-0 translate-x-[48px] w-[48px] xl:translate-x-[60px] xl:w-[60px] h-full flex items-center gap-1 xl:gap-2.5 pl-1 xl:pl-2.5 opacity-0 group-hover:opacity-100 peer-focus:opacity-100 transition-opacity">
        <ModalTrigger content={<UpdateEmail />}>
          <EditButton />
        </ModalTrigger>
      </div>
    </RowItem>
  )
}

export default ProfileEmail
