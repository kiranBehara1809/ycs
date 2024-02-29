import React, { useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Slider,
  Select,
  MenuItem,
} from "@mui/material";
import * as REGEX from "../../../constants/regex";
import { OpRegistrationErrorMessages } from "./opRegistrationHelperText";
import { getMasterDataForDropdown } from "../../../http/masterRequests";
import { UI } from "../../../constants/project";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { calculateAgeFromDob } from "../../../common/functions/function";
import {
  FEMALE_OBJECT,
  MALE_OBJECT,
  MISSES_OBJECT,
  MISS_OBJECT,
  MISTER_OBJECT,
} from "../../../constants/common";

export default function PatientDetails(props) {
  const [commonApiResults, setCommonApiResults] = useState({
    genderList: [],
    salutationList: [],
    bloodGroupList: [],
    maritalStatusList: [],
  });
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    setFocus,
    trigger,
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
      props.patientDetails({ ...value });
    });
    return () => subscription.unsubscribe();
  }, [props.hasSubmitBtnClicked]);

  useEffect(() => {
    callInitialApi();
  }, []);
  const callInitialApi = async () => {
    const salutationApiResp =
      (await getMasterDataForDropdown(
        "/masters/salutation/all",
        "shortName"
      )) || [];
    const genderApiResp =
      (await getMasterDataForDropdown("/masters/gender/all", "completeName")) ||
      [];
    const bloodGroupApiResp =
      (await getMasterDataForDropdown(
        "/masters/bloodGroup/all",
        "shortName"
      )) || [];
    const maritalStatusApiResp =
      (await getMasterDataForDropdown(
        "/masters/maritalStatus/all",
        "completeName"
      )) || [];

    setCommonApiResults({
      bloodGroupList: bloodGroupApiResp || [],
      salutationList: salutationApiResp || [],
      genderList: genderApiResp || [],
      maritalStatusList: maritalStatusApiResp || [],
    });
  };

  const handleDateOfBirthChange = (event) => {
    const dateOfBirth = event;
    const calculatedAge = calculateAgeFromDob(dateOfBirth);
    setValue("ageString", calculatedAge?.currentAgeStr, {
      shouldValidate: true,
    });
  };

  return (
    <Box
      component="form"
      sx={{ pb: 1 }}
    >
      <Grid container spacing={1} sx={{ mb: 0.5 }}>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="salutation"
            defaultValue={null}
            rules={{
              required: true,
            }}
            render={({
              field: { ref, onChange, value, ...field },
              fieldState: { error },
            }) => (
              <Autocomplete
                options={commonApiResults?.salutationList}
                getOptionLabel={(option) => option.label}
                getOptionKey={(option) => option.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...field}
                    fullWidth
                    required
                    inputRef={ref}
                    variant={UI.fieldVariant}
                    label={"Salutation"}
                    error={error !== undefined}
                    helperText={
                      error
                        ? OpRegistrationErrorMessages.salutation[error.type]
                        : ""
                    }
                  />
                )}
                onChange={(_, data) => {
                  if (
                    data?.id === MISSES_OBJECT.objId ||
                    data?.id === MISS_OBJECT.objId
                  ) {
                    setValue("gender", FEMALE_OBJECT, {
                      shouldTouch: true,
                    });
                  } else if (data?.id === MISTER_OBJECT.objId) {
                    setValue("gender", MALE_OBJECT, {
                      shouldTouch: true,
                    });
                  } else {
                    setValue("gender", "");
                  }
                  if (data) onChange({ objId: data?.id, label: data?.label });
                  setFocus("gender");
                }}
                isOptionEqualToValue={(options) => options.id === value.objId}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="gender"
            defaultValue={null}
            rules={{
              required: true,
            }}
            render={({
              field: { ref, onChange, value, ...field },
              fieldState: { error },
            }) => (
              <Autocomplete
                options={commonApiResults?.genderList}
                getOptionLabel={(option) => option.label}
                getOptionKey={(option) => option.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...field}
                    fullWidth
                    required
                    inputRef={ref}
                    variant={UI.fieldVariant}
                    autoComplete="off"
                    label={"Gender"}
                    error={error !== undefined}
                    helperText={
                      error
                        ? OpRegistrationErrorMessages.gender[error.type]
                        : ""
                    }
                  />
                )}
                onChange={(_, data) => {
                  if (data) onChange({ objId: data?.id, label: data?.label });
                }}
                value={value || null}
                isOptionEqualToValue={(options) => options.id === value.objId}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="bloodGroup"
            defaultValue={null}
            rules={{
              required: true,
            }}
            render={({
              field: { ref, onChange, value, ...field },
              fieldState: { error },
            }) => (
              <Autocomplete
                options={commonApiResults.bloodGroupList}
                onChange={(_, data) =>
                  onChange({ objId: data?.id, label: data?.label })
                }
                defaultValue={null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...field}
                    fullWidth
                    required
                    inputRef={ref}
                    variant={UI.fieldVariant}
                    label="Blood Group"
                    error={error !== undefined}
                    helperText={
                      error
                        ? OpRegistrationErrorMessages.bloodGroup[error.type]
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
      <Grid container spacing={1} sx={{ mb: 0.5 }}>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="firstName"
            defaultValue=""
            rules={{
              required: true,
              pattern: REGEX.TEXT_REGEX.TEXT_WITH_SPACE_25,
              maxLength: 25,
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="text"
                variant={UI.fieldVariant}
                fullWidth
                autoComplete="off"
                label="First Name"
                required
                error={error !== undefined}
                helperText={
                  error ? OpRegistrationErrorMessages.firstName[error.type] : ""
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="middleName"
            defaultValue=""
            rules={{
              pattern: REGEX.TEXT_REGEX.TEXT_WITH_SPACE_25,
              maxLength: 25,
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="text"
                variant={UI.fieldVariant}
                fullWidth
                autoComplete="off"
                label="Middle Name"
                error={error !== undefined}
                helperText={
                  error
                    ? OpRegistrationErrorMessages.middleName[error.type]
                    : ""
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="lastName"
            defaultValue=""
            rules={{
              required: true,
              pattern: REGEX.TEXT_REGEX.TEXT_WITH_SPACE_25,
              maxLength: 25,
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="text"
                variant={UI.fieldVariant}
                fullWidth
                autoComplete="off"
                label="Last Name"
                required
                error={error !== undefined}
                helperText={
                  error ? OpRegistrationErrorMessages.lastName[error.type] : ""
                }
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mb: 0.5 }}>
        <Grid item xs={4}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="en-gb"
          >
            <Controller
              name="dateOfBirth"
              control={control}
              rules={{
                required: true,
              }}
              defaultValue={null}
              render={({
                field: { ref, onChange, ...field },
                fieldState: { error },
              }) => (
                <DatePicker
                  yearsPerRow={3}
                  disableFuture
                  required
                  value={field.value}
                  label={"Date Of Birth"}
                  onChange={(_, data) => {
                    onChange(_);
                    setValue("dob", dayjs(_.toDate()).format("DD/MM/YYYY"));
                    handleDateOfBirthChange(dayjs(_).format("YYYY/MM/DD"));
                  }}
                  inputRef={ref}
                  {...field}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      variant: UI.fieldVariant,
                      error: error !== undefined,
                      helperText: error
                        ? OpRegistrationErrorMessages.dateOfBirth[error.type]
                        : "",
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="ageString"
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="text"
                disabled
                variant={UI.fieldVariant}
                fullWidth
                label="Age"
                required
                error={error !== undefined}
                helperText={
                  error ? OpRegistrationErrorMessages.ageString[error.type] : ""
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="maritalStatus"
            defaultValue={null}
            rules={{
              required: true,
            }}
            render={({
              field: { ref, onChange, value, ...field },
              fieldState: { error },
            }) => (
              <Autocomplete
                options={commonApiResults?.maritalStatusList}
                getOptionLabel={(option) => option.label}
                getOptionKey={(option) => option.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...field}
                    fullWidth
                    required
                    inputRef={ref}
                    variant={UI.fieldVariant}
                    autoComplete="off"
                    label={"Marital Status"}
                    error={error !== undefined}
                    helperText={
                      error
                        ? OpRegistrationErrorMessages.lastName[error.type]
                        : ""
                    }
                  />
                )}
                onChange={(_, data) => {
                  if (data) onChange({ objId: data?.id, label: data?.label });
                }}
                isOptionEqualToValue={(options) => options.id === value.objId}
                value={value || null}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
