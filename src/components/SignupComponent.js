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

  const handleFormValidation = () => {
    let error = false;

    if (email.length < 1) {
      error = true;
      setErrorMsg("Email is required");
    } else if (!validator.isEmail(email)) {
      error = true;
      setErrorMsg("Invalid email address");
    } else if (userName.length < 8) {
      error = true;
      setErrorMsg("Username must be bigger then 8 characters");
    } else if (password.length < 1 || confirmedPassword.length < 1) {
      error = true;
      setErrorMsg("Both Password's are required!");
    } else if (
      password.length < 8 ||
      password.length > 12 ||
      confirmedPassword.length < 8 ||
      confirmedPassword.length > 12
    ) {
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

      signUp();
    } else {
      setTimeout(() => {
        setErrorMsg("");
      }, 4000);
    }
  };

  const signUp = async () => {
    // setLoading(true);
    const requestOptions = {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: `${userName}`,
        email: `${email}`,
        password: `${password}`,
      }),
    };

    const response = await fetch(
      "https://api.gurule.rocks/auth/signup",
      requestOptions
    );
    const data = await response;

    if (!response.ok) {
      console.log("error in signup");
      console.log(data);
      setErrorMsg(data.detail[0].msg);
    } else {
      console.log("pass in signup");
      console.log(data);
      submitLogin();
    }
  };
  //***************************************************************** */
  const submitLogin = async () => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      mode: "no-cors", // no-cors, *cors, same-origin
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(
        `grant_type=&username=${userName}&password=${password}&scope=&client_id=&client_secret=`
      ),
    };

    const response = await fetch(
      "https://api.gurule.rocks/token",
      requestOptions
    );
    const data = await response.json();

    if (!response.ok) {
      setErrorMsg(data.detail);
    } else {
      window.sessionStorage.setItem("token", data.access_token);
      window.sessionStorage.setItem("type", data.token_type);
      window.sessionStorage.setItem("username", userName);

      setTimeout(() => {
        setLoading(false);
        navigate("/Home");
      }, 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
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
                onChange={(e) => setUserName(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
