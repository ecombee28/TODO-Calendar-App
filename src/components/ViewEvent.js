import React from "react";
import styles from "../Styles/Components_Style/viewEvent.module.css";

const ViewEvent = ({ day, close }) => {
  return (
    <div className={styles.main_container}>
      <h1>{day}</h1>
      <p className={styles.close} onClick={() => close()}>
        close
      </p>
    </div>
  );
};

export default ViewEvent;
