import React, { useState } from "react";
import styles from "./Styles/Home.module.css";
import Nav from "./components/Nav";
import CalendarComp from "./components/CalendarComp";

const Home = () => {
  const [bringIntoView, setBringIntoView] = useState("home");

  const changeComponentView = (view) => {
    setBringIntoView(view);
  };

  return (
    <>
      <div className={styles.main_container}>
        <Nav changeView={changeComponentView} />
        <div className={styles.content_container}>
          {bringIntoView === "home" && <CalendarComp />}
        </div>
      </div>
    </>
  );
};

export default Home;
