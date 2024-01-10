import { createBrowserRouter } from "react-router-dom"

import RequireAuth from "../../hoc/RequireAuth"

import Main from "../../pages/Main/Main"
import Orders from "../../pages/Orders/Orders"
import Clients from "../../pages/Clients/Clients"
import OrderDetails from "../../pages/OrderDetails/OrderDetails"

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/clients/",
      element: <RequireAuth><Clients /></RequireAuth>,
    },
    {
      path: "/orders/",
      element: <RequireAuth><Orders /></RequireAuth>,
    },
    {
      path: "/orders/details/",
      element: <RequireAuth><OrderDetails /></RequireAuth>,
    },
])

export default router