import { useCallback, useEffect, useState, type JSX } from "react";
import AdviceCard from "@/widgets/AdviceCard/ui/AdviceCard";
import { Button, Row } from "react-bootstrap";
import AdviceHookForm from "@/widgets/AdviceAddForm/ui/AdviceHookForm";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hook";
import {
  deleteAdviceThunk,
  getAllAdviceThunk,
} from "@/entities/advice/redux/adviceThunk";
import { sortedByTitle } from "@/entities/advice/redux/adviceSlice";

export function AdvicePage(): JSX.Element {
  const [isGreen, setIsGreen] = useState(false);
  const { status, user } = useAppSelector((state) => state.user);
  const adviceArr = useAppSelector((state) => state.advice.adviceArr);
  const dispatch = useAppDispatch();

  const deleteHandler = async (id: number): Promise<void> => {
    dispatch(deleteAdviceThunk(id));
    console.log("Deleted advice with id:", id, "from array:", adviceArr);
  };

  const memoDeleteHandler = useCallback((id: number) => {
    deleteHandler(id);
  }, []);

  const userObj = user ? { id: user.id, name: user.name } : null;

  useEffect(() => {
    document.title = "Советы";
    dispatch(getAllAdviceThunk());
  }, [dispatch, adviceArr]);
  return (
    <>
      {status === "logged" && (
        <Row>
          <AdviceHookForm />
        </Row>
      )}

      <br />
      <Button onClick={() => dispatch(sortedByTitle())}>По алфавиту</Button>
      <br />
      <h1
        style={{
          textAlign: "center",
          color: isGreen ? "green" : "red",
          cursor: "pointer",
        }}
        onClick={() => setIsGreen((prev) => !prev)}
      >
        Советы по психологии
      </h1>
      <br />
      <Row>
        {adviceArr.length && adviceArr.map((advice, index) => (
          <AdviceCard
            key={index}
            advice={advice}
            user={userObj}
            deleteHandler={memoDeleteHandler}
          />
        ))}
      </Row>
    </>
  );
}
