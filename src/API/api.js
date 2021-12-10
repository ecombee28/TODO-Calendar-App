import { events } from "../events";

const TOKEN = window.sessionStorage.getItem("token");
const TOKEN_TYPE = window.sessionStorage.getItem("type");

export async function getAllEvents() {
  //   const requestOptions = {
  //     method: "POST",
  //     mode: "cors", // no-cors, *cors, same-origin
  //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: "same-origin", // include, *same-origin, omit
  //     headers: {
  //       accept: "application/json",
  //       Authorization: `${TOKEN_TYPE} ${TOKEN}`,
  //     },
  //   };

  //   const response = await fetch(
  //     "http://api.gurule.rocks/events/events/",
  //     requestOptions
  //   );
  //   const data = await response.json();

  //   if (!response.ok) {
  //     return data.detail;
  //   } else {
  //     return data;
  //   }

  return events;
}

export async function getSingleEvent(id) {}

export async function deleteEvent(id) {}

export async function editEvent(id) {}
