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
import AddEvent from "./AddEvent";
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
    allDay: false,
    start: new Date(2021, 10, 1, 9, 30),
    end: new Date(2021, 10, 1, 10, 0),
    time: "2:00 pm",
    eventDetail: "Big meeting with the CEO. Dont be late!!!!",
    id: 1,
    color: "#ff0000",
  },
  {
    title: "Vacation",
    allDay: false,
    start: new Date(2021, 10, 7, 6, 0),
    end: new Date(2021, 10, 10, 24, 0),
    eventDetail: "Vacation to Disneyland and the beach",
    id: 2,
    color: "#3296a8",
  },
  {
    title: "Thanksgiving",
    allDay: true,
    start: new Date(2021, 10, 25),
    end: new Date(2021, 10, 25),
    eventDetail: "Don't forget to call mom & dad!!!!",
    id: 3,
    color: "#325bf0",
  },
  {
    title: "Meet with Jeff",
    allDay: false,
    start: new Date(2021, 10, 12, 9, 30),
    end: new Date(2021, 10, 12, 10, 0),
    eventDetail: "I need to meet with Jeff to discuss the big project",
    id: 4,
    color: "",
  },

  {
    title: "Christmas Party",
    allDay: false,
    start: new Date(2021, 11, 2, 19, 0),
    end: new Date(2021, 11, 2, 22, 0),
    eventDetail: "You are in charge of the food don't forget",
    id: 5,
    color: "#32a852",
  },

  {
    title: "Christmas",
    allDay: true,
    start: new Date(2021, 11, 25),
    end: new Date(2021, 11, 25),
    eventDetail: "Merry Christmas. Don't forget the ham",
    id: 6,
    color: "#02a332",
  },
  {
    title: "Black Friday",
    allDay: true,
    start: new Date(2021, 10, 26),
    end: new Date(2021, 10, 26),
    eventDetail: "Get Johnnies Xbox at Target",
    id: 7,
    color: "#5d615e",
  },
  {
    title: "Coffee with mom",
    allDay: false,
    start: new Date(2021, 10, 26, 8, 0),
    end: new Date(2021, 10, 26, 10, 0),
    eventDetail: "Meet her at Starbucks",
    id: 8,
    color: "#02a332",
  },
  {
    title: "Lunch with Paul",
    allDay: false,
    start: new Date(2021, 10, 12, 12, 0),
    end: new Date(2021, 10, 12, 13, 0),
    eventDetail: "Meet him at Chili's",
    id: 9,
    color: "#02a332",
  },
];

function CalendarComp() {
  const [showEvent, setShowEvent] = useState(false);
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);
  const [currentEvent, setCurrentEvent] = useState({});
  const [currentSlot, setCurrentSlot] = useState("");

  const handleAddEvent = () => {
    setAllEvents([...allEvents, newEvent]);
  };

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
    console.log(eventObj);
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
        />
      )}
    </div>
  );
}

export default CalendarComp;
