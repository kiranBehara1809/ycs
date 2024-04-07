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
import { UI } from "../../../constants/project";


const AddNewState = (props) => {
  const [countires, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [formValues, setFormValues] = useState({
    shortName: props?.selObj?.shortName || "",
    completeName: props?.selObj?.completeName || "",
    countryId: props?.selObj?.countryId || "",
  });

  useEffect(() => {
    getAllCountries();
  }, []);

  useEffect(() => {
    setSelectedCountry(props?.selObj?.countryName || "");
  }, [props]);

  const getAllCountries = async () => {
    const response = await getMastersDataByEndPointNew(`/masters/country`);
    let defaultCountry = null;
    const countries = response?.map((x) => {
      if (x.default) {
        defaultCountry = x;
      }
      return {
        label: `${x.completeName}`,
        flag: `${x.flag}`,
        id: x._id,
      };
    });
    // if (defaultCountry){
    //   setFormValues({
    //     countryId : defaultCountry?._id
    //   })
    //   setSelectedCountry(defaultCountry?.completeName)
    // }
    setCountries(countries || []);
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
    const payload = { ...formValues, countryName: selectedCountry };
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
    setSelectedCountry("");
    setFormValues((prev) => {
      return {
        shortName: "",
        completeName: "",
        countryId: "",
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
            id="combo-box-demo"
            options={countires}
            value={selectedCountry || ""}
            getOptionKey={(option) => option.label}
            onChange={(e, country) => {
              handleFormValueChange("countryId", country?.id || "");
              setSelectedCountry(country?.label || "");
            }}
            disabled={readonlyFlag || false}
            clearOnBlur={true}
            clearOnEscape={true}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Country"
                variant={UI.fieldVariant}
                name="countryId"
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
            variant={UI.fieldVariant}
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
            variant={UI.fieldVariant}
            helperText={`Max Length is ${props?.completeNameMaxLength || 30}`}
          />
        </FormControl>

        {props?.dialogType === "view" ? (
          <Alert severity="info" variant={UI.fieldVariant} sx={{ mt: 2 }}>
            Note: This is in view only mode!
          </Alert>
        ) : null}
        {props?.dialogType === "delete" ? (
          <Alert severity="error" variant={UI.fieldVariant} sx={{ mt: 2 }}>
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

export default AddNewState;
