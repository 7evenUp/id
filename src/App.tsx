import Header from "./modules/header/Header"
import PersonalAccount from "./modules/personal-account/PersonalAccount"
import Products from "./modules/products/Products"

import SkeletonLayout from "./components/SkeletonLayout"

import { useUserProfileQuery } from "./redux/api/core"

const App = () => {
  const { isLoading, data, error } = useUserProfileQuery()

  if (error) console.log("Error while fetching profile data: ", error)

  return (
    <div className="w-full min-h-screen font-montserrat text-gray-1 bg-white bg-background-texture dark:bg-black dark:bg-background-texture-dark">
      <div className="px-7 xl:px-9 py-8">
        <Header />
        <main className="flex flex-col lg:flex-row justify-between gap-20">
          {isLoading ? (
            <SkeletonLayout />
          ) : (
            data && (
              <>
                <PersonalAccount />
                <Products />
              </>
            )
          )}
        </main>
      </div>
    </div>
  )
}

export default App
