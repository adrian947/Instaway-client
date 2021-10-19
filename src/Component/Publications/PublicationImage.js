import React, { useState } from "react";
import { ModalPublication } from "../modal/modalPublication/ModalPublication";

export const PublicationImage = ({ publi }) => {
  const [state, setstate] = useState(false);

  return (
    <>
      <div onClick={() => setstate(true)}>
        <img src={publi.file} alt={publi.id} />
      </div>
      <ModalPublication state={state} setstate={setstate} publi={publi} />
    </>
  );
};
