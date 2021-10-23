import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_LIKE, COUNT_LIKE, DELETE_LIKE, IS_LIKE } from "../../../gql/like";

export const Actions = ({ publi }) => {
  const [stop, setStop] = useState(false);
  const [stop1, setStop1] = useState(false);
  const [addLike] = useMutation(ADD_LIKE);
  const [deleteLike] = useMutation(DELETE_LIKE);

  const { data, loading, startPolling, stopPolling, refetch } = useQuery(
    IS_LIKE,
    {
      variables: {
        idPublication: publi.id,
      },
    }
  );
  const { data: dataCount, loading: loadingCount, startPolling : startPollingCount , stopPolling: stopPollingCount } = useQuery(COUNT_LIKE, {
    variables: {
      idPublication: publi.id,
    },
  });

  useEffect(() => {
    if (!stop) {
      startPolling(1000);
    }
    setTimeout(() => {
      setStop(true);
    }, 10000);

    return () => {
      stopPolling();
      setStop(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stop]);

  useEffect(() => {
    if (!stop1) {
      startPollingCount(1000);
    }
    setTimeout(() => {
      setStop1(true);
    }, 10000);

    return () => {
      stopPollingCount();
      setStop1(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stop1]);

  const handleAddLike = async () => {
    try {
      await addLike({
        variables: {
          idPublication: publi.id,
        },
      });
      refetch();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDeleteLike = async () => {
    try {
      await deleteLike({
        variables: {
          idPublication: publi.id,
        },
      });

      refetch();
    } catch (error) {
      console.log("error", error);
    }
  };

  if (loading) return null;
  if (loadingCount) return null;
  const { isLike } = data;

  return (
    <div className="actions">
      <Icon
        name={isLike ? "heart" : "heart outline"}
        className={isLike ? "actions__heart active" : "actions__heart"}
        onClick={!isLike ? handleAddLike : handleDeleteLike}
      />
      <p className="actions__number">{dataCount.countLike}</p>
    </div>
  );
};
