import React, { useState } from "react";
import styles from "../Styles/Components_Style/signIn.module.css";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Loader from "react-loader-spinner";

const SignInComponent = ({ changeView }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const updateUserName = (e) => {
    setUserName(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleFormValidation = () => {
    let error = false;

    if (userName.length < 4 || userName.length > 12) {
      error = true;
      setErrorMsg("Username must be between 4 and 12 characters");
    } else if (password.length < 4 || password.length > 12) {
      error = true;
      setErrorMsg("Password must be between 4 and 12 characters");
    }

    if (!error) {
      setErrorMsg("");
      signIn();
    } else {
      setTimeout(() => {
        setErrorMsg("");
        setPassword("");
      }, 4000);
    }
  };

  const signIn = () => {
    if (userName === "admin" && password === "123456") {
      setLoading(true);
      window.sessionStorage.setItem("username", userName);
      setTimeout(() => {
        setLoading(false);
        navigate("/Home");
      }, 4000);
    } else {
      setErrorMsg("The username and/or password is incorrect");
      setTimeout(() => {
        setErrorMsg("");
      }, 6000);
    }
  };

  return (
    <div>
      <div className={styles.signin_container}>
        <p className={styles.title}>Sign In</p>
        <p className={styles.signUp}>
          New to RemindMe?{" "}
          <span onClick={() => changeView("signup")}>Sign Up</span>
        </p>
        <div className={styles.sigin_wrapper}>
          <div className={styles.form}>
            <span className={styles.input_span}>
              <FontAwesomeIcon icon={faUser} className={styles.icon} />
              <input
                type="text"
                placeholder="Username"
                className={styles.input_field}
                value={userName}
                required
                onChange={updateUserName}
                autoComplete="off"
              />
            </span>
            <span className={styles.input_span}>
              <FontAwesomeIcon icon={faLock} className={styles.icon} />
              <input
                type="password"
                placeholder="Password"
                className={styles.input_field}
                value={password}
                onChange={updatePassword}
              />
            </span>

            <button
              className={styles.signin_btn}
              onClick={handleFormValidation}
            >
              <span>
                Sign In
                {loading && (
                  <Loader
                    type="ThreeDots"
                    color="#b9e6e3"
                    height={40}
                    width={40}
                    className={styles.loader}
                  />
                )}
              </span>
            </button>

            <div
              className={`${styles.error_msg} ${
                errorMsg.length > 0 && styles.show_error_msg
              }`}
            >
              <p>{errorMsg}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;
