import Hello from "@/widgets/Hello/ui/Hello";
import { useState, type JSX } from "react";

export default function QuotePage(): JSX.Element {
  const [userName, setUserName] = useState("");
  const [quote, setQuote] = useState("");
  return (
    <>
      <div>
        <input
          name="userName"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          placeholder="userName"
        ></input>
        <input
          name="quote"
          onChange={(e) => setQuote(e.target.value)}
          value={quote}
          placeholder="quote"
        ></input>
      </div>
      <div>
        {" "}
        <Hello userName={userName} />
      </div>
    </>
  );
}
