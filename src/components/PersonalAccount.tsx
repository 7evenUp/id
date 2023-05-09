import Avatar from "./Avatar"
import Profile from "./Profile"
import Subscription from "./Subscription"
import Referral from "./Referral"

import Button from "./ui/Button"

const PersonalAccount = () => {
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
          <Button appearence="text">выйти из аккаунта</Button>
          <Button appearence="text">деактивировать аккаунт</Button>
        </div>
      </div>
    </div>
  )
}

export default PersonalAccount
