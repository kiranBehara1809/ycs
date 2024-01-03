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
import { useTheme } from "@emotion/react";

const SingleFieldCommonForm = (props) => {
  const theme = useTheme();
  const [formValues, setFormValues] = useState({
    shortName: props?.selObj?.shortName || "",
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

export default SingleFieldCommonForm;
