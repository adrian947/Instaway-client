import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Profile } from "./../profile/Profile";
import { useQuery } from "@apollo/client";
import { GET_PUBLICATION } from "../../gql/publication";
import { Publications } from "./../Publications/Publications";

export const User = () => {
  const { userName } = useParams();
  const [stop, setStop] = useState(false);

  const { data, loading, startPolling, stopPolling } = useQuery(
    GET_PUBLICATION,
    {
      variables: { userName },
    }
  );

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

  if (loading) return null;

  const dataLength = data.getPublications.length;

  return (
    <div>
      <Profile userName={userName} dataLength={dataLength} />
      <Publications data={data} />
    </div>
  );
};
