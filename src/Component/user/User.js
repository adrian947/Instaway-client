import React from "react";
import { useParams } from "react-router-dom";
import { Profile } from "./../profile/Profile";

export const User = () => {
  const { userName } = useParams();

  return (
    <div>
      <Profile userName={userName} />
    </div>
  );
};
