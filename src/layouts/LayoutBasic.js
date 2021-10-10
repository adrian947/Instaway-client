import React from "react";
import Header from './../Component/header/Header';

export const LayoutBasic = (props) => {
  const { children } = props;

  return (
    <div>
      <Header />
      <div className="contenedor"> {children}</div>
    </div>
  );
};
