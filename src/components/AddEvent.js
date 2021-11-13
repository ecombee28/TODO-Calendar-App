import React, { useState } from "react";
import styles from "../Styles/Components_Style/addEvent.module.css";
import { format } from "date-fns";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddEvent = ({ date, close, add }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");
  const [allDay, setAllDay] = useState(true);
  const [color, setColor] = useState("");

  const addEvent = () => {
    const e = {
      name: title,
      age: 22,
    };
    add(e);
  };

  return (
    <div className={styles.blackout}>
      <div className={styles.main_container}>
        <div className={styles.toolbar}>
          <p>Add an Event</p>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => close()}
            className={styles.icon}
          />
        </div>

        <input
          type="text"
          value={title}
          placeholder="Add Title"
          onChange={(e) => setTitle(e.target.value)}
          className={styles.title_input}
        ></input>
        <p>{`${format(new Date(date), "MMM dd ,yyyy")} - ${format(
          new Date(date),
          "MMM dd ,yyyy"
        )}`}</p>

        <p onClick={addEvent}>Add Event</p>
      </div>
    </div>
  );
};

export default AddEvent;
