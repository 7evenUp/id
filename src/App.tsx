import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Main from "./routes/Main"

import Header from "./modules/header/Header"

import PaymentError from "./routes/PaymentError"
import PaymentSuccess from "./routes/PaymentSuccess"
import ErrorPage from "./routes/ErrorPage"

import { useAppSelector } from "./redux/hooks"

import { cn } from "./lib/classNames"

import { useLazyLogoutQuery } from "./redux/api/auth"
import { useEffect } from "react"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/payment-error",
    element: <PaymentError />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
    errorElement: <ErrorPage />,
  },
])

// const NEW_YEAR_URL = "https://events.crypton.xyz/"
// const NEW_YEAR_URL_DEV = "https://events-dev.crypton.xyz/"
const WEB3XMS_URL = "https://web3xms.com/"
const WEB3XMS_URL_DEV = "https://dev.web3xms.com/"

const App = () => {
  const scale = useAppSelector((state) => state.scale.value)

  const [logout] = useLazyLogoutQuery()

  useEffect(() => {
    const ref = document.referrer
    if (ref === WEB3XMS_URL || ref === WEB3XMS_URL_DEV) {
      logout()
      location.reload()
    }
  }, [])

  return (
    <div className="w-full min-h-screen font-montserrat text-gray-1 dark:text-gray-5 bg-white bg-background-texture dark:bg-black dark:bg-background-texture-dark">
      <div
        className={cn(
          "px-3 mobile-sm:px-7 xl:px-9 py-8 max-w-[1400px] 2xl:w-[90%] 2xl:max-w-[1728px] mx-auto",
          scale && "3xl:px-[2.344vw] 3xl:py-[2.083vw] 3xl:max-w-[90%]"
        )}
      >
        <Header />
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
