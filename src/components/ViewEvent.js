import React from "react";
import styles from "../Styles/Components_Style/viewEvent.module.css";
import {
  faTrashAlt,
  faTimes,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCalendarAlt,
  faClipboard,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";

const ViewEvent = ({ event, close, remove }) => {
  const formatDates = (start, end, allDay) => {
    let returnDate = "";
    let startHour = start.getHours();
    let endHour = end.getHours();
    let startStr = startHour <= 11 ? "am" : "pm";
    let endStr = endHour <= 11 ? "am" : "pm";
    console.log(endStr);
    //format(new Date(event.start), "MMMM dd ,yyyy  hh:mm");

    if (allDay) {
      returnDate = format(new Date(start), "MMM dd ,yyyy");
    } else if (!allDay) {
      returnDate =
        format(new Date(start), "MMM dd ,yyyy  h:mm") +
        startStr +
        "  -  " +
        format(new Date(end), "MMM dd ,yyyy  h:mm") +
        endStr;
    }

    return returnDate;
  };
  return (
    <div className={styles.blackout}>
      <div className={styles.main_container}>
        <section className={styles.toolbar}>
          <div className={styles.toolbar_items}>
            <li>
              <FontAwesomeIcon icon={faPencilAlt} className={styles.icon} />
            </li>
            <li>
              <FontAwesomeIcon
                icon={faTrashAlt}
                className={styles.icon}
                onClick={() => remove(event.id)}
              />
            </li>
            <li>
              <FontAwesomeIcon
                icon={faTimes}
                className={styles.icon}
                onClick={() => close()}
              />
            </li>
          </div>
        </section>
        <section className={styles.event_content}>
          <div className={styles.span}>
            <p
              className={styles.block}
              style={{ backgroundColor: event.color }}
            ></p>
            <p className={styles.title}>{event.title}</p>
          </div>
          <div className={styles.span}>
            <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon} />
            <p className={styles.date_text}>
              {formatDates(event.start, event.end, event.allDay)}
            </p>
          </div>

          <div className={styles.span}>
            <FontAwesomeIcon icon={faClipboard} className={styles.icon} />
            <p className={styles.event_text}>{event.eventDetail}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ViewEvent;
