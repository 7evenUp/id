import { lazy, Suspense, useEffect } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { sendEvent, init } from "web-analytics-crypton"

import Header from "./modules/header/Header"

const Main = lazy(() => import("./routes/Main"))
const PaymentError = lazy(() => import("./routes/PaymentError"))
const PaymentSuccess = lazy(() => import("./routes/PaymentSuccess"))
const ErrorPage = lazy(() => import("./routes/ErrorPage"))
const TermsOfUse = lazy(() => import("./routes/TermsOfUse"))
const PrivacyPolicy = lazy(() => import("./routes/PrivacyPolicy"))

import SkeletonLayout from "./components/SkeletonLayout"

import { useAppSelector } from "./redux/hooks"

import { cn } from "./lib/classNames"
import Button from "./shared/ui/Button"

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
  {
    path: "/terms-of-use",
    element: <TermsOfUse />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
    errorElement: <ErrorPage />,
  },
])

const App = () => {
  const scale = useAppSelector((state) => state.scale.value)

  useEffect(() => {
    init({
      url: "https://api.metrics-dev.crypton.xyz/event",
      client: "web",
      clientType: "site",
      serviceName: "id",
    })
  }, [])

  return (
    <div className="w-full min-h-screen font-montserrat text-gray-1 dark:text-gray-5 bg-white bg-background-texture dark:bg-black dark:bg-background-texture-dark">
      <div
        className={cn(
          "flex flex-col min-h-screen px-3 mobile-sm:px-4 mobile:px-7 xl:px-9 py-8 max-w-[1400px] 2xl:w-[90%] 2xl:max-w-[1728px] mx-auto",
          scale && "3xl:px-[2.344vw] 3xl:py-[2.083vw] 3xl:max-w-[90%]"
        )}
      >
        <Header />

        <Button
          className="my-5 w-fit"
          onClick={() => {
            sendEvent({
              name: "click-something",
              payload: {},
              email: null,
              evmWallet: null,
              telegramId: null,
              tonWallet: null,
              userId: null,
            })
          }}
        >
          Send analytics event
        </Button>

        <Suspense
          fallback={
            <main className="flex flex-col lg:flex-row justify-between pb-32 md:pb-10 lg:pb-0 gap-20">
              <SkeletonLayout />
            </main>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </div>
    </div>
  )
}

export default App
