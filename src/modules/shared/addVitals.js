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
import * as REGEX from '../../constants/regex';
import { UI } from "../../constants/project";

const helperTexts = {
  bloodPressure: {
    required: "Blood Pressure is Required",
    pattern: "Invalid data entered, please check",
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

  useEffect(() => {
    if (props.hasSubmitBtnClicked) {
      trigger();
    }
    const subscription = watch((value, { name, type }) => {
      props.kinEmergencyContDetails({ ...value });
    });
    return () => subscription.unsubscribe();
  }, [props.hasSubmitBtnClicked]);
  const closeDialog = () => {
    props.closePatientViewer();
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
                        placeholder={'120/80'}
                        error={error !== undefined}
                        helperText={
                          error ? helperTexts.bloodPressure[error.type] : ""
                        }
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
