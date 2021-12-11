import { events } from "../events";
import Cookie from "js-cookie";
import { getFilteredEvents } from "../Lib/filterEvents";

const TOKEN = Cookie.get("token");
const TOKEN_TYPE = window.sessionStorage.getItem("type");

export async function getAllEvents() {
  const requestOptions = {
    method: "GET",
    mode: "cors", // no-cors, *cors, same-origin
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
  } else {
    const results = getFilteredEvents(data);
    return results;
  }
}

export async function getSingleEvent(id) {}

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
