import React, { useState } from "react";
import styles from "../Styles/Components_Style/signIn.module.css";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Loader from "react-loader-spinner";
import { signIn } from "../API/api";

const SignInComponent = ({ changeView }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleFormValidation = () => {
    setLoading(true);
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
    const signInRequest = await signIn(userName, password);

    if (signInRequest !== "Success") {
      setErrorMsg(signInRequest);
      setLoading(false);
    } else {
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
            <form className={styles.form_box} onSubmit={handleSubmit}>
              <span className={styles.input_span}>
                <FontAwesomeIcon icon={faUser} className={styles.icon} />

                <input
                  type="text"
                  placeholder="Username"
                  className={styles.input_field}
                  value={userName}
                  required
                  autoComplete="true"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </span>
              <span className={styles.input_span}>
                <FontAwesomeIcon icon={faLock} className={styles.icon} />
                <input
                  type="password"
                  placeholder="Password"
                  className={styles.input_field}
                  value={password}
                  autoComplete="true"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </span>
              <button className={styles.signin_btn} type="submit">
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
            </form>

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
