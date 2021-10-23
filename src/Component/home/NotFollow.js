import { useQuery } from "@apollo/client";
import React from "react";
import { GET_NOT_FOLLOWERS } from "../../gql/follow";
import { Friend } from "./Friend";

export const NotFollow = () => {
  const { data, loading } = useQuery(GET_NOT_FOLLOWERS);

  if (loading) return null;
  const { getNotFollowers } = data;

  console.log("data", getNotFollowers);
  return (
    <>
      {getNotFollowers.map((user, i) => (
        <Friend user={user} key={i} />
      ))}
    </>
  );
};
