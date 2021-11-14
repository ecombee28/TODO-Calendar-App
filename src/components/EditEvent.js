import React, { useState } from "react";
import styles from "../Styles/Components_Style/editEvent.module.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "./DatePicker";
import DateTime from "./DateTime";
import ColorPicker from "./ColorPicker";

const EditEvent = ({ event, close, add }) => {
  const [title, setTitle] = useState(event.title);
  const [startDate, setStartDate] = useState(event.start);
  const [endDate, setEndDate] = useState(event.end);
  const [notes, setNotes] = useState(event.eventDetail);
  const [allDay, setAllDay] = useState(event.allDay);
  const [color, setColor] = useState(event.color);

  const editEvent = () => {
    let eventObj = {
      id: event.id,
      title: title,
      allDay: allDay,
      start: startDate,
      end: endDate,
      eventDetail: notes,
      color: color,
    };

    console.log(eventObj);

    add(eventObj);

    close();
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
    <div className={styles.main_container}>
      <div className={styles.toolbar}>
        <p>Edit Event</p>
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
        <DatePicker sDate={event.start} eDate={event.end} add={addDate} />
      ) : (
        <DateTime sDate={event.start} eDate={event.end} add={addDateTime} />
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
      <button className={styles.add_btn} onClick={editEvent}>
        Save
      </button>
    </div>
  );
};

export default EditEvent;
