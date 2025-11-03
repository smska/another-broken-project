import { CLIENT_ROUTES } from "@/shared/enums/client_routes";
import { type JSX } from "react";
import { Navigate, Outlet } from "react-router";

type Props = {
  children?: JSX.Element;
  isAllowed: boolean;
  redirectTo: string;
};

export default function ProtectedRouter({
  children,
  isAllowed,
}: Props): JSX.Element {
  
  return (
    <div>
      {isAllowed ? children || <Outlet /> : <Navigate to={CLIENT_ROUTES.HOME} />}
    </div>
  );
}
