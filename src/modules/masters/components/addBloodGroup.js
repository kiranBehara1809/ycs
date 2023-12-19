import { Alert, Box, Button, FormControl, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { BLOOD_GROUP_REGEX } from "../../../constants/regex";

const AddBloodGroup = (props) => {
  const [resetKey, setResetKey] = useState(true);

  const handleSave = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = Object.fromEntries(data.entries());
  };

  const handleReset = () => {
    setResetKey((prev) => !prev);
  };
  return (
    <>
      <Box component={"form"} key={resetKey} onSubmit={handleSave}>
        <FormControl sx={{ width: "100%" }}>
          <TextField
            label="Short Name"
            name="shortName"
            value={props?.selObj?.shortName || ""}
            required
            disabled={props?.viewOnly || false}
            fullWidth
            autoFocus
            inputProps={{
              maxLength: 3,
              pattern: BLOOD_GROUP_REGEX,
              style: { textTransform: "uppercase" },
            }}
            size="small"
            autoComplete="off"
            variant="standard"
          />
        </FormControl>
        <FormControl sx={{ width: "100%", mt: 1 }}>
          <TextField
            label="Complete Name"
            name="completeName"
            value={props?.selObj?.completeName || ""}
            disabled={props?.viewOnly || false}
            required
            fullWidth
            size="small"
            autoComplete="off"
            variant="standard"
            helperText=""
          />
        </FormControl>
        {props?.viewOnly ? (
          <Alert severity="info" variant="standard" sx={{mt:2}}>Note: This is in view only mode!</Alert>
        ) : (
          <>
            {" "}
            <Grid
              container
              spacing={1}
              sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}
            >
              <Grid xs={5}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ textTransform: "none" }}
                >
                  Save
                </Button>
              </Grid>
              <Grid xs={5}>
                <Button
                  onClick={handleReset}
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="secondary"
                  sx={{ textTransform: "none" }}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </>
  );
};

export default AddBloodGroup;
