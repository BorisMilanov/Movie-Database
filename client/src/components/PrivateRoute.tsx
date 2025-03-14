import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { JSX } from "react/jsx-runtime";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const auth = useContext(AuthContext);

  if (auth?.user === undefined) {
    return <div>Loading...</div>; // Prevents flashing issues
  }

  return auth?.user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
