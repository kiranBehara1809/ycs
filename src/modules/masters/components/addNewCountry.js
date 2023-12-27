import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  alpha,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  deleteMastersData,
  saveMastersData,
  updateMastersData,
} from "../../../http/masterRequests";

const AddNewCountry = (props) => {
  const [formValues, setFormValues] = useState({
    shortName: props?.selObj?.shortName || "",
    completeName: props?.selObj?.completeName || "",
    currencySymbol: props?.selObj?.currencySymbol || "",
    callingCode: props?.selObj?.callingCode || "",
  });
  const readonlyFlag =
    props?.dialogType === "delete" || props?.dialogType === "view";

  const handleFormValueChange = (key, value) => {
    setFormValues((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = Object.fromEntries(data.entries());
    const api = props?.selObj
      ? `${props.apiEndPoint}/update/${props.selObj._id}`
      : `${props.apiEndPoint}`;
    const response = props?.selObj
      ? await updateMastersData(api, payload)
      : await saveMastersData(`${api}`, payload);
    if (response) {
      handleReset();
      props.closeModalAndRenderTable(props);
    }
  };

  const handleDelete = async () => {
    const response = await deleteMastersData(
      `${props.apiEndPoint}/delete/${props.selObj._id}`
    );
    if (response) {
      handleReset();
      props.closeModalAndRenderTable(props);
    }
  };

  const handleReset = () => {
    setFormValues((prev) => {
      return {
        shortName: "",
        completeName: "",
        currencySymbol : "",
        callingCode : ""
      };
    });
  };
  return (
    <>
      <Box
        component={"form"}
        key={props?.dialogType}
        onSubmit={handleSave}
        onReset={handleReset}
      >
        <FormControl sx={{ width: "100%" }}>
          <TextField
            label="Short Name"
            name="shortName"
            value={formValues.shortName}
            required
            onChange={(e) =>
              handleFormValueChange(
                "shortName",
                props?.captalizeShortName
                  ? e.target.value.toLocaleUpperCase()
                  : e.target.value
              )
            }
            disabled={readonlyFlag || false}
            fullWidth
            autoFocus
            inputProps={{
              maxLength: props?.shortNameMaxLength || 10,
              textTransform: props?.captalizeShortName
                ? "uppercase !important"
                : "none !important",
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
            value={formValues.completeName}
            onChange={(e) =>
              handleFormValueChange("completeName", e.target.value)
            }
            inputProps={{
              maxLength: props?.completeNameMaxLength || 30,
            }}
            disabled={readonlyFlag || false}
            required
            fullWidth
            size="small"
            autoComplete="off"
            variant="standard"
            helperText={`Max Length is ${props?.completeNameMaxLength || 30}`}
          />
        </FormControl>
        <FormControl sx={{ width: "100%", mt: 1 }}>
          <TextField
            label="Currency Symbol"
            name="currencySymbol"
            value={formValues.currencySymbol}
            required
            onChange={(e) =>
              handleFormValueChange("currencySymbol", e.target.value)
            }
            disabled={readonlyFlag || false}
            fullWidth
            autoFocus
            inputProps={{
              maxLength: 2,
            }}
            size="small"
            autoComplete="off"
            variant="standard"
          />
        </FormControl>
        <FormControl sx={{ width: "100%", mt: 1 }}>
          <TextField
            label="Phone Number Code"
            name="callingCode"
            value={formValues.callingCode}
            required
            onChange={(e) =>
              handleFormValueChange("callingCode", e.target.value)
            }
            disabled={readonlyFlag || false}
            fullWidth
            autoFocus
            inputProps={{
              maxLength: 4,
            }}
            size="small"
            autoComplete="off"
            variant="standard"
          />
        </FormControl>

        {props?.dialogType === "view" ? (
          <Alert severity="info" variant="standard" sx={{ mt: 2 }}>
            Note: This is in view only mode!
          </Alert>
        ) : null}
        {props?.dialogType === "delete" ? (
          <Alert severity="error" variant="standard" sx={{ mt: 2 }}>
            Note: You are about to delete this record!
          </Alert>
        ) : null}

        {props?.dialogType === "add" || props?.dialogType === "edit" ? (
          <Grid
            container
            spacing={1}
            sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}
          >
            <Grid item xs={5}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ textTransform: "none" }}
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={5}>
              <Button
                type="reset"
                variant="contained"
                fullWidth
                color="secondary"
                sx={{ textTransform: "none" }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        ) : null}
        {props?.dialogType === "delete" ? (
          <Grid
            container
            spacing={1}
            sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}
          >
            <Grid item xs={12}>
              <Button
                type="button"
                onClick={handleDelete}
                variant="contained"
                fullWidth
                color="error"
                sx={{
                  textTransform: "none",
                }}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        ) : null}
      </Box>
    </>
  );
};

export default AddNewCountry;
