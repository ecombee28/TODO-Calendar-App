import React, { useState } from "react";
import styles from "../Styles/Components_Style/signUp.module.css";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import Loader from "react-loader-spinner";
import Cookie from "js-cookie";
import emailjs from "emailjs-com";

const SignupComponent = ({ changeView }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();

  const serviceId = process.env.REACT_APP_SERVICE_ID;
  const userId = process.env.REACT_APP_USER_ID;
  const template = process.env.REACT_APP_TEMPLATE;
  emailjs.init(process.env.REACT_APP_USER_ID);

  const handleFormValidation = (e) => {
    let error = false;
    setLoading(true);

    e.preventDefault();

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
      signUp(e);
    } else {
      setLoading(false);
      setTimeout(() => {
        setErrorMsg("");
      }, 4000);
    }
  };

  const signUp = async (e) => {
    e.preventDefault();
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
      setLoading(false);
      if (data.status === 404) {
        setErrorMsg("Username already exist");
      } else {
        setErrorMsg(data.detail[0].msg);
      }
    } else {
      const requestOptions = {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
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
        setLoading(false);
        setErrorMsg(data.detail);
      } else {
        Cookie.set("token", data.access_token, { expires: 1 });
        Cookie.set("type", data.token_type, { expires: 1 });
        Cookie.set("username", userName, { expires: 1 });

        sendEmail();

        setTimeout(() => {
          setLoading(false);
          navigate("/Home");
        }, 2000);
      }
    }
  };

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
