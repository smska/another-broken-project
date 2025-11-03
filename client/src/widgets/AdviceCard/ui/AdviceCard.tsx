import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import React, { type JSX } from "react";
import type { IAdvice } from "../../../entities/advice/model";
import { Button } from "react-bootstrap";
import { Link } from "react-router";
import { CLIENT_ROUTES } from "@/shared/enums/client_routes";
import type { IUserDB } from "@/entities/user/model";

type Props = {
  advice: IAdvice;
  deleteHandler: (id: number) => Promise<void>;
  user: IUserDB | null;
};

function AdviceCard({ advice, deleteHandler, user }: Props): JSX.Element {
  const adviceArray = [advice];
  const firstAdvice = adviceArray.find((a) => a.id === advice.id);
  const adviceId = firstAdvice.id.toString();

  return (
    <Col xs={12} md={6}>
      <Card>
        <Card.Body>
          <Card.Img src="/eagle.jpg" alt="Card image" />
          <Card.Title>{advice.title}</Card.Title>
          <Card.Text>{advice.desc}</Card.Text>
          {user?.id === advice.authorId && (
            <Button 
              variant="danger" 
              onClick={() => deleteHandler(adviceId)}
              className="me-2"
            >
              Удалить
            </Button>
          )}

          <Link to={CLIENT_ROUTES.ADVICE + "/" + advice.id}>
            <Button variant="warning">Подробнее</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default React.memo(AdviceCard);
