import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import Context from "../context/AuthProvider";

const RequireAuthState = ({ allowedRoles }) => {
  const { auth } = useContext(Context);
  const location = useLocation();

  return auth?.token ? (
    <Outlet />
  ) : (
    <Navigate
      to='/signin'
      state={{ from: location }}
      replace
    />
  );
};

export default RequireAuthState;
