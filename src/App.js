import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import { Auth } from "./Component/auth/Auth";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  // eslint-disable-next-line
  const [auth, setAuth] = useState({ name: "adrian" });

  return (
    <ApolloProvider client={client}>
      <div className="app">{auth ? <Auth /> : <h1>User No logueado</h1>}</div>
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
    </ApolloProvider>
  );
};
