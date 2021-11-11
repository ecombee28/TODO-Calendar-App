import React, { useState } from "react";
import moment from "moment";
import styles from "../Styles/Components_Style/calendar.module.css";
import ViewEvent from "./ViewEvent";

const CalendarComp = () => {
  const [showEvent, setShowEvent] = useState(false);
  const [info, setInfo] = useState("");
  const value = moment();
  const startDay = value.clone().startOf("month");
  const endDay = value.clone().endOf("month");
  const day = startDay.clone().subtract(1, "day");
  const month = value.month() + 1;
  const calendar = [];

  while (day.isBefore(endDay, "day")) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, "day").clone())
    );
  }

  const showEventPopup = (info, dayOfWeek) => {
    setInfo(info);
    setShowEvent(true);
    console.log(dayOfWeek);
  };

  const closePopUp = () => {
    setShowEvent(false);
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>November</div>
      <div className={styles.days_header}>
        <section className={styles.days_name}>
          <p>Sunday</p>
        </section>
        <section className={styles.days_name}>
          <p>Monday</p>
        </section>
        <section className={styles.days_name}>
          <p>Tuesday</p>
        </section>
        <section className={styles.days_name}>
          <p>Wednesday</p>
        </section>
        <section className={styles.days_name}>
          <p>Thursday</p>
        </section>
        <section className={styles.days_name}>
          <p>Friday</p>
        </section>
        <section className={styles.days_name}>
          <p>Saturday</p>
        </section>
      </div>
      {calendar.map((week) => (
        <div>
          {week.map((day) => (
            <div
              className={styles.day}
              onClick={() =>
                showEventPopup(day.format("D"), value.day(day.format("D")))
              }
            >
              {day.format("D")}
            </div>
          ))}
        </div>
      ))}
      {showEvent && <ViewEvent day={info} close={closePopUp} />}
    </div>
  );
};

export default CalendarComp;
