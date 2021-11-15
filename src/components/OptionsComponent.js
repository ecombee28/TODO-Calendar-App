import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import styles from "../Styles/Components_Style/calendar.module.css";

const OptionsComponent = ({
  change,
  important,
  work,
  personal,
  holiday,
  vacation,
  other,
}) => {
  return (
    <div className={styles.checkBox_wrapper}>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              checked={important ? true : false}
              value="important"
              onChange={(event) => change(event)}
              sx={{
                color: "#d60404",
                "&.Mui-checked": {
                  color: "#d60404",
                },
              }}
            />
          }
          label="Important Events"
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              checked={work ? true : false}
              value="work"
              onChange={(event) => change(event)}
              sx={{
                color: "#ef6330",
                "&.Mui-checked": {
                  color: "#ef6330",
                },
              }}
            />
          }
          label="Work Events"
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              checked={personal ? true : false}
              value="personal"
              onChange={(event) => change(event)}
              sx={{
                color: "#02970f",
                "&.Mui-checked": {
                  color: "#02970f",
                },
              }}
            />
          }
          label="Personal Events"
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              checked={holiday ? true : false}
              value="holiday"
              onChange={(event) => change(event)}
              sx={{
                color: "#6945cc",
                "&.Mui-checked": {
                  color: "#6945cc",
                },
              }}
            />
          }
          label="Holiday Events"
        />

        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              checked={vacation ? true : false}
              value="vacation"
              onChange={(event) => change(event)}
              sx={{
                color: "#30b4d1",
                "&.Mui-checked": {
                  color: "#30b4d1",
                },
              }}
            />
          }
          label="Vacation Events"
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              checked={other ? true : false}
              value="other"
              onChange={(event) => change(event)}
              sx={{
                color: "#457dcc",
                "&.Mui-checked": {
                  color: "#457dcc",
                },
              }}
            />
          }
          label="Other Events"
        />
      </FormGroup>
    </div>
  );
};

export default OptionsComponent;
