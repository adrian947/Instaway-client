import React, { useState, useEffect, useMemo } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import { Auth } from "./Component/auth/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { decodeToken, getToken, removeToken } from "./helpers/constants";
import { AuthContext } from "./context/AuthContext";
import { Navigation } from "./routes/Navigation";

export const App = () => {
  // eslint-disable-next-line

  const [auth, setAuth] = useState(undefined);
  const [urlImage, setUrlImage] = useState("");

  useEffect(() => {
    const token = getToken();

    // console.log('token', token )

    if (!token) {
      setAuth(null);
    } else {
      const decoded = decodeToken(token);
      setAuth(decoded);
    }
  }, []);

  const logOut = () => {
    removeToken();
    setAuth(null);
  };

  const setUser = (user) => {
    setAuth(user);
  };
  const setImage = (url) => {
    setUrlImage(url);
  };
  const authData = useMemo(
    () => ({
      auth,
      urlImage,
      logOut,
      setUser,
      setImage,
    }),
    [auth, urlImage]
  );

  if (auth === undefined) return null;

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
        <div className="app">{!auth ? <Auth /> : <Navigation />}</div>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthContext.Provider>
    </ApolloProvider>
  );
};
