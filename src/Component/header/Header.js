import React from "react";
import img from "../../assets/png/instaway.png";
import { Link } from "react-router-dom";
import { RightHeader } from './RightHeader';

const Header = () => {
  return (
    <div className="header ">
      <div className="header__grid contenedor">
        <div className="header__logo">
          <Link to="/">
            <img src={img} alt="logo__header" />
          </Link>
        </div>
        <div className="header__search">
          <p>Search</p>
        </div>
        <div className="header__options">
          <RightHeader/>
        </div>
      </div>
    </div>
  );
};

export default Header;
