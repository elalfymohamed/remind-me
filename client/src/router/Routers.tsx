import { useRoutes } from "react-router-dom";

import Home from "../pages/Home";

const Routers = () => {
  const routes = useRoutes([{ path: "/", element: <Home /> }]);

  return routes;
};

export default Routers;
