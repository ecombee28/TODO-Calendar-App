import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Stack from "@mui/material/Stack";
import styles from "../Styles/Components_Style/dateTime.module.css";

export default function DateTime({ date, add }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <div classNam={styles.container}>
          <DateTimePicker
            renderInput={(params) => <TextField {...params} />}
            label="Start Date and Time Selection"
            value={startDate}
            onChange={(start) => {
              setStartDate(start);
            }}
            minDate={new Date()}
          />
          <DateTimePicker
            renderInput={(params) => <TextField {...params} />}
            label="End Date and Time Selection"
            value={endDate}
            onAccept={() => add(startDate, endDate)}
            onChange={(end) => {
              setEndDate(end);
            }}
            minDate={new Date()}
          />
        </div>
      </Stack>
    </LocalizationProvider>
  );
}
