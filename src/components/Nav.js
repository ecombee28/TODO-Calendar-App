import React, { useState } from "react";
import styles from "../Styles/Components_Style/nav.module.css";
import logo from "../images/logo.png";

const Nav = ({ user, signOut }) => {
  const [show, setShow] = useState(false);

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
          <p className={styles.user_info}>{`Hello, ${user}`}</p>
          <button className={styles.signOut_btn} onClick={() => signOut()}>
            Sign Out
          </button>
        </section>

        <ul className={styles.nav_link_wrapper}>
          <li className={styles.nav_link}>Home</li>
          <li className={styles.nav_link}>My Events</li>
          <li className={styles.nav_link}>My Calender</li>
          <li className={styles.nav_link}>My Account</li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
