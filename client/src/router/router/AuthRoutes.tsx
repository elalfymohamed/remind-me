import { Outlet, Navigate } from "react-router-dom";

export const AuthRoutes = () => {
  const token = true as boolean;

  return token ? <Outlet /> : <Navigate to="/" />;
};
