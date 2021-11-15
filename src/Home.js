import React, { useState } from "react";
import styles from "./Styles/Home.module.css";
import Nav from "./components/Nav";
import CalendarComp from "./components/CalendarComp";

const Home = () => {
  return (
    <>
      <div className={styles.main_container}>
        <Nav />
        <CalendarComp />
      </div>
    </>
  );
};

export default Home;
