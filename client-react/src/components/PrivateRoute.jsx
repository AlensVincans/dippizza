import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

export const PrivateRoute = ({ roles = [] }) => {
  const { operators } = useContext(AuthContext);
  // console.log(operators[0].role);

  if (!operators) {
    // console.log(currentUser);
    return <Navigate to="login" />;
  }

  if (roles && !roles.includes(operators?.[0].role)) {
    console.log(operators);
    return <Navigate to="*" />;
  }

  return <Outlet />;
};
