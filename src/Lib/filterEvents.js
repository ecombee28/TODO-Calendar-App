import parseISO from "date-fns/parseISO";

export const getFilteredEvents = (events) => {
  const newEvents = [];

  events.map((e) => {
    newEvents.push({
      id: e._id,
      title: e.name,
      allDay: e.time_details.all_day,
      start: parseISO(e.time_details.start_time),
      end: parseISO(e.time_details.end_time),
      eventDetail: e.description,
      eventType: e.tags[0].tag,
      color: e.presentation.color,
    });
  });

  return newEvents;
};
