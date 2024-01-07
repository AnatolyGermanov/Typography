import { createBrowserRouter } from "react-router-dom"

import RequireAuth from "../../hoc/RequireAuth"

import Main from "../../pages/Main/Main"
import Orders from "../../pages/Orders/Orders"
import Clients from "../../pages/Clients/Clients"

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/orders",
      element: <RequireAuth><Orders /></RequireAuth>,
    },
    {
      path: "/clients",
      element: <RequireAuth><Clients /></RequireAuth>,
    },
])

export default router