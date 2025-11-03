import React, { type JSX } from "react";

interface HelloProps {
  userName: string;
  age?: number;
}

function Hello({ userName }: HelloProps): JSX.Element {
  return <h1>{userName && `Привет, ${userName}`}</h1>;
}

export default React.memo(Hello);
