import React from "react";
import { GET_FOLLOW, FOLLOW, UNFOLLOW } from "../../gql/follow";
import { useQuery, useMutation } from "@apollo/client";

export const HeaderProfile = ({ userName, auth, getUser, openModal }) => {
  const { data, loading, refetch } = useQuery(GET_FOLLOW, {
    variables: {
      userName: getUser.userName,
    },
  });

  const [follow] = useMutation(FOLLOW);
  const [unFollow] = useMutation(UNFOLLOW);

  const handleFollow = async () => {
    try {
      const resp = await follow({
        variables: {
          userName: getUser.userName,
        },
      });
      refetch();
      console.log("res", resp);
    } catch (error) {
      console.log(error);
    }
  };
  const handleunFollow = async () => {
    try {
      const resp = await unFollow({
        variables: {
          userName: getUser.userName,
        },
      });
      refetch();
      console.log("res", resp);
    } catch (error) {
      console.log(error);
    }
  };

  const buttonFollow = () => {
    if (data.isFollow) {
      return <button className="headerProfile__button--un" onClick={handleunFollow}>Unfollow</button>;
    } else {
      return (
        <button className="headerProfile__button" onClick={handleFollow}>
          Follow
        </button>
      );
    }
  };

  return (
    <div className="headerProfile">
      <h2>{userName}</h2>
      {auth.userName === getUser.userName ? (
        <button
          className="headerProfile__button"
          onClick={() => openModal("setting")}
        >
          Setting
        </button>
      ) : (
        !loading && buttonFollow()
      )}
    </div>
  );
};
