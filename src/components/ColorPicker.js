import React, { useState } from "react";
import styles from "../Styles/Components_Style/colorPicker.module.css";

const ColorPicker = ({ add, currentColor }) => {
  const [color, setColor] = useState(currentColor);

  const setEvent = (event, eventColor) => {
    setColor(eventColor);
    add(event, eventColor);
  };

  return (
    <>
      <h2>Event Type</h2>
      <div className={styles.color_container}>
        <button
          className={`${styles.color_pick_box} ${styles.red} ${
            color === "#d60404" && styles.selected
          }`}
          onClick={() => setEvent("important", "#d60404")}
        >
          Important
        </button>
        <button
          className={`${styles.color_pick_box} ${styles.orange} ${
            color === "#ef6330" && styles.selected
          }`}
          onClick={() => setEvent("work", "#ef6330")}
        >
          Work
        </button>
        <button
          className={`${styles.color_pick_box} ${styles.light_blue} ${
            color === "#ef6330" && styles.selected
          }`}
          onClick={() => setEvent("vacation", "#30b4d1")}
        >
          Vacation
        </button>
        <button
          className={`${styles.color_pick_box} ${styles.green} ${
            color === "#02970f" && styles.selected
          }`}
          onClick={() => setEvent("personal", "#02970f")}
        >
          Personal
        </button>
        <button
          className={`${styles.color_pick_box} ${styles.purple} ${
            color === "#6945cc" && styles.selected
          }`}
          onClick={() => setEvent("holiday", "#6945cc")}
        >
          Holiday
        </button>
        <button
          className={`${styles.color_pick_box} ${styles.blue} ${
            color === "#457dcc" && styles.selected
          } `}
          onClick={() => setEvent("other", "#457dcc")}
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
