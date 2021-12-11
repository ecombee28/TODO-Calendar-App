import Cookie from "js-cookie";
import { getFilteredEvents } from "../Lib/filterEvents";

export async function getAllEvents() {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${Cookie.get("token")}`,
    },
  };

  const response = await fetch(
    "https://api.gurule.rocks/events/events/",
    requestOptions
  );
  const data = await response.json();

  if (!response.ok) {
    return [];
  }

  const results = getFilteredEvents(data);
  return results;
}

/**
 * Delete a single Event from the database
 * @param {*} id
 * @returns
 */
export async function deleteEvent(id) {
  const requestOptions = {
    method: "DELETE",
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${Cookie.get("token")}`,
    },
  };

  const response = await fetch(
    `https://api.gurule.rocks/events/events/${id}`,
    requestOptions
  );

  if (!response.ok) {
    return "There was an error";
  } else {
    const results = getAllEvents();
    return results;
  }
}

/**
 * Add a new event to the database
 * @param {*} newEvent
 * @returns
 */
export async function addEvent(newEvent) {
  const requestOptions = {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${Cookie.get("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tags: [
        {
          tag: newEvent.eventType,
        },
      ],
      name: newEvent.title,
      description: newEvent.eventDetail,
      time_details: {
        start_time: newEvent.start,
        end_time: newEvent.end,
        all_day: newEvent.allDay,
      },
      presentation: {
        color: newEvent.color,
      },
    }),
  };

  const response = await fetch(
    "https://api.gurule.rocks/events/events/",
    requestOptions
  );

  if (!response.ok) {
    return "There was an error";
  } else {
    const results = getAllEvents();
    return results;
  }
}

/**
 * Edit a single event based on the event's ID
 * @param {*} id
 * @param {*} editedEvent
 * @returns
 */
export async function editEvent(id, editedEvent) {
  const requestOptions = {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${Cookie.get("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tags: [
        {
          tag: editedEvent.eventType,
        },
      ],
      name: editedEvent.title,
      description: editedEvent.eventDetail,
      time_details: {
        start_time: editedEvent.start,
        end_time: editedEvent.end,
        all_day: editedEvent.allDay,
      },
      presentation: {
        color: editedEvent.color,
      },
    }),
  };

  const response = await fetch(
    `https://api.gurule.rocks/events/events/${id}/set`,
    requestOptions
  );

  if (!response.ok) {
    return "There was an error";
  } else {
    const results = getAllEvents();
    return results;
  }
}
