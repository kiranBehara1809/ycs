import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  getMasterDataForDropdown,
  getMastersDataByEndPointNew,
} from "../../../http/masterRequests";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { calculateAgeFromDob } from "../../../common/functions/function";

const PatientPersonalDetailsCard = (props) => {
  // const [patientPersonalDetails, setPatientPersonalDetails] = useState({
  //   salutation: null,
  //   firstName: "",
  //   middleName: "",
  //   lastName: "",
  //   dateOfBirth:  null,
  //   age: "",
  //   gender: null,
  //   mobileNo: "",
  //   whatsAppNo: "",
  // });
  const [resetKey, setResetKey] = useState(true);
  const [salutationList, setSalutationList] = useState([]);
  const [bloodGroupList, setBloodGroupList] = useState([])
  const [genderList, setGenderList] = useState([]);
  const [selectedSalutation, setSelectedSalutation] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedBloodGroup, setSelectedBloogGroup] = useState(null);
  const [age, setAge] = useState(undefined);

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
      (await getMasterDataForDropdown("/masters/bloodGroup/all", "shortName")) ||
      [];
    setSalutationList(salutationApiResp || []);
    setBloodGroupList(bloodGroupApiResp || []);
    setGenderList(genderApiResp || []);
  };

  // const handleFormValueChange = (key, value) => {
  //   let val = value;
  //   if (typeof value === "object") {
  //     val = value?._id || null;
  //   }

  //   setPatientPersonalDetails((prev) => {
  //     return {
  //       ...prev,
  //       [key]: val,
  //     };
  //   });
  // };

  const handleDateOfBirthChange = (event) => {
    setAge((prev) => undefined);
    const dateOfBirth = dayjs(event).format("YYYY/MM/DD");
    const calculatedAge = calculateAgeFromDob(dateOfBirth);
    console.log(calculatedAge?.currentAgeStr, dateOfBirth);
    setAge(calculatedAge?.currentAgeStr || undefined);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = Object.fromEntries(data.entries());
    console.log(payload);
  };

  const resetForm = () => {
    setResetKey((prev) => !prev);
    setSelectedGender(null);
    setSelectedSalutation(null);
  };

  return (
    <>
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        key={resetKey}
        onReset={resetForm}
        sx={{ p: 1 }}
      >
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <FormControl sx={{ mt: "-3px" }} fullWidth>
              <Autocomplete
                disablePortal
                options={salutationList}
                value={selectedSalutation || null}
                isOptionEqualToValue={(option, value) =>
                  option?.label === value
                }
                onChange={(e, sal) => {
                  setSelectedSalutation(sal?.label || "");
                }}
                clearOnBlur={true}
                clearOnEscape={true}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Salutation"
                    variant="standard"
                    name="salutation"
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            {age && (
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  label="Age"
                  name="age"
                  value={props?.age || age || undefined}
                  defaultValue={age}
                  required
                  fullWidth
                  disabled
                  inputProps={{
                    maxLength: 25,
                  }}
                  size="small"
                  autoComplete="off"
                  variant="standard"
                />
              </FormControl>
            )}
          </Grid>
          <Grid item xs={4}>
            <FormControl sx={{ mt: "-3px" }} fullWidth>
              <Autocomplete
                disablePortal
                options={genderList}
                value={selectedGender || null}
                isOptionEqualToValue={(option, value) =>
                  option?.label === value
                }
                onChange={(e, opt) => {
                  setSelectedGender(opt?.label || null);
                }}
                clearOnBlur={true}
                clearOnEscape={true}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Gender"
                    variant="standard"
                    name="gender"
                  />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={1} sx={{ mt: "0.5px" }}>
          <Grid item xs={4}>
            <FormControl sx={{ width: "100%" }}>
              <TextField
                label="First Name"
                name="firstName"
                value={props?.firstName || undefined}
                defaultValue={undefined}
                required
                fullWidth
                inputProps={{
                  maxLength: 25,
                }}
                size="small"
                autoComplete="off"
                variant="standard"
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl sx={{ width: "100%" }}>
              <TextField
                label="Middle Name"
                name="middleName"
                value={props?.middleName || undefined}
                defaultValue={undefined}
                fullWidth
                inputProps={{
                  maxLength: 25,
                }}
                size="small"
                autoComplete="off"
                variant="standard"
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl sx={{ width: "100%" }}>
              <TextField
                label="Last Name"
                name="lastName"
                value={props?.lastName || undefined}
                defaultValue={undefined}
                required
                fullWidth
                inputProps={{
                  maxLength: 25,
                }}
                size="small"
                autoComplete="off"
                variant="standard"
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{ alignItems: "flex-end", mt: "0.5px" }}
          spacing={1}
        >
          <Grid item xs={4}>
            <FormControl sx={{ width: "100%" }}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="en-gb"
              >
                <DatePicker
                  yearsPerRow={3}
                  disableFuture
                  name="dateOfBirth"
                  required
                  label={"Date Of Birth"}
                  onChange={handleDateOfBirthChange}
                  value={props?.dateOfBirth || null}
                  slotProps={{
                    textField: {
                      required: true,
                      variant: "standard",
                    },
                  }}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                label="Mobile No"
                name="mobileNo"
                value={props?.mobileNo || undefined}
                defaultValue={undefined}
                required
                fullWidth
                inputProps={{
                  maxLength: 10,
                }}
                size="small"
                autoComplete="off"
                variant="standard"
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                options={bloodGroupList}
                value={selectedBloodGroup || null}
                isOptionEqualToValue={(option, value) =>
                  option?.label === value
                }
                onChange={(e, opt) => {
                  setSelectedBloogGroup(opt?.label || null);
                }}
                clearOnBlur={true}
                clearOnEscape={true}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Blood Group"
                    variant="standard"
                    name="bloodGroup"
                  />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
        {/* <Button variant="contained" type="submit">
          Save
        </Button>
        <Button variant="contained" type="reset">
          Reset
        </Button> */}
      </Box>
    </>
  );
};

export default PatientPersonalDetailsCard;
