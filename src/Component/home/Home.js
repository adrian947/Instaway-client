import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { StateContext } from "../../hooks/useAuth";
import { VERIFY_TOKEN } from "./../../gql/user";
import { getToken } from "../../helpers/constants";

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

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};
