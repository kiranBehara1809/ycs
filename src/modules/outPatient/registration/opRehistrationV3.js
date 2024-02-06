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

const options = ["A", "B", "C", "D"];
const objOptions = [
  { value: 65, label: "A" },
  { value: 66, label: "B" },
  { value: 67, label: "C" },
];
const myHelper = {
  email: {
    required: "Email is Required",
    pattern: "Invalid Email Address",
  },
};

export default function RegnFormV3() {
  const [commonApiResults, setCommonApiResults] = useState({
    genderList: [],
    salutationList: [],
    bloodGroupList: [],
  });
  const { control, handleSubmit, setValue } = useForm({
    reValidateMode: "onBlur",
  });
  // const {
  //   fields: members,
  //   append: appendMemberRow,
  //   remove: removeMemberRow,
  // } = useFieldArray({
  //   control,
  //   name: "members",
  // });

  const handleOnSubmit = (evt) => {
    console.log(evt);
  };

  // const addNewMemeber = () => appendMemberRow({ email: "", role: "user" });

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

    setCommonApiResults({
      bloodGroupList: bloodGroupApiResp || [],
      salutationList: salutationApiResp || [],
      genderList: genderApiResp || [],
    });
  };

  return (
    <div className="App">
      <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Controller
              control={control}
              name="salutation"
              defaultValue={null}
              rules={{
                required: true,
              }}
              render={({ field: { ref, onChange, ...field } }) => (
                <Autocomplete
                  options={commonApiResults?.salutationList}
                  onChange={(_, data) => onChange(data)}
                  defaultValue={null}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...field}
                      fullWidth
                      required
                      inputRef={ref}
                      variant={UI.fieldVariant}
                      label="Salutation"
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={control}
              name="ageString"
              defaultValue="10Y 2M 21D"
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
                    error
                      ? OpRegistrationErrorMessages.ageString[error.type]
                      : ""
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={control}
              name="gender"
              defaultValue={null}
              rules={{
                required: true,
              }}
              render={({ field: { ref, onChange, ...field } }) => (
                <Autocomplete
                  options={commonApiResults.genderList}
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
                      label="Gender"
                    />
                  )}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={3}>
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
                  label="First Name"
                  required
                  error={error !== undefined}
                  helperText={
                    error
                      ? OpRegistrationErrorMessages.firstName[error.type]
                      : ""
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={3}>
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
          <Grid item xs={3}>
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
                  label="Last Name"
                  required
                  error={error !== undefined}
                  helperText={
                    error
                      ? OpRegistrationErrorMessages.lastName[error.type]
                      : ""
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="auto-complete"
              defaultValue={options[0]}
              render={({ field: { ref, onChange, ...field } }) => (
                <Autocomplete
                  options={options}
                  onChange={(_, data) => onChange(data)}
                  defaultValue={options[0]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...field}
                      fullWidth
                      inputRef={ref}
                      variant="filled"
                      label="Auto-Complete"
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="object-component"
              defaultValue={[objOptions[0]]}
              render={({ field: { ref, onChange, ...field } }) => (
                <Autocomplete
                  multiple
                  options={commonApiResults.bloodGroupList}
                  defaultValue={[objOptions[0]]}
                  getOptionLabel={(option) => option.label}
                  onChange={(_, data) => onChange(data)}
                  renderInput={(params) => (
                    <TextField
                      {...field}
                      {...params}
                      fullWidth
                      inputRef={ref}
                      variant="filled"
                      label="object-complete"
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="check-box"
              defaultValue={false}
              render={({ field: { value, onChange, ...field } }) => (
                <FormControlLabel
                  control={
                    <Checkbox onChange={onChange} checked={value} {...field} />
                  }
                  label="checkbox"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="radio-group"
              defaultValue=""
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel
                    value="choice-1"
                    control={<Radio />}
                    label="A"
                  />
                  <FormControlLabel
                    value="choice-2"
                    control={<Radio />}
                    label="B"
                  />
                  <FormControlLabel
                    value="choice-3"
                    control={<Radio />}
                    label="C"
                  />
                  <FormControlLabel
                    value="choice-4"
                    control={<Radio />}
                    label="D"
                  />
                </RadioGroup>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="slider"
              defaultValue={50}
              render={({ field: { value, ...field } }) => (
                <Slider
                  {...field}
                  marks
                  max={100}
                  min={0}
                  step={5}
                  value={value}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="slider-range"
              defaultValue={[0, 50]}
              render={({ field: { value, ...field } }) => (
                <Slider
                  {...field}
                  marks
                  max={100}
                  min={0}
                  step={5}
                  value={value}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="email"
              defaultValue=""
              rules={{
                required: true,
                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  type="email"
                  fullWidth
                  label="Email With Validation"
                  error={error !== undefined}
                  helperText={error ? myHelper.email[error.type] : ""}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit">Submit</Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
