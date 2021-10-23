import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Actions } from "../modal/modalPublication/Actions";
import { ModalPublication } from "../modal/modalPublication/ModalPublication";
import { CommentForm } from "./../modal/modalPublication/CommentForm";

const Feed = ({ publi }) => {
  const [state, setstate] = useState(false);

  return (
    <div className="card contenedor">
      <div className="card__content">
        <div className="card__user">
          <Link to={publi.idUser.userName}>
            <img
              src={publi.idUser.avatar}
              alt={publi.idUser.name}
              className="card__img main__image content__image"
            />
          </Link>
          <div className="card__text">
            <p className="card__name">{publi.idUser.name}</p>
            <p className="card__userName">{publi.idUser.userName}</p>
          </div>
        </div>
        <img
          src={publi.file}
          alt={publi.createAt}
          className="card__img"
          onClick={() => setstate(true)}
        />
      </div>
      <div className="card__action">
        <Actions publi={publi} />
      </div>
      <div className="card__comment">
        <CommentForm publi={publi} />
      </div>
      <ModalPublication state={state} setstate={setstate} publi={publi} />
    </div>
  );
};

export default Feed;
