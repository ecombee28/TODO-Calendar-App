import React, { useState } from "react";
import styles from "../Styles/Components_Style/colorPicker.module.css";

const ColorPicker = ({ add }) => {
  const [color, setColor] = useState("#457dcc");

  const addColor = (eventType, color) => {
    setColor(color);
    add(color);
  };

  return (
    <>
      <h2>Event Type</h2>
      <div className={styles.color_container}>
        <button
          className={`${styles.color_pick_box} ${styles.red} ${
            color === "#d60404" && styles.selected
          }`}
          onClick={() => add("important", "#d60404")}
        >
          Important
        </button>
        <button
          className={`${styles.color_pick_box} ${styles.orange} ${
            color === "#ef6330" && styles.selected
          }`}
          onClick={() => add("work", "#ef6330")}
        >
          Work
        </button>
        <button
          className={`${styles.color_pick_box} ${styles.light_blue} ${
            color === "#ef6330" && styles.selected
          }`}
          onClick={() => add("vacation", "#30b4d1")}
        >
          Vacation
        </button>
        <button
          className={`${styles.color_pick_box} ${styles.green} ${
            color === "#02970f" && styles.selected
          }`}
          onClick={() => add("personal", "#02970f")}
        >
          Personal
        </button>
        <button
          className={`${styles.color_pick_box} ${styles.purple} ${
            color === "#6945cc" && styles.selected
          }`}
          onClick={() => add("holiday", "#6945cc")}
        >
          Holiday
        </button>
        <button
          className={`${styles.color_pick_box} ${styles.blue} ${
            color === "#457dcc" && styles.selected
          } `}
          onClick={() => add("other", "#457dcc")}
        >
          Other
        </button>
        {/* <button
          className={`${styles.color_pick_box} ${styles.gray} ${
            color === "#464646" && styles.selected
          }`}
          onClick={() => addColor("other", "#464646")}
        >
          Other
        </button> */}
      </div>
    </>
  );
};

export default ColorPicker;
