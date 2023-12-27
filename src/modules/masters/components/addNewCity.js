import {
  Alert,
  Autocomplete,
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
  getMastersDataByEndPointNew,
  saveMastersData,
  updateMastersData,
} from "../../../http/masterRequests";

const AddNewCity = (props) => {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [formValues, setFormValues] = useState({
    shortName: props?.selObj?.shortName || "",
    completeName: props?.selObj?.completeName || "",
    stateId: props?.selObj?.stateId || "",
  });

  useEffect(() => {
    getAllStates();
  }, []);

  useEffect(() => {
    setSelectedState(props?.selObj?.stateName || "");
  }, [props]);

  const getAllStates = async () => {
    const response = await getMastersDataByEndPointNew(`/masters/state`);
    const states = response?.map((x) => {
      return {
        label: `${x.completeName}`,
        id: x._id,
      };
    });
    setStates(states || []);
  };

  const readonlyFlag =
    props?.dialogType === "delete" || props?.dialogType === "view";

  const handleFormValueChange = (key, value) => {
    let val = value;
    if (typeof value === "object") {
      val = value?.id || "";
    }

    setFormValues((prev) => {
      return {
        ...prev,
        [key]: val,
      };
    });
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const payload = { ...formValues, stateName: selectedState };
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
    setSelectedState("");
    setFormValues((prev) => {
      return {
        shortName: "",
        completeName: "",
        stateId: "",
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
        <FormControl sx={{ width: "100%", mt: -1 }}>
          <Autocomplete
            disablePortal
            id="state-combo-box-demo"
            options={states}
            value={selectedState || ""}
            getOptionKey={(option) => option.label}
            onChange={(e, state) => {
              handleFormValueChange("stateId", state?.id || "");
              setSelectedState(state?.label || "");
            }}
            disabled={readonlyFlag || false}
            clearOnBlur={true}
            clearOnEscape={true}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="State"
                variant="standard"
                name="stateId"
              />
            )}
          />
        </FormControl>

        <FormControl sx={{ width: "100%", mt: 1 }}>
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

export default AddNewCity;
