import React from "react"

import UpdateEmail from "../../modals/UpdateEmail"

import ModalTrigger from "../../components/ModalTrigger"
import EditButton from "../../components/EditButton"
import EditContainer from "../../components/EditContainer"

import RowItem from "@/shared/components/RowItem"

import { User } from "@/types/types"

const ProfileEmail: React.FC<User> = ({ email }) => {
  return (
    <RowItem className="relative group">
      <span>почта</span>
      <span>{email}</span>
      <EditContainer>
        <ModalTrigger content={<UpdateEmail />}>
          <EditButton />
        </ModalTrigger>
      </EditContainer>
    </RowItem>
  )
}

export default ProfileEmail
