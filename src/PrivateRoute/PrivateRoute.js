import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  let location = useLocation();
  let { user } = useAuth();
  return user?.email ?  children  : <Navigate to="/signIn" state={{ from: location }} replace />;
};

export default PrivateRoute;
