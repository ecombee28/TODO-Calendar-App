import React, { useState, useEffect } from "react";
import styles from "../Styles/Components_Style/myEvents.module.css";
import format from "date-fns/format";

const MyEvents = () => {
  const [allEvents, setAllEvents] = useState(null);

  useEffect(() => {
    setAllEvents(JSON.parse(localStorage.getItem("events")));
  }, []);

  console.log(allEvents);
  return (
    <div>
      <div className={styles.my_event_container}>
        <p className={styles.title}>My Events</p>
        <div className={styles.events_container}>
          {allEvents
            ? allEvents.map((e) => (
                <section className={styles.event_row}>
                  <p>{e.title}</p>
                  <p>{e.eventDetail}</p>
                  <p>
                    {e.allDay
                      ? format(new Date(e.start), "MMM dd ,yyyy")
                      : format(new Date(e.start), "MMM dd ,yyyy h:mm")}
                  </p>
                  <p>
                    {e.allDay
                      ? format(new Date(e.end), "MMM dd ,yyyy")
                      : format(new Date(e.end), "MMM dd ,yyyy h:mm")}
                  </p>
                </section>
              ))
            : "Loading"}
        </div>
      </div>
    </div>
  );
};

export default MyEvents;
