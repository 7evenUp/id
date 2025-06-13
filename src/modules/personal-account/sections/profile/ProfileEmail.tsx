import { useState } from "react"
import { useTranslation } from "react-i18next"

import Bell from "@/assets/icons/bell.svg?react"
import BellOff from "@/assets/icons/bell-off.svg?react"

import UpdateEmail from "../../modals/UpdateEmail"
import AdvertisingConsent from "../../modals/AdvertisingConsent"

import ModalTrigger from "../../components/ModalTrigger"
import EditButton from "../../components/EditButton"
import EditContainer from "../../components/EditContainer"

import RowItem from "@/shared/components/RowItem"
import Tooltip from "@/shared/ui/Tooltip"

import { useUserProfileQuery } from "@/redux/api/profile"

const ProfileEmail = () => {
  const { t } = useTranslation("profile")

  const { data: userProfile } = useUserProfileQuery()

  const { advertisingConsent, email } = userProfile!

  const [consentState, setConsentState] = useState(Boolean(advertisingConsent))
  const [modalOpened, setModalOpened] = useState(false)

  const onChangeAdvertisingClick = () => {
    setModalOpened(true)
  }

  return (
    <>
      <RowItem className="relative group justify-end">
        <div className="flex items-center gap-2 mr-auto">
          <span>{t("profile.email")}</span>
          <Tooltip content={t("Рассылка")}>
            <button
              className="hover:bg-gray-5/50 active:bg-gray-5 dark:hover:bg-gray-1 dark:active:bg-gray-1/70 rounded-full p-1 transition-colors"
              onClick={onChangeAdvertisingClick}
            >
              {consentState ? (
                <Bell className="h-4 w-4" />
              ) : (
                <BellOff className="h-4 w-4" />
              )}
            </button>
          </Tooltip>
        </div>
        <span className="pl-2 overflow-hidden">{email}</span>

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

      <AdvertisingConsent
        open={modalOpened}
        setOpen={setModalOpened}
        consentState={consentState}
        setConsentState={setConsentState}
      />
    </>
  )
}

export default ProfileEmail
