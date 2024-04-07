import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Autocomplete,
  Box,
  Grid,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import * as REGEX from "../../../constants/regex";
import { OpRegistrationErrorMessages } from "./opRegistrationHelperText";
import { getMasterDataForDropdown } from "../../../http/masterRequests";
import { UI } from "../../../constants/project";

export default function DocSelectionDetails(props) {
  const [docInfo, setDocInfo] = useState(null);
  const [commonApiResults, setCommonApiResults] = useState({
    doctorsList: [],
  });
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    setFocus,
    formState,
    watch,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  useEffect(() => {
    callInitialApi();
  }, []);

  useEffect(() => {
    if (props.hasSubmitBtnClicked) trigger();
    const subscription = watch((value, { name, type }) => {
      props.docSelectionDetails({ ...value });
    });
    return () => subscription.unsubscribe();
  }, [props.hasSubmitBtnClicked]);

  const callInitialApi = async () => {
    const doctorApiResp =
      (await getMasterDataForDropdown("/masters/doctor/all", "doctorName")) ||
      [];
    setCommonApiResults({
      doctorsList: doctorApiResp || [],
    });
  };

  return (
    <Box component="form" sx={{ pb: 1 }}>
      <Grid container spacing={1} sx={{ mb: 0.5 }}>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="doctor"
            defaultValue={null}
            rules={{
              required: true,
            }}
            render={({
              field: { ref, onChange, value, ...field },
              fieldState: { error },
            }) => (
              <Autocomplete
                options={commonApiResults.doctorsList}
                onChange={(_, data) => {
                  setDocInfo(data);
                  onChange({ objId: data?.id, label: data?.label });
                }}
                defaultValue={null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...field}
                    fullWidth
                    required
                    inputRef={ref}
                    variant={UI.fieldVariant}
                    label="Doctor"
                    error={error !== undefined}
                    helperText={
                      error
                        ? OpRegistrationErrorMessages.doctor[error.type]
                        : ""
                    }
                  />
                )}
                isOptionEqualToValue={(options) => options.id === value.objId}
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <ListItemText
            primary={`${docInfo?.doctorName || "-"}`}
            secondary="Doctor Name"
          />
        </Grid>
        <Grid item xs={4}>
          <ListItemText
            primary={`${
              docInfo?.degrees?.map((x) => x.label).join(", ") || "-"
            }`}
            secondary="Degrees"
          />
        </Grid>
        <Grid item xs={4}>
          <ListItemText
            primary={`${docInfo?.speaciality?.label || "-"}`}
            secondary="Speciality"
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <ListItemText
            primary={
              <Typography variant="h5">
                {docInfo?.docConsultationFees || "-"}
              </Typography>
            }
            secondary="Consultation Fees"
          />
        </Grid>
        <Grid item xs={4}>
          <ListItemText
            primary={`${docInfo?.docSlotTimeIntervalInMinutes || "-"} min`}
            secondary="Slot Interval Time"
          />
        </Grid>
        <Grid item xs={4}>
          <ListItemText
            primary={`${docInfo?.additionalInformation || "-"}`}
            secondary="Additional Information"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
