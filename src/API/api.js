import { events } from "../events";

const TOKEN = window.sessionStorage.getItem("token");
const TOKEN_TYPE = window.sessionStorage.getItem("type");

export async function getAllEvents() {
  const requestOptions = {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      accept: "application/json",
      Authorization: `${TOKEN_TYPE} ${TOKEN}`,
    },
  };

  const response = await fetch(
    "http://api.gurule.rocks/events/events/",
    requestOptions
  );
  const data = await response.json();

  if (!response.ok) {
    return data.detail;
  } else {
    return data;
  }
}

export async function getSingleEvent(id) {}

export async function deleteEvent(id) {
  //curl -X 'DELETE' \
  //   'http://api.gurule.rocks/events/events/61b2c38421f3f9da34391792' \
  //   -H 'accept: application/json' \
  //   -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlY29tYmVlMDAiLCJleHAiOjE2MzkxMTM5MjV9.zC5z16_wkERN1hTHqqLh82Y2EVxyHFtyYdpSifbnw_8'
}

export async function editEvent(id) {
  //http://api.gurule.rocks/events/events/61b2c24e21f3f9da3439178c/set
  //     curl -X 'POST' \
  //   'http://api.gurule.rocks/events/events/61b2c24e21f3f9da3439178c/set' \
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
