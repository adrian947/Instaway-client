import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_FOLLOW, GET_ALL_FOLLOWING } from "../../gql/follow";
import { ModalBasic } from "./../modal/modalBasic/ModalBasic";
import { UsersFollows } from "./listUserFollow/UsersFollows";
import { UserFollowings } from "./listUserFollow/UserFollowings";

export const Followers = ({ userName, dataLength }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [children, setChildrenModal] = useState(null);
  const [stop, setStop] = useState(false);
  const [stop1, setStop1] = useState(false);

  const {
    data,
    loading,
    startPolling: startPollingFollowers,
    stopPolling: stopPollingFollowers,
  } = useQuery(GET_ALL_FOLLOW, {
    variables: {
      userName: userName,
    },
  });

  const {
    data: allDataFollowing,
    loading: loadingFollowing,
    startPolling: startPollingFollowing,
    stopPolling: stopPollingFollowing,
  } = useQuery(GET_ALL_FOLLOWING, {
    variables: {
      userName: userName,
    },
  });

  useEffect(() => {
    if (!stop1) {
      startPollingFollowers(10000);
    }
    setTimeout(() => {
      setStop1(true);
    }, 300000);
    
    return () => {
      stopPollingFollowers();
      setStop1(true);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stop]);

  useEffect(() => {
    if (!stop) {
      startPollingFollowing(10000);
    }
    setTimeout(() => {
      setStop(true);
    }, 300000);
    
    return () => {
      stopPollingFollowing();
      setStop(true);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stop]);

  const handleModalFollowers = () => {
    setShow(true);
    setTitle("Followers");
    setChildrenModal(<UsersFollows data={data} setShow={setShow} />);
  };
  const handleModalFollowing = () => {
    setShow(true);
    setTitle("Followings");
    setChildrenModal(
      <UserFollowings allDataFollowing={allDataFollowing} setShow={setShow} />
    );
  };

  return (
    <>
      <div className="Followers">
        <p>
          <span>{dataLength}</span>publications
        </p>
        <p className="link" onClick={handleModalFollowers}>
          {!loading && <span>{data.getAllFollow.length}</span>}
          followers
        </p>
        <p className="link" onClick={handleModalFollowing}>
          {!loadingFollowing && (
            <span>{allDataFollowing.getAllFollowing.length}</span>
          )}
          Following
        </p>
      </div>
      <ModalBasic show={show} setShow={setShow} title={title}>
        {children}
      </ModalBasic>
    </>
  );
};
