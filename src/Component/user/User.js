import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Profile } from "./../profile/Profile";
import { useQuery } from "@apollo/client";
import { GET_PUBLICATION } from "../../gql/publication";
import { Publications } from "./../Publications/Publications";

export const User = () => {
  const { userName } = useParams();

  const { data, loading, startPolling, stopPolling } = useQuery(
    GET_PUBLICATION,
    {
      variables: { userName },
    }
  );

  useEffect(() => {
    startPolling(1000);

    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return null;

  const dataLength = data.getPublications.length;

  return (
    <div>
      <Profile userName={userName} dataLength={dataLength} />
      <Publications data={data} />
    </div>
  );
};
