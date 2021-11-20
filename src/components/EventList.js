import React from "react";
import styles from "../Styles/Components_Style/eventList.module.css";
import format from "date-fns/format";
import { isEqual } from "date-fns";

const EventList = ({ events, view }) => {
  const getCorrectDateFormat = (event) => {
    let returnDate = "";

    if (isEqual(event.start, event.end) && event.allDay) {
      returnDate = format(new Date(event.start), "MM/dd/yy");
    } else if (!isEqual(event.start, event.end) && event.allDay) {
      returnDate =
        format(new Date(event.start), "MM/dd/yy") +
        " - " +
        format(new Date(event.end), "MM/dd/yy");
    }

    if (
      format(new Date(event.start), "MM/dd/yy") ===
        format(new Date(event.end), "MM/dd/yy") &&
      !event.allDay
    ) {
      returnDate =
        format(new Date(event.start), "h:mm") +
        " - " +
        format(new Date(event.end), "h:mm") +
        " ~ " +
        format(new Date(event.start), "MM/dd/yy");
    } else if (
      format(new Date(event.start), "MM/dd/yy") !==
        format(new Date(event.end), "MM/dd/yy") &&
      !event.allDay
    ) {
      returnDate =
        format(new Date(event.start), "h:mm") +
        " - " +
        format(new Date(event.end), "h:mm") +
        " ~ " +
        format(new Date(event.start), "MM/dd/yy") +
        " : " +
        format(new Date(event.end), "MM/dd/yy");
    }

    return returnDate;
  };

  return (
    <div>
      <div className={styles.list}>
        {events.map((m) => (
          <div className={styles.list_wrapper} onClick={() => view(m)}>
            <div
              className={styles.color_box}
              style={{ backgroundColor: m.color }}
            ></div>
            <div className={styles.content_list_container}>
              <li>{m.title}</li>
              <li>{getCorrectDateFormat(m)}</li>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
