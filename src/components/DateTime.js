import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Stack from "@mui/material/Stack";
import styles from "../Styles/Components_Style/dateTime.module.css";

export default function DateTime({ sDate, eDate, add }) {
  var [startDate, setStartDate] = useState("");
  var [endDate, setEndDate] = useState("");

  useEffect(() => {
    setStartDate(sDate);
    setEndDate(eDate);

    return () => {
      setStartDate("");
      setEndDate("");
    };
  }, [sDate, eDate]);

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
          />
          <DateTimePicker
            renderInput={(params) => <TextField {...params} />}
            label="End Date and Time Selection"
            value={endDate}
            onAccept={() => add(startDate, endDate)}
            onChange={(end) => {
              setEndDate(end);
            }}
          />
        </div>
      </Stack>
    </LocalizationProvider>
  );
}
