import Avatar from "./components/Avatar"
import Header from "./components/Header"
import Profile from "./components/Profile"
import Referral from "./components/Referral"
import Subscription from "./components/Subscription"
import Tabs from "./components/Products"

import Button from "./components/ui/Button"

const App = () => {
  return (
    <div className="w-full min-h-screen font-montserrat text-gray-1 bg-white bg-background-texture dark:bg-black dark:bg-background-texture-dark">
      <div className="px-9 py-8">
        <Header />
        <main className="flex justify-between gap-20">
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
          <Tabs />
        </main>
      </div>
    </div>
  )
}

export default App
