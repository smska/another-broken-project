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
  redirectTo,
}: Props): JSX.Element {
  const redirectPath = redirectTo.split("/").map(Number);
  
  return (
    <div>
      {isAllowed ? children || <Outlet /> : <Navigate to={redirectPath} />}
    </div>
  );
}
