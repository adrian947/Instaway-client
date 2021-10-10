import React from "react";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { StateContext } from "./../../hooks/useAuth";
import imgNoFound from "../../assets/png/avatar.png";

export const RightHeader = () => {
  const { auth } = StateContext();
  const { userName } = auth;

  return (
    <div className="right">
      <div className="right__flex">
        <Link to="/">
          <Icon name="home" className="right__icon" />
        </Link>
        <Icon name="plus" className="right__icon" />
        <Link to={`/${userName}`}>
          <img src={imgNoFound} alt="avatar" className="right__image" />
        </Link>
      </div>
    </div>
  );
};
