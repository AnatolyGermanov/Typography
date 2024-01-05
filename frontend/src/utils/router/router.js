import { createBrowserRouter } from "react-router-dom"

import Main from "../../pages/Main/Main"
import Orders from "../../pages/Orders/Orders"

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/orders",
      element: <Orders />,
    }
])

export default router