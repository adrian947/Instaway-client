import React from 'react'
import { Link } from "react-router-dom";

export const Friend = ({user}) => {
    console.log('publi', user )
    return (
        <div className="card">

        <div className="card__user">
        <Link to={user.userName}>
          <img
            src={user.avatar}
            alt={user.name}
            className="main__image content__image"
          />
        </Link>
        <div className="card__text">
          <p className="card__name">{user.name}</p>
          <p className="card__userName">{user.userName}</p>
        </div>
      </div>
        </div>
    )
}
