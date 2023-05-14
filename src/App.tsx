import { RouterProvider, createBrowserRouter } from "react-router-dom"

import Root from "./routes/Root"
import Auth from "./routes/Auth"
import Index from "./routes/Index"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "/auth",
        element: <Auth />,
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
