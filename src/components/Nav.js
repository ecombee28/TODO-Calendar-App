import React, { useState, useEffect } from "react";
import styles from "../Styles/Components_Style/nav.module.css";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

const Nav = ({ changeView }) => {
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const getUserName = () => {
      let user = window.sessionStorage.getItem("username");

      if (!user) {
        navigate("/");
      } else {
        setUserName(user);
      }
    };

    getUserName();
  });

  const signOut = () => {
    window.sessionStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div>
      <div
        className={`${styles.hamburger_wrapper} ${
          show && styles.move_hamburger
        }`}
        onClick={() => setShow(!show)}
      >
        <div className={`${styles.line1} ${show && styles.slide_line1}`}></div>
        <div className={`${styles.line2} ${show && styles.slide_line2}`}></div>
        <div className={`${styles.line3} ${show && styles.slide_line3}`}></div>
      </div>
      <nav className={`${styles.nav} ${show && styles.show}`}>
        <img src={logo} alt="" className={styles.logo} />
        <section className={styles.user_wrapper}>
          <p className={styles.user_info}>{`Hello, ${userName}`}</p>
          <button className={styles.signOut_btn} onClick={() => signOut()}>
            Sign Out
          </button>
        </section>

        <ul className={styles.nav_link_wrapper}>
          <li className={styles.nav_link} onClick={() => changeView("home")}>
            Home
          </li>
          <li className={styles.nav_link} onClick={() => changeView("events")}>
            My Events
          </li>
          <li
            className={styles.nav_link}
            onClick={() => changeView("calendar")}
          >
            My Calender
          </li>
          <li className={styles.nav_link} onClick={() => changeView("account")}>
            My Account
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
