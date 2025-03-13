import { Navigate, useLocation } from "react-router-dom";
import { JSX, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  // Allow access to register page even if the user is not logged in
  if (location.pathname === "/register") {
    return children;
  }

  return auth?.user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;