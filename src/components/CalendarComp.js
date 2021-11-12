import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "../Styles/Components_Style/calendar.module.css";
import "../Styles/Components_Style/calendarStyles.css";
import ViewEvent from "./ViewEvent";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Big Meeting",
    start: new Date(2021, 10, 1, 9, 30),
    end: new Date(2021, 10, 1, 10, 0),
    time: "2:00 pm",
    eventDetail: "Big meeting with the CEO. Dont be late!!!!",
    id: 1,
  },
  {
    title: "Vacation",
    start: new Date(2021, 10, 7, 7, 0),
    end: new Date(2021, 10, 10, 7, 0),
    eventDetail: "Vacation to Disneyland and the beach",
    id: 2,
  },
  {
    title: "Thanksgiving Holiday",
    start: new Date(2021, 10, 25, 2, 22),
    end: new Date(2021, 10, 27, 2, 32),
    eventDetail: "I have a 4 day weekend. Nice!!!",
    id: 3,
  },
  {
    title: "Meet with Jeff",
    start: new Date(2021, 10, 11, 9, 30),
    end: new Date(2021, 10, 11, 10, 0),
    eventDetail: "I need to meet with Jeff to discuss the big project",
    id: 4,
  },

  {
    title: "Christmas Party",
    allDay: true,
    start: new Date(2021, 11, 2, 19, 0),
    end: new Date(2021, 11, 2, 22, 0),
    eventDetail: "You are in charge of the food don't forget",
    id: 4,
  },

  {
    title: "Christmas",
    allDay: true,
    start: new Date(2021, 11, 25, 6, 0),
    end: new Date(2021, 11, 25, 24, 0),
    eventDetail: "Merry Christmas. Don't forget the turkey",
    id: 4,
  },
];

function CalendarComp() {
  const [show, setShow] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);
  const [currentEvent, setCurrentEvent] = useState({});

  const handleAddEvent = () => {
    setAllEvents([...allEvents, newEvent]);
  };

  const handleSelect = (event) => {
    setCurrentEvent(event);
    setShow(!show);
    // console.log(currentEvent);
  };

  const closeEventInformation = () => {
    setShow(false);
  };

  const deleteEvent = (eventId) => {
    var updatedEvents = allEvents.filter((e) => e.id !== eventId);
    setAllEvents(updatedEvents);
    setShow(false);
  };

  return (
    <div>
      <p className={styles.title}>My Calendar</p>
      <button className={styles.add_btn}>
        <FontAwesomeIcon icon={faPlusCircle} className={styles.icon} /> Add
        Event
      </button>
      <div className={styles.wrapper}>
        <Calendar
          selectable
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ width: "100%", height: "100%" }}
          onSelectEvent={(event) => handleSelect(event)}
          // onSelectSlot={(event) => handleSelect(event)}
        />
      </div>
      {show && (
        <ViewEvent
          event={currentEvent}
          close={closeEventInformation}
          remove={deleteEvent}
        />
      )}
    </div>
  );
}

export default CalendarComp;
