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
import OptionsComponent from "./OptionsComponent";
import { events } from "../events";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
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

var id = 6;

function CalendarComp() {
  const [showEvent, setShowEvent] = useState(false);
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [allEvents, setAllEvents] = useState(events);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [currentEvent, setCurrentEvent] = useState({});
  const [currentSlot, setCurrentSlot] = useState("");
  const [showMobileOptions, setShoMobileOptions] = useState(false);
  const [isImportantChecked, setIsImportantChecked] = useState(true);
  const [isWorkChecked, setIsWorkChecked] = useState(true);
  const [isPersonalChecked, setIsPersonalChecked] = useState(true);
  const [isHolidayChecked, setIsHolidayChecked] = useState(true);
  const [isVacationChecked, setIsVacationChecked] = useState(true);
  const [isOtherChecked, setIsOtherChecked] = useState(true);

  const viewEvent = (event) => {
    setCurrentEvent(event);
    setShowEvent(true);
  };

  const addEvent = (start) => {
    setCurrentSlot(start);
    setShowNewEvent(true);
  };

  const closeEventInformation = () => {
    setShowEvent(false);
  };

  const closeCreateEvent = () => {
    setShowNewEvent(false);
  };

  const deleteEvent = (eventId) => {
    var updatedMasterEvents = allEvents.filter((e) => e.id !== eventId);
    var updatedFilteredEvents = allEvents.filter((e) => e.id !== eventId);

    setAllEvents(updatedMasterEvents);
    setFilteredEvents(updatedFilteredEvents);
    setShowEvent(false);
  };

  const addNewEvent = (eventObj) => {
    setAllEvents([...allEvents, eventObj]);
    setFilteredEvents([...filteredEvents, eventObj]);
    events.push(eventObj);
    setShowNewEvent(false);
  };

  const editEvent = (event) => {
    filteredEvents.map(
      (e, i) => e.id === event.id && (filteredEvents[i] = event)
    );

    allEvents.map((e, i) => e.id === event.id && (allEvents[i] = event));
  };

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(filteredEvents));
  }, [filteredEvents]);

  const handleChange = (e) => {
    let value = e.target.value;
    let checked = e.target.checked;

    if (!checked) {
      var remove = filteredEvents.filter((f) => f.eventType !== value);
      setFilteredEvents(remove);
      value === "important" && setIsImportantChecked(false);
      value === "work" && setIsWorkChecked(false);
      value === "personal" && setIsPersonalChecked(false);
      value === "holiday" && setIsHolidayChecked(false);
      value === "vacation" && setIsVacationChecked(false);
      value === "other" && setIsOtherChecked(false);
    } else {
      let add = allEvents.filter((f) => f.eventType === value);
      let combine = filteredEvents.concat(add);
      setFilteredEvents(combine);
      value === "important" && setIsImportantChecked(true);
      value === "work" && setIsWorkChecked(true);
      value === "personal" && setIsPersonalChecked(true);
      value === "holiday" && setIsHolidayChecked(true);
      value === "vacation" && setIsVacationChecked(true);
      value === "other" && setIsOtherChecked(true);
    }
  };

  useEffect(() => {}, [
    isImportantChecked,
    isWorkChecked,
    isPersonalChecked,
    isHolidayChecked,
    isVacationChecked,
  ]);

  return (
    <div className={styles.main_container}>
      {/* desktop */}
      <div className={styles.options_container}>
        <h2>Filters</h2>
        <OptionsComponent
          change={handleChange}
          important={isImportantChecked}
          work={isWorkChecked}
          personal={isPersonalChecked}
          holiday={isHolidayChecked}
          vacation={isVacationChecked}
          other={isOtherChecked}
        />
      </div>
      {/* mobile */}
      <button
        className={`${styles.filter_btn}`}
        onClick={() => setShoMobileOptions(true)}
      >
        Filter
      </button>

      <div
        className={`${styles.mobile_options_container} ${
          showMobileOptions && styles.show
        }`}
      >
        <div className={styles.blackout}>
          <div className={styles.mobile_wrapper}>
            <div className={styles.mobile_options_header}>
              <p>Filter Options</p>
              <FontAwesomeIcon
                icon={faTimes}
                className={styles.icon}
                onClick={() => setShoMobileOptions(false)}
              />
            </div>
            <OptionsComponent
              change={handleChange}
              important={isImportantChecked}
              work={isWorkChecked}
              personal={isPersonalChecked}
              holiday={isHolidayChecked}
              vacation={isVacationChecked}
              other={isOtherChecked}
            />
          </div>
        </div>
      </div>

      <div className={styles.wrapper}>
        <Calendar
          selectable
          localizer={localizer}
          views={{ month: true, day: true, week: true }}
          events={filteredEvents}
          showMultiDayTimes
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={(event) => viewEvent(event)}
          eventPropGetter={(event) => {
            const backgroundColor = event.color;
            return { style: { backgroundColor } };
          }}
          onSelectSlot={addEvent}
          longPressThreshold={20}
        />
      </div>
      {showEvent && (
        <ViewEvent
          event={currentEvent}
          close={closeEventInformation}
          remove={deleteEvent}
          edit={editEvent}
          longPressThreshold={10}
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
