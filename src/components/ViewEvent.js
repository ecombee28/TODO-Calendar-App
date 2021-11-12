import React from "react";
import styles from "../Styles/Components_Style/viewEvent.module.css";
import { format } from "date-fns";

const ViewEvent = ({ event, close, remove }) => {
  return (
    <div className={styles.blackout}>
      <div className={styles.main_container}>
        <p className={styles.title}>{event.title}</p>
        <p className={styles.event_text}>
          {`${format(new Date(event.start), "MM/dd/yyyy hh:mm")}  `}{" "}
          <span className={styles.divider}>|</span>
          {`  ${format(new Date(event.end), "MM/dd/yyyy hh:mm")}`}
        </p>

        <div className={styles.notes_wrapper}>
          <p className={`${styles.event_text} ${styles.bold}`}>Notes</p>
          <p className={styles.event_text}>{event.eventDetail}</p>
        </div>
        <div className={styles.btn_wrapper}>
          <button className={styles.close} onClick={() => close()}>
            Close
          </button>
          <button
            className={`${styles.close} ${styles.remove}`}
            onClick={() => remove(event.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewEvent;
