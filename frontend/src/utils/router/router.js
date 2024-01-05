import { createBrowserRouter } from "react-router-dom"

import RequireAuth from "../../hoc/RequireAuth"

import Main from "../../pages/Main/Main"
import Orders from "../../pages/Orders/Orders"

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/orders",
      element: <RequireAuth><Orders /></RequireAuth>,
    },
])

export default router