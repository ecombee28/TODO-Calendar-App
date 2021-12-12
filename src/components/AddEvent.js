import React, { useState, useContext, useEffect } from "react";
import styles from "../Styles/Components_Style/addEvent.module.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "./DatePicker";
import DateTime from "./DateTime";
import ColorPicker from "./ColorPicker";
import { Context } from "../globalState/Store";
import { FilteredContext } from "../globalState/filteredEvents";
import { addEvent } from "../API/api";

const AddEvent = ({ date, close }) => {
  const [, setEvents] = useContext(Context);
  const [, setFilteredEvents] = useContext(FilteredContext);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");
  const [allDay, setAllDay] = useState(true);
  const [color, setColor] = useState("#457dcc");
  const [eventType, setEventType] = useState("");
  const [showError, setShowError] = useState(false);

  // useEffect(() => {
  //   setStartDate(date.start);
  //   setEndDate(date.start);
  // }, [date]);

  const validateInput = () => {
    if (
      title.length === 0 ||
      startDate.length === 0 ||
      endDate.length === 0 ||
      eventType.length === 0 ||
      color.length === 0
    ) {
      setShowError(true);

      setTimeout(() => {
        setShowError(false);
      }, 5000);
    } else {
      addNewEvent();
    }
  };

  const addNewEvent = async () => {
    let event = {
      title: title,
      allDay: allDay,
      start: startDate,
      end: endDate,
      eventDetail: notes,
      eventType: eventType,
      color: color,
    };

    const data = await addEvent(event);
    setEvents(data);
    setFilteredEvents(data);
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

  const addColor = (eventType, color) => {
    setColor(color);
    setEventType(eventType);
  };

  const addError = () => {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 5000);
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
          <DatePicker sDate={date.start} eDate={date.start} add={addDate} />
        ) : (
          <DateTime sDate={date.start} eDate={date.start} add={addDateTime} />
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

        <ColorPicker add={addColor} currentColor={""} />
        <button className={styles.add_btn} onClick={validateInput}>
          Add Event
        </button>

        <p className={`${styles.error} ${showError && styles.show_error}`}>
          All fields must be filled out
        </p>
      </div>
    </div>
  );
};

export default AddEvent;
