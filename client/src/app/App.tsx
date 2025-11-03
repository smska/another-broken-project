import { useEffect, type JSX } from "react";
import Router from "./Router/Router";
import { useAppDispatch } from "@/shared/hooks/hook";
import { refreshAsyncThunk } from "@/entities/user/redux/userThunk";

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const result = dispatch(refreshAsyncThunk());
    return result.abort;
  }, [dispatch]);
  
  return (
    <>
      <Router />
    </>
  );
}

export default App;
