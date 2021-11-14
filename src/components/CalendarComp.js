import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "../Styles/Components_Style/calendar.module.css";
import "../Styles/Components_Style/calendarStyles.css";
import ViewEvent from "./ViewEvent";
import AddEvent from "./AddEvent";

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
    id: 1,
    title: "Vacation",
    allDay: true,
    start: new Date(2021, 10, 21),
    end: new Date(2021, 10, 23),
    eventDetail: "Going to Disneyland!!!!!!!",
    color: "#02a332",
  },
  {
    id: 2,
    title: "Meeting with Jeff",
    allDay: false,
    start: new Date(2021, 10, 18, 9, 30),
    end: new Date(2021, 10, 18, 10, 0),
    eventDetail: "Talk to Jeff about the project",
    color: "#ff0000",
  },
  {
    id: 3,
    title: "Last day of school",
    allDay: true,
    start: new Date(2021, 11, 14),
    end: new Date(2021, 11, 14),
    eventDetail: "Last day of school!!!!!!!!!!",
    color: "#6945cc",
  },
];

var id = 4;

function CalendarComp() {
  const [showEvent, setShowEvent] = useState(false);
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [allEvents, setAllEvents] = useState(events);
  const [currentEvent, setCurrentEvent] = useState({});
  const [currentSlot, setCurrentSlot] = useState("");

  const viewEvent = (event) => {
    setCurrentEvent(event);
    setShowEvent(true);
  };

  const addEvent = (start) => {
    setCurrentSlot(start.slots[0]);
    setShowNewEvent(true);
  };

  const closeEventInformation = () => {
    setShowEvent(false);
  };

  const closeCreateEvent = () => {
    setShowNewEvent(false);
  };

  const deleteEvent = (eventId) => {
    var updatedEvents = allEvents.filter((e) => e.id !== eventId);
    setAllEvents(updatedEvents);
    setShowEvent(false);
  };

  const addNewEvent = (eventObj) => {
    setAllEvents([...allEvents, eventObj]);
    setShowNewEvent(false);
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <Calendar
          selectable
          localizer={localizer}
          views={{ month: true, day: true, week: true }}
          events={allEvents}
          showMultiDayTimes
          startAccessor="start"
          endAccessor="end"
          style={{ width: "100%", height: "100%" }}
          onSelectEvent={(event) => viewEvent(event)}
          eventPropGetter={(event) => {
            const backgroundColor = event.color;
            return { style: { backgroundColor } };
          }}
          onSelectSlot={addEvent}
        />
      </div>
      {showEvent && (
        <ViewEvent
          event={currentEvent}
          close={closeEventInformation}
          remove={deleteEvent}
        />
      )}

      {showNewEvent && (
        <AddEvent
          date={currentSlot}
          close={closeCreateEvent}
          add={addNewEvent}
          id={id++}
        />
      )}
    </div>
  );
}

export default CalendarComp;
