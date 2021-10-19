import React from "react";
import imgNoFound from "../../../assets/png/avatar.png";
import { useHistory } from "react-router-dom";

export const UsersFollows = ({ data, setShow }) => {
  const history = useHistory();

  console.log("data", data);

  const goUSer = (userName) => {
    history.push(userName);
    setShow(false);
  };

  return (
    <div className="followModal">
      {data.getAllFollow.length > 0 ? (
        data.getAllFollow.map((d, i) => (
          <div
            key={i}
            className="followModal__container"
            onClick={() => goUSer(d.userName)}
          >
            <img
              src={d.avatar || imgNoFound}
              alt={d.name}
              className="main__image content__image"
            />
            <div>
              <p>{d.name}</p>
              <p className="followModal__userName">{d.userName}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="noFollow">
          <p>You have no followers</p>
        </div>
      )}
    </div>
  );
};
