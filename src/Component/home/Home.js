import React, { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { StateContext } from "../../hooks/useAuth";
import { VERIFY_TOKEN } from "./../../gql/user";
import { getToken } from "../../helpers/constants";
import { GET_PUBLICATION_FOLLOWERS } from "../../gql/publication";
import Feed from "./Feed";
import { NotFollow } from "./NotFollow";

export const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const { logOut } = StateContext();
  const token = getToken();
  const [verifyToken] = useMutation(VERIFY_TOKEN);

  useEffect(() => {
    const verify = async (token) => {
      const { data } = await verifyToken({
        variables: {
          input: {
            token: token,
          },
        },
      });

      if (!data.verifyToken) {
        logOut();
      }
    };

    verify(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, loading } = useQuery(GET_PUBLICATION_FOLLOWERS);

  if (loading) return null;
  const { getPublicationsFolloweds } = data;
  return (
    <>
      <div className="home">
        <div className="home__left">
          <h2 className="feeds__title">Friends posts</h2>
          <div className="container__scroll">
            {getPublicationsFolloweds.map((publi, i) => (
              <Feed publi={publi} key={i} />
            ))}
          </div>
        </div>
        <div className="home__right">
          <h2 className="feeds__title">Follow more friends</h2>
          <div className="container__scroll">
            <NotFollow />
          </div>
        </div>
      </div>
    </>
  );
};
