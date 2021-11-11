import React, { useState } from "react";
import styles from "../Styles/Components_Style/signUp.module.css";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import Loader from "react-loader-spinner";

const SignupComponent = ({ changeView }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateUserName = (e) => {
    setUserName(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  const updateConfirmedPassword = (e) => {
    setConfirmedPassword(e.target.value);
  };

  const handleFormValidation = () => {
    let error = false;

    if (email.length < 1) {
      error = true;
      setErrorMsg("Email is required");
    } else if (!validator.isEmail(email)) {
      error = true;
      setErrorMsg("Invalid email address");
    } else if (userName.length < 4 || userName.length > 12) {
      error = true;
      setErrorMsg("Username must be between 4 and 12 characters");
    } else if (password.length < 1 || confirmedPassword.length < 1) {
      error = true;
      setErrorMsg("Both Password's are required!");
    } else if (
      password.length < 4 ||
      password.length > 12 ||
      confirmedPassword.length < 4 ||
      confirmedPassword.length > 12
    ) {
      error = true;
      setErrorMsg("Passwords must be between 4 and 12 characters");
    } else if (confirmedPassword !== password) {
      error = true;
      setErrorMsg("Passwords must match");
      setConfirmedPassword("");
      setPassword("");
    }

    if (!error) {
      setErrorMsg("");

      signIn();
    } else {
      setTimeout(() => {
        setErrorMsg("");
      }, 4000);
    }
  };

  const signIn = () => {
    //make a call to the api

    setLoading(true);

    setTimeout(() => {
      window.sessionStorage.setItem("username", userName);
      setLoading(false);
      navigate("/Home");
    }, 4000);
  };
  return (
    <div>
      <div className={styles.signin_container}>
        <p className={styles.title}>Sign Up</p>
        <p className={styles.signUp}>
          Already a Member?
          <span onClick={() => changeView("signIn")}> Sign In</span>
        </p>
        <div className={styles.sigin_wrapper}>
          <div className={styles.form}>
            <span className={styles.input_span}>
              <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
              <input
                type="email"
                placeholder="Email"
                name="email"
                className={styles.input_field}
                value={email}
                required
                onChange={updateEmail}
                autoComplete="off"
              />
            </span>
            <span className={styles.input_span}>
              <FontAwesomeIcon icon={faUser} className={styles.icon} />
              <input
                type="text"
                placeholder="Username"
                name="username"
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

            <span className={styles.input_span}>
              <FontAwesomeIcon icon={faLock} className={styles.icon} />
              <input
                type="password"
                placeholder="Confirm Password"
                className={styles.input_field}
                value={confirmedPassword}
                onChange={updateConfirmedPassword}
              />
            </span>

            <button
              className={styles.signin_btn}
              onClick={handleFormValidation}
            >
              <span>
                Sign Up
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

export default SignupComponent;
