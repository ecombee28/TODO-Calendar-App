import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Stack from "@mui/material/Stack";
import styles from "../Styles/Components_Style/dateTime.module.css";

export default function DateTime({ sDate, eDate, add }) {
  var [startDate, setStartDate] = useState(sDate);
  var [endDate, setEndDate] = useState(eDate);

  const getTime = () => {
    add(startDate, endDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <div className={styles.container}>
          <DateTimePicker
            renderInput={(params) => <TextField {...params} />}
            label="Start Date and Time Selection"
            value={startDate}
            onChange={(start) => {
              setStartDate(start);
            }}
            minDate={startDate}
          />
          <DateTimePicker
            renderInput={(params) => <TextField {...params} />}
            label="End Date and Time Selection"
            value={endDate}
            onAccept={getTime()}
            onChange={(end) => {
              setEndDate(end);
            }}
            minDate={startDate}
            minTime={startDate}
          />
        </div>
      </Stack>
    </LocalizationProvider>
  );
}
