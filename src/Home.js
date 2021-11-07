import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Styles/Home.module.css";
import logo from "../src/images/logo.png";

const Home = () => {
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
  }, []);

  const signOut = () => {
    window.sessionStorage.removeItem("username");
    navigate("/");
  };

  return (
    <>
      <div className={styles.main_container}>
        <img src={logo} alt="" className={styles.logo} />
        <p className={styles.title}>Welcome {userName}</p>
        <p className={styles.sign_out} onClick={signOut}>
          Sign out
        </p>
      </div>
    </>
  );
};

export default Home;
