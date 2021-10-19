import React from "react";
import { PublicationImage } from "./PublicationImage";

export const Publications = ({ data }) => {
  const { getPublications } = data;
  

  return (
    <div className="publications contenedor">
      <div className="publications__grid">
        {getPublications.map((publi, i) => (
          <div key={i} className="publications__image">
           <PublicationImage publi={publi} />
          </div>
        ))}
      </div>
    </div>
  );
};
