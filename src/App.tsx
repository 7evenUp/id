import Avatar from "./components/Avatar"
import Profile from "./components/Profile"
import Referral from "./components/Referral"
import Subscription from "./components/Subscription"

const App = () => {
  return (
    <div className="w-full min-h-screen bg-white bg-background-texture">
      <div className="px-9">
        <header className="flex justify-between items-center">
          <a href="#">Назад к сайту</a>
          <div>
            <span>изменить язык</span>
            <span>изменить тему</span>
          </div>
        </header>
        <main className="flex">
          <div>
            <div className="flex justify-between">
              <h1>Личный кабинет</h1>
              <Avatar />
            </div>
            <div className="flex flex-col gap-10 w-[433px]">
              <Profile />
              <Subscription />
              <Referral />

              <div className="flex justify-between">
                <button>выйти из аккаунта</button>
                <button>деактивировать аккаунт</button>
              </div>
            </div>
          </div>
          <div></div>
        </main>
      </div>
    </div>
  )
}

export default App
