import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { StateContext } from "./../../hooks/useAuth";
import imgNoFound from "../../assets/png/avatar.png";
import { GET_USER } from "../../gql/user";
import { useQuery } from "@apollo/client";
import { ModalUpload } from "./../modal/modalUpload/ModalUpload";

export const RightHeader = () => {
  const [show, setShow] = useState(false);

  const { auth } = StateContext();
  const { userName } = auth;

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      userName: userName,
    },
  });
  if (loading || error) return null;
  const { getUser } = data;

  const handleOpenModalUpload = ()=>{
    setShow(true)
  }

  return (
    <>
      <div className="right">
        <div className="right__flex">
          <Link to="/">
            <Icon name="home" className="right__icon" />
          </Link>
          <Icon name="plus" className="right__icon" onClick={handleOpenModalUpload} />
          <Link to={`/${userName}`} className="right__containImage">
            <img
              src={getUser.avatar ? getUser.avatar : imgNoFound}
              alt="avatar"
              className="right__image"
            />
          </Link>
        </div>
      </div>
      <ModalUpload show={show} setShow={setShow} />
    </>
  );
};
