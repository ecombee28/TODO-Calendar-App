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
  const [showError, setShowError] = useState(false);
  const [eventType, setEventType] = useState("");

  const validateInput = () => {
    if (
      title.length === 0 ||
      startDate.length === 0 ||
      endDate.length === 0 ||
      notes.length === 0 ||
      color.length === 0
    ) {
      setShowError(true);

      setTimeout(() => {
        setShowError(false);
      }, 5000);
    } else {
      editEvent();
    }
  };

  const editEvent = () => {
    let eventObj = {
      id: event.id,
      title: title,
      allDay: allDay,
      start: startDate,
      end: endDate,
      eventDetail: notes,
      eventType: eventType,
      color: color,
    };

    add(eventObj);

    close();
  };

  const addDateTime = (startDate, endDate) => {
    console.log("from addDataTime");
    console.log(endDate);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const addDate = (date) => {
    setStartDate(date[0]);
    setEndDate(date[1]);
  };

  const addColor = (eventType, color) => {
    setColor(color);
    setEventType(eventType);
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

      <ColorPicker add={addColor} currentColor={event.color} />
      <button className={styles.add_btn} onClick={validateInput}>
        Save
      </button>
      <p className={`${styles.error} ${showError && styles.show_error}`}>
        All fields must be filled out
      </p>
    </div>
  );
};

export default EditEvent;