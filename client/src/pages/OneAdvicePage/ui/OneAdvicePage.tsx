import { getOneAdviceThunk } from "@/entities/advice/redux/adviceThunk";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hook";
import { useEffect, type JSX } from "react";
import { useParams } from "react-router";

export function OneAdvicePage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const currentAdvice = useAppSelector((state) => state.advice.currentAdvice);

  useEffect(() => {
    dispatch(getOneAdviceThunk(Number(id)));
  }, [id, dispatch]);
  return (
    <>
      <div>Совет</div>
      <div>{currentAdvice?.title}</div>
      <div>{currentAdvice?.User?.name || "Неизвестный автор"}</div>
    </>
  );
}
