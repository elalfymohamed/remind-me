import { useRoutes } from "react-router-dom";

import { Signin } from "../auth/Signin";
import Home from "../pages/Home";

// private router
import { AuthRoutes } from "./router/AuthRoutes";
import { PrivateRoutes } from "./router/PrivateRoutes";

const Routers = () => {
  const routes = useRoutes([
    {
      element: <PrivateRoutes />,
      children: [{ path: "/", element: <Home /> }],
    },
    {
      element: <AuthRoutes />,
      children: [{ path: "/auth/signin", element: <Signin /> }],
    },
  ]);

  return routes;
};

export default Routers;
