import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Styles/Home.module.css";
import Nav from "./components/Nav";

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
  });

  const signOut = () => {
    window.sessionStorage.removeItem("username");
    navigate("/");
  };

  return (
    <>
      <div className={styles.main_container}>
        <Nav user={userName} signOut={signOut} />
      </div>
    </>
  );
};

export default Home;
