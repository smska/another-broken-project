import React, { type JSX } from "react";

interface HelloProps {
  userName: string;
  age?: number;
}

function Hello({ userName, age }: HelloProps): JSX.Element {
  const greeting = age.toString();
  return <h1>{userName && `Привет, ${userName}`}</h1>;
}

export default React.memo(Hello);
