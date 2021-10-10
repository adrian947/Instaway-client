import React from "react";
import { StateContext } from "../../hooks/useAuth";

export const Home = () => {
  const auth = StateContext();

  console.log("aurhome", auth);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};
