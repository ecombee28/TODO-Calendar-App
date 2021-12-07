import React, { useState, useEffect } from "react";
import styles from "../Styles/Components_Style/nav.module.css";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [userName, setUserName] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const getUserName = () => {
      let tokenKey = window.sessionStorage.getItem("token");
      let user = window.sessionStorage.getItem("username");

      if (!tokenKey) {
        navigate("/");
      } else {
        setUserName(user);
      }
    };

    getUserName();
  });

  const signOut = () => {
    window.sessionStorage.removeItem("username");
    window.localStorage.removeItem("events");
    window.sessionStorage.removeItem("token");
    window.sessionStorage.removeItem("type");
    navigate("/");
  };

  return (
    <div>
      <nav className={`${styles.nav}`}>
        <img src={logo} alt="" className={styles.logo} />
        <section className={styles.user_wrapper}>
          <p className={styles.user_info}>{`Hello, ${userName}`}</p>
          <button className={styles.signOut_btn} onClick={() => signOut()}>
            Sign Out
          </button>
        </section>
      </nav>
    </div>
  );
};

export default Nav;
