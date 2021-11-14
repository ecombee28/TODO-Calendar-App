import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MobileDateRangePicker from "@mui/lab/MobileDateRangePicker";

export default function DatePicker({ sDate, eDate, add }) {
  const [dates, setDates] = useState([sDate, eDate]);

  //this just adds 2 hours to the time so that it will show the
  //correct date on the calendar
  const sendDates = () => {
    dates[0].setHours(dates[0].getHours() + 2);
    dates[1].setHours(dates[1].getHours() + 2);
    add(dates);
  };

  return (
    <div className="container">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <MobileDateRangePicker
            startText="Pick Start Date"
            endText="Pick Stop Date"
            clearable={true}
            value={dates}
            onAccept={sendDates}
            onChange={(newValue) => {
              setDates(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
          />
        </Stack>
      </LocalizationProvider>
    </div>
  );
}
