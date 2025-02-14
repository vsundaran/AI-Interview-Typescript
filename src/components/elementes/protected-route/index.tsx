import { ReactNode } from "react";
import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const subRoute = location.pathname.split("/")[1]; // Get the first part after "/"

  if (subRoute === "candidate") {
    const candidateToken = Cookies.get("candidateToken");
    if (!candidateToken) return <Navigate to={"/candidate/signin"} />;
  } else if (subRoute === "organisation") {
    const organisationToken = Cookies.get("organisationToken");
    if (!organisationToken) return <Navigate to={"/organisation/signin"} />;
  }

  return children;
}
