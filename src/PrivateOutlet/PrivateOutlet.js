import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../Shared/Loading/Loading";
import NoMatch from "../Shared/NoMatch/NoMatch";

const PrivateOutlet = () => {
  let location = useLocation();
  let { user, isLoading, admin } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (user?.email === undefined || !user?.email) {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }

  if (admin){
    return <Outlet />;
  }else{
    return <NoMatch />;
  }
  
  
};

export default PrivateOutlet;
