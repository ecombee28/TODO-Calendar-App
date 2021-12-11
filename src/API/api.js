import { events } from "../events";

const TOKEN = window.sessionStorage.getItem("token");
const TOKEN_TYPE = window.sessionStorage.getItem("type");

export async function getAllEvents() {
  const requestOptions = {
    method: "GET",
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const response = await fetch(
    "https://api.gurule.rocks/events/events/",
    requestOptions
  );
  const data = await response.json();

  if (!response.ok) {
    console.log("error from api");
    return data.detail;
  } else {
    console.log("pass from api");
    return data;
  }
}

export async function getSingleEvent(id) {}

export async function deleteEvent(id) {
  //curl -X 'DELETE' \
  //   'https://api.gurule.rocks/events/events/61b2c38421f3f9da34391792' \
  //   -H 'accept: application/json' \
  //   -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlY29tYmVlMDAiLCJleHAiOjE2MzkxMTM5MjV9.zC5z16_wkERN1hTHqqLh82Y2EVxyHFtyYdpSifbnw_8'
}

export async function editEvent(id) {
  //http://api.gurule.rocks/events/events/id/set
  //     curl -X 'POST' \
  //   'https://api.gurule.rocks/events/events/id/set' \
  //   -H 'accept: application/json' \
  //   -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlY29tYmVlMDAiLCJleHAiOjE2MzkxMTM5MjV9.zC5z16_wkERN1hTHqqLh82Y2EVxyHFtyYdpSifbnw_8' \
  //   -H 'Content-Type: application/json' \
  //   -d '{
  //   "tags": [
  //     {
  //       "tag": "cool"
  //     }
  //   ],
  //   "name": "eric",
  //   "description": "eric",
  //   "time_details": {
  //     "start_time": "2021-12-16T04:57:06.537Z",
  //     "end_time": "2021-12-16T04:57:06.537Z",
  //     "all_day": false
  //   },
  //   "presentation": {
  //     "color": "black"
  //   }
  // }'
}
