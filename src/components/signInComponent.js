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

  const handleFormValidation = () => {
    let error = false;

    if (userName.length < 1) {
      error = true;
      setErrorMsg("You must enter in a Username");
    } else if (password.length < 1) {
      error = true;
      setErrorMsg("You must enter in a Password");
    }

    if (!error) {
      setErrorMsg("");
      submitLogin();
    } else {
      setTimeout(() => {
        setErrorMsg("");
      }, 4000);
    }
  };

  const submitLogin = async () => {
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

    //console.log(response.json());
    const data = await response.json();

    if (!response.ok) {
      setErrorMsg(data.detail);
    } else {
      console.log(data);
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
    handleFormValidation();
  };

  return (
    <div>
      <div className={styles.signin_container}>
        <p className={styles.title}>Sign In</p>
        <p className={styles.signUp}>
          New to RemindMe?
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
            <button className={styles.signin_btn} onClick={handleSubmit}>
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
