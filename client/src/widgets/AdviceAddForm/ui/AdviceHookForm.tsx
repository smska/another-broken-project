import { type JSX, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import type { IRawAdvice } from "../../../entities/advice/model";
import { useAppDispatch } from "@/shared/hooks/hook";
import { createAdviceThunk } from "@/entities/advice/redux/adviceThunk";

export default function AdviceHookForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [submittedCount, setSubmittedCount] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IRawAdvice>({
    defaultValues: { title: "", desc: "" },
    mode: "onTouched",
  });

  useEffect(() => {
    console.log("Form submissions count:", submittedCount);
  }, []);

  const onSubmit = async (data: IRawAdvice): Promise<void> => {
    try {
      setSubmittedCount(submittedCount + 1);
      dispatch(createAdviceThunk(data));
      reset({ title: "", desc: "" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">Заголовок</InputGroup.Text>
        <Form.Control
          {...register("title", {
            required: "Укажите заголовок",
            minLength: { value: 2, message: "Минимум 2 символа" },
          })}
          isInvalid={!!errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {errors.title?.message}
        </Form.Control.Feedback>
      </InputGroup>
      <br />
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Описание
        </InputGroup.Text>
        <Form.Control
          as="textarea"
          rows={3}
          {...register("desc", {
            required: "Добавьте описание",
            minLength: { value: 5, message: "Минимум 5 символов" },
          })}
          isInvalid={!!errors.desc}
        />
        <Form.Control.Feedback type="invalid">
          {errors.desc?.message}
        </Form.Control.Feedback>
      </InputGroup>
      <Button variant="success" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Сохраняю..." : "Добавить совет"}
      </Button>
    </Form>
  );
}
