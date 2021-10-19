import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_COMMENT } from "../../../gql/comment";
import { Link } from "react-router-dom";
import imgNoFound from "../../../assets/png/avatar.png";

export const Comments = ({ publi }) => {
  const { data, loading, startPolling, stopPolling } = useQuery(GET_COMMENT, {
    variables: {
      idPublication: publi.id,
    },
  });

  useEffect(() => {
      startPolling(1000);
      return () => {
        stopPolling();
        };
    }, [startPolling, stopPolling]);
    
    if (loading) return null;
  console.log("data", data);

  return (
    <div className="comment">
      {!loading &&
        data.getComment.map((comment, i) => (
          
            <Link
              key={i}
              to={comment.idUser.userName}
              className="comment__link"
            >
              <img
                src={comment.idUser.avatar || imgNoFound}
                alt={comment.idUser.name}
                className="main__image content__image"
              />
              <div className="comment__conteiner">
                <p className="comment__comment">{comment.comment}</p>
                <p className="comment__userName">{comment.idUser.userName}</p>
                <p className="comment__name">{comment.idUser.name}</p>
              </div>
            </Link>
         
        ))}
    </div>
  );
};
