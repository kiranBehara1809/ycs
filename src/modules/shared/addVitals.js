import {
  Box,
  Dialog,
  Divider,
  Grid,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomDialogHeader from "../../common/components/customDialogHeader";
import { ADD_VITALS_ICON, USER_ICON } from "../../constants/icons";
import { Controller, useForm } from "react-hook-form";
import * as REGEX from "../../constants/regex";
import { UI } from "../../constants/project";

const helperTexts = {
  bloodPressure: {
    required: "Blood Pressure is Required",
    pattern: "Invalid data entered, please check",
  },
  bodyTemperature: {
    required: "Body Temperature is Required",
    pattern: "Invalid data entered, please check",
    maxLength: "Max Length Exceeded",
  },
  pulseRate: {
    required: "Pulse Rate is Required",
    pattern: "Invalid data entered, please check",
    maxLength: "Max Length Exceeded",
  },
  weight: {
    required: "Weight is Required",
    pattern: "Invalid data entered, please check",
    maxLength: "Max Length Exceeded",
    max: "Max value exceeded",
  },
};

const AddVitals = (props) => {
  const [open, setOpen] = useState(
    props?.selectedPatient !== null ? true : false
  );
  const [data, setData] = useState({
    patientDetails: props?.selectedPatient?.patientDetails || null,
    commonDetails: props?.selectedPatient?.commonDetails || null,
  });
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState,
    watch,
  } = useForm({
    mode: "all",
    reValidateMode: "onBlur",
  });

  // useEffect(() => {
  //   if (props.hasSubmitBtnClicked) {
  //     trigger();
  //   }
  //   const subscription = watch((value, { name, type }) => {
  //     props.kinEmergencyContDetails({ ...value });
  //   });
  //   return () => subscription.unsubscribe();
  // }, [props.hasSubmitBtnClicked]);

  const closeDialog = () => {
    props.closeAddVitals();
    setOpen(false);
  };
  return (
    <>
      <Dialog open={open || false} fullWidth maxWidth={"md"}>
        <CustomDialogHeader
          headerIcon={ADD_VITALS_ICON}
          headerTitle={"Add Vitals"}
          closeDialog={() => closeDialog()}
        />
        <Box sx={{ p: 1 }}>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={12}>
              <Grid
                container
                sx={{
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  p: 2,
                }}
              >
                <Grid item xs={2}>
                  <ListItemText
                    primary={data?.commonDetails?.patientNo || ""}
                    secondary="Patient No"
                  />
                </Grid>
                <Grid item xs={2}>
                  <ListItemText
                    primary={data?.commonDetails?.UHID || ""}
                    secondary="UHID"
                  />
                </Grid>
                <Grid item xs={2}>
                  <ListItemText
                    primary={data?.patientDetails?.firstName || ""}
                    secondary="First Name"
                  />
                </Grid>
                <Grid item xs={2}>
                  <ListItemText
                    primary={data?.patientDetails?.middleName || "--"}
                    secondary="Middle Name"
                  />
                </Grid>
                <Grid item xs={2}>
                  <ListItemText
                    primary={data?.patientDetails?.lastName || ""}
                    secondary="Last Name"
                  />
                </Grid>
                <Grid item xs={2}>
                  <ListItemText
                    primary={data?.patientDetails?.gender?.label || ""}
                    secondary="Gender"
                  />
                </Grid>
                <Grid item xs={2}>
                  <ListItemText
                    primary={data?.patientDetails?.maritalStatus?.label || ""}
                    secondary="Marital Status"
                  />
                </Grid>
                <Grid item xs={2}>
                  <ListItemText
                    primary={data?.patientDetails?.bloodGroup?.label || ""}
                    secondary="Blood Group"
                  />
                </Grid>
                <Grid item xs={2}>
                  <ListItemText
                    primary={data?.patientDetails?.ageString || ""}
                    secondary="Age"
                  />
                </Grid>
                <Grid item xs={2}>
                  <ListItemText
                    primary={
                      data?.patientDetails?.dateOfBirth?.split("T")[0] || ""
                    }
                    secondary="Date Of Birth"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="bloodPressure"
                    defaultValue=""
                    rules={{
                      required: true,
                      pattern: REGEX.TEXT_REGEX.BLOOD_PRESSURE,
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        type="text"
                        variant={UI.fieldVariant}
                        fullWidth
                        autoComplete="off"
                        label="Blood Pressure"
                        required
                        placeholder={"120/80"}
                        error={error !== undefined}
                        helperText={
                          error
                            ? helperTexts.bloodPressure[error.type]
                            : "Normal : 120/80"
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="bodyTemperature"
                    defaultValue=""
                    rules={{
                      required: true,
                      maxLength: 5,
                      pattern: REGEX.TEXT_REGEX.NUMBER_ONLY,
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        type="text"
                        required
                        variant={UI.fieldVariant}
                        fullWidth
                        autoComplete="off"
                        label="Body Temperature"
                        placeholder={"98.6 F"}
                        error={error !== undefined}
                        helperText={
                          error
                            ? helperTexts.bodyTemperature[error.type]
                            : "Nomral : 98.6F"
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="pulseRate"
                    defaultValue=""
                    rules={{
                      required: true,
                      pattern: REGEX.TEXT_REGEX.NUMBER_ONLY,
                      maxLength: 5,
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        type="text"
                        required
                        variant={UI.fieldVariant}
                        fullWidth
                        autoComplete="off"
                        label="Pulse Rate"
                        placeholder={"100 Bpm"}
                        error={error !== undefined}
                        helperText={
                          error ? helperTexts.pulseRate[error.type] : "Normal : 70-100 BPM"
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="weight"
                    defaultValue=""
                    rules={{
                      required: true,
                      maxLength: 3,
                      pattern: REGEX.TEXT_REGEX.NUMBER_ONLY,
                      max: 300,
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        type="text"
                        required
                        variant={UI.fieldVariant}
                        fullWidth
                        autoComplete="off"
                        label={"Weight"}
                        placeholder={"65KG"}
                        error={error !== undefined}
                        helperText={
                          error ? helperTexts.weight[error.type] : "In KG's"
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="height"
                    defaultValue=""
                    rules={{
                      maxLength: 5,
                      pattern: REGEX.TEXT_REGEX.NUMBER_ONLY,
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        type="text"
                        variant={UI.fieldVariant}
                        fullWidth
                        autoComplete="off"
                        label="Height"
                        placeholder={"170"}
                        helperText={"In CM"}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}></Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  );
};

export default AddVitals;
