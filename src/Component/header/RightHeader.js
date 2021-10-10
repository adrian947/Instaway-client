import React from "react";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { StateContext } from "./../../hooks/useAuth";
import imgNoFound from "../../assets/png/avatar.png";
import { GET_USER } from "../../gql/user";
import { useQuery } from "@apollo/client";

export const RightHeader = () => {
  const { auth } = StateContext();
  const { userName } = auth;

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      userName: userName,
    },
  });
  if (loading || error) return null;
  const { getUser } = data;

  return (
    <div className="right">
      <div className="right__flex">
        <Link to="/">
          <Icon name="home" className="right__icon" />
        </Link>
        <Icon name="plus" className="right__icon" />
        <Link to={`/${userName}`}>
          <img
            src={getUser.avatar ? getUser.avatar : imgNoFound}
            alt="avatar"
            className="right__image"
          />
        </Link>
      </div>
    </div>
  );
};
