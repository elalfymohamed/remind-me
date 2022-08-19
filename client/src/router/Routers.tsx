import { useRoutes } from "react-router-dom";

import { SignIn } from "../auth/SignIn";
import { SignUp } from "../auth/SignUp";

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
      children: [
        { path: "/auth/signin", element: <SignIn /> },
        { path: "/auth/signup", element: <SignUp /> },
      ],
    },
  ]);

  return routes;
};

export default Routers;
