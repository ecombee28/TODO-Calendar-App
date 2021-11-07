import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Styles/Home.module.css";

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

  return (
    <>
      <div className={styles.main_container}>
        <p className={styles.title}>Welcome {userName}</p>
      </div>
    </>
  );
};

export default Home;
