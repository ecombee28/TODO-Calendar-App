import React, { useState, useEffect, useContext } from "react";
import styles from "../Styles/Components_Style/editEvent.module.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "./DatePicker";
import DateTime from "./DateTime";
import ColorPicker from "./ColorPicker";
import { editEvent } from "../API/api";
import { Context } from "../globalState/Store";
import { FilteredContext } from "../globalState/filteredEvents";

const EditEvent = ({ event, close }) => {
  const [events, setEvents] = useContext(Context);
  const [filteredEvents, setFilteredEvents] = useContext(FilteredContext);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");
  const [allDay, setAllDay] = useState("");
  const [color, setColor] = useState("");
  const [showError, setShowError] = useState(false);
  const [eventType, setEventType] = useState("");

  useEffect(() => {
    setTitle(event.title);
    setStartDate(event.start);
    setEndDate(event.end);
    setNotes(event.eventDetail);
    setAllDay(event.allDay);
    setEventType(event.eventType);
    setColor(event.color);
  }, [event]);

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
      editEvents();
    }
  };

  const editEvents = async () => {
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

    const data = await editEvent(event.id, eventObj);
    setFilteredEvents(data);
    setEvents(data);
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
