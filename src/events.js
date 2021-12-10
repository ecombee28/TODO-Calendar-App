// export const events = [
//   {
//     id: 1,
//     title: "Vacation",
//     allDay: true,
//     start: new Date(2021, 11, 21),
//     end: new Date(2021, 11, 23),
//     eventDetail: "Going to Disneyland!!!!!!!",
//     eventType: "vacation",
//     color: "#30b4d1",
//   },
//   {
//     id: 2,
//     title: "Meeting with Jeff",
//     allDay: false,
//     start: new Date(2021, 10, 18, 9, 30),
//     end: new Date(2021, 10, 18, 10, 0),
//     eventDetail: "Talk to Jeff about the project",
//     eventType: "important",
//     color: "#d60404",
//   },
//   {
//     id: 3,
//     title: "Last day of school",
//     allDay: true,
//     start: new Date(2021, 11, 14),
//     end: new Date(2021, 11, 14),
//     eventDetail: "Last day of school!!!!!!!!!!",
//     eventType: "personal",
//     color: "#02970f",
//   },
//   {
//     id: 4,
//     title: "Bake Sale",
//     allDay: true,
//     start: new Date(2021, 10, 24),
//     end: new Date(2021, 10, 24),
//     eventDetail: "Make Cookies",
//     eventType: "personal",
//     color: "#02970f",
//   },
//   {
//     id: 5,
//     title: "Doctor Appointment",
//     allDay: false,
//     start: new Date(2021, 10, 26, 9, 0),
//     end: new Date(2021, 10, 26, 11, 0),
//     eventDetail: "Bring your insurance card",
//     eventType: "personal",
//     color: "#02970f",
//   },
//   {
//     id: 6,
//     title: "Christmas",
//     allDay: true,
//     start: new Date(2021, 11, 25),
//     end: new Date(2021, 11, 25),
//     eventDetail: "Merry Christmas",
//     eventType: "personal",
//     color: "#02970f",
//   },
//   {
//     id: 7,
//     title: "Dentist",
//     allDay: false,
//     start: new Date(2021, 11, 16, 9, 0),
//     end: new Date(2021, 11, 16, 11, 0),
//     eventDetail: "Cleaning",
//     eventType: "personal",
//     color: "#02970f",
//   },
// ];

export const events = [
  {
    tags: [
      {
        tag: "personal",
      },
    ],
    name: "Dentist",
    description: "Root Canal!!!!!!!!",
    time_details: {
      start_time: "2021-12-10T07:00",
      end_time: "2021-12-10T08:30",
      all_day: false,
    },
    presentation: {
      color: "#02970f",
    },
    _id: "61b2c24e21f3f9da3439178c",
  },
  {
    tags: [
      {
        tag: "Holiday",
      },
    ],
    name: "Christmas",
    description: "Yay!!!!!!!!",
    time_details: {
      start_time: "2021-12-25T00:00",
      end_time: "2021-12-25T00:00",
      all_day: true,
    },
    presentation: {
      color: "#30b4d1",
    },
    _id: "61b2c24e21f3f9da34391784",
  },
  {
    tags: [
      {
        tag: "Work",
      },
    ],
    name: "Meeting with Paul",
    description: "Bring your laptop",
    time_details: {
      start_time: "2021-12-21T10:00",
      end_time: "2021-12-21T11:00",
      all_day: false,
    },
    presentation: {
      color: "#6945cc",
    },
    _id: "61b2c24e21f3f9da34391784",
  },
];
