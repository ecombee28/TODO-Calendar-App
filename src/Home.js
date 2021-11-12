import React, { useEffect, useState } from "react";
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
          <p className={styles.title}>{bringIntoView}</p>

          {bringIntoView === "calendar" && <CalendarComp />}
        </div>
      </div>
    </>
  );
};

export default Home;
