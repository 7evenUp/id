import Deactivation from "./modals/Deactivation"

import Avatar from "./components/Avatar"
import ModalTrigger from "./components/ModalTrigger"

import Profile from "./sections/profile/Profile"
import Subscription from "./sections/Subscription"
import Referral from "./sections/Referral"

import Button from "@/shared/ui/Button"
import { useLazyLogoutQuery } from "@/redux/api/auth"

const PersonalAccount = () => {

  const [trigger, {isSuccess, isError, data}] = useLazyLogoutQuery()

  if (isSuccess) console.log('SUCCESS!')
  if (isError) console.log('Error!')
  if (data) console.log(data)

  const onLogout = async () => {
    const res = await fetch("https://union-api.crypton.xyz/api/v1/users/logout/", {credentials: 'include'})

    const json = await res.json()
    console.log(json)
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="typography-head uppercase dark:text-gray-5 text-center w-full sm:text-left mb-10 sm:mb-0">
          Личный кабинет
        </h1>
        <div className="hidden sm:block">
          <Avatar />
        </div>
      </div>
      <div className="flex flex-col gap-10 w-full sm:px-12 lg:px-0 lg:w-[350px] xl:w-[433px]">
        <Profile />
        <Subscription />
        <Referral />

        <div className="flex justify-between">
          <Button appearence="text" onClick={onLogout}>выйти из аккаунта</Button>
          <ModalTrigger content={<Deactivation />}>
            <Button appearence="text">деактивировать аккаунт</Button>
          </ModalTrigger>
        </div>
      </div>
    </div>
  )
}

export default PersonalAccount
