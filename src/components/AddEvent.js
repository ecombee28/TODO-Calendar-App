import React, { useState } from "react";
import styles from "../Styles/Components_Style/addEvent.module.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "./DatePicker";
import DateTime from "./DateTime";
import ColorPicker from "./ColorPicker";

const AddEvent = ({ date, close, add, id }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");
  const [allDay, setAllDay] = useState(true);
  const [color, setColor] = useState("");

  const addEvent = () => {
    let event = {
      id: id,
      title: title,
      allDay: allDay,
      start: startDate,
      end: endDate,
      eventDetail: notes,
      color: color,
    };
    add(event);
  };

  const addDateTime = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const addDate = (date) => {
    setStartDate(date[0]);
    setEndDate(date[1]);
  };

  const addColor = (color) => {
    setColor(color);
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
          className={`${styles.input} ${styles.title_input}`}
        ></input>

        {allDay ? (
          <DatePicker date={date} add={addDate} />
        ) : (
          <DateTime date={date} add={addDateTime} />
        )}
        <div className={styles.check_box_wrapper}>
          <input
            type="checkbox"
            value={allDay}
            checked={allDay}
            className={styles.input_box}
            onChange={() => setAllDay(!allDay)}
          />
          <label>All Day Event</label>
        </div>
        <input
          type="text"
          value={notes}
          placeholder="Add Description"
          onChange={(e) => setNotes(e.target.value)}
          className={`${styles.input} ${styles.notes_input}`}
        ></input>

        <ColorPicker add={addColor} />
        <button className={styles.add_btn} onClick={addEvent}>
          Add Event
        </button>
      </div>
    </div>
  );
};

export default AddEvent;
