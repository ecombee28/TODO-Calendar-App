import React, { useState, useContext } from "react";
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
import EditEvent from "./EditEvent";
import { deleteEvent } from "../API/api";
import { Context } from "../globalState/Store";
import { FilteredContext } from "../globalState/filteredEvents";

const ViewEvent = ({ event, close, edit }) => {
  const [, setEvents] = useContext(Context);
  const [, setFilteredEvents] = useContext(FilteredContext);
  const [showEditEvent, setShowEditEvent] = useState(false);

  const formatDates = () => {
    let returnDate = "";
    let startHour = event.start.getHours();
    let endHour = event.end.getHours();
    let startStr = startHour <= 11 ? "am" : "pm";
    let endStr = endHour <= 11 ? "am" : "pm";

    if (event.allDay) {
      var sDate = format(new Date(event.start), "MMM dd ,yyyy");
      var eDate = format(new Date(event.end), "MMM dd ,yyyy");

      if (sDate !== eDate) {
        returnDate =
          format(new Date(event.start), "MMM dd ,yyyy") +
          " - " +
          format(new Date(event.end), "MMM dd ,yyyy");
      } else {
        returnDate = format(new Date(event.start), "MMM dd ,yyyy");
      }
    } else if (!event.allDay) {
      returnDate =
        format(new Date(event.start), "MMM dd ,yyyy h:mm") +
        startStr +
        "  -  " +
        format(new Date(event.end), "MMM dd ,yyyy h:mm") +
        endStr;
    }

    return returnDate;
  };

  const closeEditPanel = () => {
    setShowEditEvent(false);
    close();
  };

  const addNewEditedEvent = (event) => {
    edit(event);
  };

  const deleteEvents = async () => {
    const data = await deleteEvent(event.id);
    setFilteredEvents(data);
    setEvents(data);
    close();
  };

  return (
    <div className={styles.blackout}>
      {!showEditEvent ? (
        <div className={styles.main_container}>
          <section className={styles.toolbar}>
            <div className={styles.toolbar_items}>
              <li>
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  className={styles.icon}
                  onClick={() => setShowEditEvent(true)}
                />
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className={styles.icon}
                  onClick={() => deleteEvents()}
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
              <p className={styles.date_text}>{formatDates()}</p>
            </div>
            {event.eventDetail && (
              <div className={styles.span}>
                <FontAwesomeIcon icon={faClipboard} className={styles.icon} />
                <p className={styles.event_text}>{event.eventDetail}</p>
              </div>
            )}
          </section>
        </div>
      ) : (
        <EditEvent
          event={event}
          close={closeEditPanel}
          add={addNewEditedEvent}
        />
      )}
    </div>
  );
};

export default ViewEvent;
