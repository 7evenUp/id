import UpdateEmail from "../../modals/UpdateEmail"

import ModalTrigger from "../../components/ModalTrigger"
import EditButton from "../../components/EditButton"
import EditContainer from "../../components/EditContainer"

import RowItem from "@/shared/components/RowItem"

import { useUserProfileQuery } from "@/redux/api/core"

const ProfileEmail = () => {
  const { data: userProfile } = useUserProfileQuery()

  if (!userProfile) return null

  return (
    <RowItem className="relative group justify-end">
      <span className="mr-auto">почта</span>
      <span>{userProfile.email}</span>

      {/* Mobile editing */}
      <div className="sm:hidden ml-6">
        <ModalTrigger content={<UpdateEmail />}>
          <EditButton />
        </ModalTrigger>
      </div>

      {/* Desktop editing */}
      <EditContainer className="hidden sm:flex">
        <ModalTrigger content={<UpdateEmail />}>
          <EditButton />
        </ModalTrigger>
      </EditContainer>
    </RowItem>
  )
}

export default ProfileEmail
