import React from "react";
import { Link } from "react-router-dom";
import error404 from "../../assets/png/error404.png";

export const UserNotFound = () => {
  return (
    <div className="userNot">
      <img src={error404} alt="error404" />
      <h1 className="userNot__title">User not Found</h1>
      <p className="user__description">
        Is posible that user is incorrect or user es deleted
      </p>
      <Link to="/">To back</Link>
    </div>
  );
};
