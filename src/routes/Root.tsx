import { Outlet } from "react-router-dom"

import Header from "@/modules/header/Header"

const Root = () => {
  return (
    <div className="w-full min-h-screen font-montserrat text-gray-1 dark:text-gray-5 bg-white bg-background-texture dark:bg-black dark:bg-background-texture-dark">
      <div className="px-7 xl:px-9 py-8">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default Root
