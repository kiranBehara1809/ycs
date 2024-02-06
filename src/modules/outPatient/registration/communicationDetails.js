import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import * as REGEX from "../../../constants/regex";
import { OpRegistrationErrorMessages } from "./opRegistrationHelperText";
import { getMasterDataForDropdown } from "../../../http/masterRequests";
import { UI } from "../../../constants/project";

export default function CommunicationDetails(props) {
  const [commonApiResults, setCommonApiResults] = useState({
    cityList: [],
    stateList: [],
    countryList: [],
  });
  const { control, handleSubmit, setValue, getValues, trigger, setFocus } =
    useForm({
      mode: "onChange",
      reValidateMode: "onBlur",
    });

  const handleOnSubmit = (evt) => {
    console.log(evt);
  };

  useEffect(() => {
    callInitialApi();
  }, []);
  useEffect(() => {
    if (props.hasSubmitBtnClicked && props.hasSubmitBtnClicked === true) {
      trigger();
    }
  }, [props.hasSubmitBtnClicked]);
  const callInitialApi = async () => {
    const countryApiResp =
      (await getMasterDataForDropdown(
        "/masters/country/all",
        "completeName"
      )) || [];

    setCommonApiResults({
      cityList: [],
      stateList: [],
      countryList: countryApiResp || [],
    });
  };

  const onChangeCountry = async () => {
    const stateApiResp =
      (await getMasterDataForDropdown(
        `/masters/state/all/${getValues("country")?.objId}`,
        "completeName"
      )) || [];
    setCommonApiResults((prev) => {
      return {
        cityList: prev.cityList || [],
        stateList: stateApiResp || [],
        countryList: prev.countryList || [],
      };
    });
  };
  const onChangeState = async () => {
    const cityApiResp =
      (await getMasterDataForDropdown(
        `/masters/city/all/${getValues("state")?.objId}`,
        "completeName"
      )) || [];
    setCommonApiResults((prev) => {
      return {
        cityList: cityApiResp || [],
        stateList: prev.stateList || [],
        countryList: prev.countryList || [],
      };
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleOnSubmit)}
      sx={{ pb: 1 }}
    >
      <Grid container spacing={1} sx={{ mb: 0.5 }}>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="addressLine1"
            defaultValue=""
            rules={{
              required: true,
              pattern: REGEX.TEXT_REGEX.TEXT_WITH_ALL,
              maxLength: 50,
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="text"
                variant={UI.fieldVariant}
                fullWidth
                autoComplete="off"
                label="Address Line 1"
                required
                placeholder="D.No / Flat No / House No, Street, Landmark, Area"
                error={error !== undefined}
                helperText={
                  error
                    ? OpRegistrationErrorMessages.addressLine1[error.type]
                    : ""
                }
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mb: 0.5 }}>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="country"
            defaultValue={null}
            rules={{
              required: true,
            }}
            render={({
              field: { ref, onChange, value, ...field },
              fieldState: { error },
            }) => (
              <Autocomplete
                options={commonApiResults.countryList}
                onChange={(_, data) => {
                  onChange({ objId: data?.id, label: data?.label });
                  onChangeCountry();
                  setFocus("state");
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
                    label="Country"
                    error={error !== undefined}
                    helperText={
                      error
                        ? OpRegistrationErrorMessages.country[error.type]
                        : ""
                    }
                  />
                )}
                isOptionEqualToValue={(options) => options.id === value.objId}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="state"
            rules={{
              required: true,
            }}
            render={({
              field: { ref, onChange, value, ...field },
              fieldState: { error },
            }) => (
              <Autocomplete
                options={commonApiResults?.stateList}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...field}
                    fullWidth
                    required
                    inputRef={ref}
                    variant={UI.fieldVariant}
                    autoComplete="off"
                    label={"State"}
                    error={error !== undefined}
                    helperText={
                      error ? OpRegistrationErrorMessages.state[error.type] : ""
                    }
                  />
                )}
                onChange={(_, data) => {
                  if (data) onChange({ objId: data?.id, label: data?.label });
                  onChangeState();
                  setFocus("city");
                }}
                isOptionEqualToValue={(options) => options.id === value.objId}
                value={value || null}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="city"
            defaultValue={null}
            rules={{
              required: true,
            }}
            render={({
              field: { ref, onChange, value, ...field },
              fieldState: { error },
            }) => (
              <Autocomplete
                options={commonApiResults?.cityList}
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
                    label="City"
                    error={error !== undefined}
                    helperText={
                      error ? OpRegistrationErrorMessages.city[error.type] : ""
                    }
                  />
                )}
                isOptionEqualToValue={(options) => options.id === value.objId}
                onChange={(_, data) => {
                  if (data) onChange({ objId: data?.id, label: data?.label });
                }}
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mb: 0.5 }}>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="contactNo"
            defaultValue=""
            rules={{
              required: true,
              pattern: REGEX.TEXT_REGEX.MOBILE_NO,
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="number"
                variant={UI.fieldVariant}
                fullWidth
                autoComplete="off"
                label="Contact No"
                required
                error={error !== undefined}
                helperText={
                  error ? OpRegistrationErrorMessages.contactNo[error.type] : ""
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="alternateContactNo"
            defaultValue=""
            rules={{
              pattern: REGEX.TEXT_REGEX.MOBILE_NO,
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="number"
                variant={UI.fieldVariant}
                fullWidth
                autoComplete="off"
                label="Alt Contact No"
                error={error !== undefined}
                helperText={
                  error
                    ? OpRegistrationErrorMessages.alternateContactNo[error.type]
                    : ""
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="whatsAppNo"
            defaultValue=""
            rules={{
              pattern: REGEX.TEXT_REGEX.MOBILE_NO,
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="number"
                variant={UI.fieldVariant}
                fullWidth
                autoComplete="off"
                label="WhatsApp No"
                error={error !== undefined}
                helperText={
                  error
                    ? OpRegistrationErrorMessages.whatsAppNo[error.type]
                    : ""
                }
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
