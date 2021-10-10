import React, { useState } from "react";
import instaway from "../../assets/png/instaway.png";
import { RegisterForm } from "./RegisterForm";
import { LoginForm } from './LoginForm';


export const Auth = () => {
  const [showLogin, setShowLogin] = useState(false);
  

  return (
    <header className="login contenedor">
      <img className="login__logo" src={instaway} alt="logo_instaway" />
      <div className="login__contenido">
        <div className="login__form">
          {showLogin ? <LoginForm/> : <RegisterForm setShowLogin={setShowLogin}/>}
        </div>
        <div className="login__banner">
          {showLogin ? (
            <p
              style={{ cursor: "pointer" }}
              onClick={() => setShowLogin(!showLogin)}
            >
              You do not have an account?
            </p>
          ) : (
            <>
              <div className="login__containerbutton">
                <span>I already have an account!</span>
                <input
                  className="login_inputbutton"
                  type="button"
                  onClick={() => setShowLogin(!showLogin)}
                  value="Sing in"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
