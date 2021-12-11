import React, { useState } from "react";
import styles from "../Styles/Components_Style/signUp.module.css";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import Loader from "react-loader-spinner";
import Cookie from "js-cookie";
import emailjs from "emailjs-com";
import { signUp, signIn } from "../API/api";

const SignupComponent = ({ changeView }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();
  emailjs.init(process.env.REACT_APP_USER_ID);

  const handleFormValidation = () => {
    let error = false;
    setLoading(true);

    if (email.length < 1) {
      error = true;
      setErrorMsg("Email is required");
    } else if (!validator.isEmail(email)) {
      error = true;
      setErrorMsg("Invalid email address");
    } else if (userName.length < 5) {
      error = true;
      setErrorMsg("Username must be bigger then 5 characters");
    } else if (password.length < 1 || confirmedPassword.length < 1) {
      error = true;
      setErrorMsg("Both Password's are required!");
    } else if (password.length < 8 || confirmedPassword.length < 8) {
      error = true;
      setErrorMsg("Passwords must be bigger then 8 characters");
    } else if (confirmedPassword !== password) {
      error = true;
      setErrorMsg("Passwords must match");
      setConfirmedPassword("");
      setPassword("");
    }

    if (!error) {
      setErrorMsg("");
      newSignUp();
    } else {
      setLoading(false);
      setTimeout(() => {
        setErrorMsg("");
      }, 4000);
    }
  };

  const newSignUp = async () => {
    const signUpNewUser = await signUp(userName, email, password);

    if (signUpNewUser !== "Success") {
      setErrorMsg(signUpNewUser);
      setLoading(false);
    } else {
      const signInRequest = await signIn(userName, password);

      if (signInRequest !== "Success") {
        setErrorMsg(signInRequest);
        setLoading(false);
      } else {
        sendEmail();
        setTimeout(() => {
          setLoading(false);
          navigate("/Home");
        }, 2000);
      }
    }
  };

  /**
   * This sends out a welcome email. The provider is emailJs
   */
  const sendEmail = () => {
    const information = {
      email: email,
      username: userName,
    };

    emailjs.send(
      process.env.REACT_APP_SERVICE_ID,
      process.env.REACT_APP_TEMPLATE,
      information
    );
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
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="true"
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
                onChange={(e) => setUserName(e.target.value)}
                autoComplete="true"
              />
            </span>

            <span className={styles.input_span}>
              <FontAwesomeIcon icon={faLock} className={styles.icon} />
              <input
                type="password"
                placeholder="Password"
                className={styles.input_field}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="true"
              />
            </span>

            <span className={styles.input_span}>
              <FontAwesomeIcon icon={faLock} className={styles.icon} />
              <input
                type="password"
                placeholder="Confirm Password"
                className={styles.input_field}
                value={confirmedPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
                autoComplete="true"
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
