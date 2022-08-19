import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoutes = () => {
  const token = false as boolean;

  return token ? <Outlet /> : <Navigate to="auth/sugnin" />;
};
