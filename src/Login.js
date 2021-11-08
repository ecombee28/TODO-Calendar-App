import React, { useState } from "react";
import styles from "./Styles/Login.module.css";
import SignInComponent from "./components/signInComponent";
import SignupComponent from "./components/SignupComponent";
import logo from "../src/images/blue_logo.png";

const Login = () => {
  const [signUp, setSignUp] = useState(false);

  const changeModule = (model) => {
    model === "signIn" ? setSignUp(false) : setSignUp(true);
  };
  return (
    <div>
      <div className={styles.main_container}>
        <img src={logo} alt="" className={styles.logo} />
        {!signUp ? (
          <SignInComponent changeView={changeModule} />
        ) : (
          <SignupComponent changeView={changeModule} />
        )}
      </div>
    </div>
  );
};

export default Login;
