import PersonalAccount from "./modules/personal-account/PersonalAccount"
import Products from "./modules/products/Products"
import Header from "./modules/header/Header"
import Auth from "./modules/auth/Auth"

import SkeletonLayout from "./components/SkeletonLayout"

import { useUserProfileQuery } from "./redux/api/core"

const App = () => {
  const { isLoading, data, error } = useUserProfileQuery()

  if (error) console.log(error)

  return (
    <div className="w-full min-h-screen font-montserrat text-gray-1 dark:text-gray-5 bg-white bg-background-texture dark:bg-black dark:bg-background-texture-dark">
      <div className="px-7 xl:px-9 py-8">
        <Header />
        <main className="flex flex-col lg:flex-row justify-between gap-20">
          {isLoading ? (
            <SkeletonLayout />
          ) : data ? (
            <>
              <PersonalAccount />
              <Products />
            </>
          ) : error && error.status === 401 ? (
            <Auth />
          ) : (
            <h1>Неизвестная ошибка. Зайдите позже:)</h1>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
