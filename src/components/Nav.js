import React, { useState, useEffect } from "react";
import styles from "../Styles/Components_Style/nav.module.css";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

const Nav = () => {
  const [userName, setUserName] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const getUserName = () => {
      let tokenKey = Cookie.get("token");
      let user = Cookie.get("username");

      if (!tokenKey) {
        navigate("/");
      } else {
        setUserName(user);
      }
    };

    getUserName();
  });

  const signOut = () => {
    Cookie.remove("username");
    Cookie.remove("events");
    Cookie.remove("token");
    Cookie.remove("type");

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
