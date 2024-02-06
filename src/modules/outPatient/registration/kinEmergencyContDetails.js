import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import * as REGEX from "../../../constants/regex";
import { OpRegistrationErrorMessages } from "./opRegistrationHelperText";
import { getMasterDataForDropdown } from "../../../http/masterRequests";
import { UI } from "../../../constants/project";

export default function KinEmergencyContDetails(props) {
  const [commonApiResults, setCommonApiResults] = useState({
    relationList: [],
  });
  const { control, handleSubmit, setValue, getValues, trigger } = useForm({
    mode: "all",
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
    const relationApiResp =
      (await getMasterDataForDropdown(
        "/masters/relation/all",
        "completeName"
      )) || [];
    setCommonApiResults({
      relationList: relationApiResp || [],
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleOnSubmit)}
      sx={{ pb: 1 }}
    >
      <Grid container spacing={1} sx={{ mb: 0.5 }}>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="kinFirstName"
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
                label="Kin First Name"
                required
                error={error !== undefined}
                helperText={
                  error
                    ? OpRegistrationErrorMessages.kinFirstName[error.type]
                    : ""
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="kinLastName"
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
                label="Kin Last Name"
                required
                error={error !== undefined}
                helperText={
                  error
                    ? OpRegistrationErrorMessages.kinLastName[error.type]
                    : ""
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name="kinRelation"
            defaultValue={null}
            rules={{
              required: true,
            }}
            render={({
              field: { ref, onChange, value, ...field },
              fieldState: { error },
            }) => (
              <Autocomplete
                options={commonApiResults.relationList}
                onChange={(_, data) => {
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
                    label="Kin Relation"
                    error={error !== undefined}
                    helperText={
                      error
                        ? OpRegistrationErrorMessages.kinRelation[error.type]
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
        <Grid item xs={12}>
          <Controller
            control={control}
            name="kinComments"
            defaultValue=""
            rules={{
              pattern: REGEX.TEXT_REGEX.TEXT_WITH_ALL,
              maxLength: 200,
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="text"
                multiline
                maxRows={3}
                variant={UI.fieldVariant}
                fullWidth
                autoComplete="off"
                label="Comments"
                error={error !== undefined}
                helperText={
                  error
                    ? OpRegistrationErrorMessages.kinLastName[error.type]
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
