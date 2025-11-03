import { type JSX } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "../Layout/Layout";
import {
  AdvicePage,
  LoginPage,
  MainPage,
  OneAdvicePage,
  SignUpPage,
} from "@/pages";
import { CLIENT_ROUTES } from "@/shared/enums/client_routes";
import ProtectedRouter from "@/shared/HOCs/ProtectedRouter/ui/ProtectedRouter";
import { useAppSelector } from "@/shared/hooks/hook";
import QuotePage from "@/pages/QuotePage/ui/QuotePage";

export default function Router(): JSX.Element {
  const status = useAppSelector((state) => state.user.status);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={CLIENT_ROUTES.HOME} element={<MainPage />} />
          <Route path={CLIENT_ROUTES.ADVICE} element={<AdvicePage />} />
          <Route
            element={
              <ProtectedRouter
                isAllowed={status !== "logged"}
                redirectTo={CLIENT_ROUTES.HOME}
              />
            }
          >
            <Route path={CLIENT_ROUTES.SIGN_UP} element={<SignUpPage />} />
            <Route path={CLIENT_ROUTES.LOGIN} element={<LoginPage />} />
          </Route>
          <Route path={CLIENT_ROUTES.ONEADVICE} element={<OneAdvicePage />} />
          <Route path={CLIENT_ROUTES.QUOTE} element={<QuotePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
