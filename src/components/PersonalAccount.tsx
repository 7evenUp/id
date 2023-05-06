import Avatar from "./Avatar"
import Profile from "./Profile"
import Subscription from "./Subscription"
import Referral from "./Referral"
import Button from "./ui/Button"

const PersonalAccount = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="typography-head uppercase dark:text-gray-5">
          Личный кабинет
        </h1>
        <Avatar />
      </div>
      <div className="flex flex-col gap-10 w-[433px]">
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
