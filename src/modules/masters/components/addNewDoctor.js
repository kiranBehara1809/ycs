import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  TextField,
  alpha,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  deleteMastersData,
  getMasterDataForDropdown,
  saveMastersData,
  updateMastersData,
} from "../../../http/masterRequests";
import { SLOT_TIME_IN_MINUTES} from '../../../constants/appointment'

const AddNewDoctor = (props) => {
  const [degrees, setDegrees] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);
  const [genderList, setGenderList] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedSlotTime, setSelectedSlotTime] = useState(null);
  const [formValues, setFormValues] = useState({
    docConsultationFees : props?.selObj?.docConsultationFees || "",
    doctorName: props?.selObj?.doctorName || "",
    docGender: props?.selObj?.docGender || null,
    speaciality: props?.selObj?.speaciality || null,
    docSlotTimeIntervalInMinutes:
      props?.selObj?.docSlotTimeIntervalInMinutes || null,
    additionalInformation: props?.selObj?.additionalInformation || "",
  });

  useEffect(() => {
    getInitialApi();
  }, []);

  useEffect(() => {
    console.log("props", props?.selObj);
    setSelectedDegree(props?.selObj?.degrees || []);
    setSelectedSpeciality(props?.selObj?.speaciality || null);
    setSelectedGender(props?.selObj?.docGender || null);
    setSelectedSlotTime(props?.selObj?.docSlotTimeIntervalInMinutes.toString() || null);
  }, [props]);

  const getInitialApi = async () => {
    const genders = await getMasterDataForDropdown(
      `/masters/gender/all`,
      "completeName"
    );
    const degrees = await getMasterDataForDropdown(
      `/masters/docDegree/all`,
      "shortName"
    );
    const specialities = await getMasterDataForDropdown(
      `/masters/docSpeciality/all`,
      "completeName"
    );
    setDegrees(degrees || []);
    setSpecialities(specialities || []);
    setGenderList(genders || []);
  };



  const disabledFlag =
    props?.dialogType === "delete" || props?.dialogType === "view";

  const handleFormValueChange = (key, value) => {
    let val = value;
    if (typeof value === "object") {
      val = value || "";
    }

    setFormValues((prev) => {
      return {
        ...prev,
        [key]: val,
      };
    });
  };

  const handleSave = async (event) => {
    let dg = []
    selectedDegree?.map(x => {
        const { id, label } = degrees?.find(y => y.label === x.label)
        dg.push({
            objId : id,
            label : label
        })
    })
    event.preventDefault();
    const payload = {
      ...formValues,
      docSlotTimeIntervalInMinutes : +selectedSlotTime || 15,
      degrees: dg || []
    };
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
    setSelectedDegree([]);
    setSelectedSpeciality("");
    setSelectedGender("");
    setSelectedSlotTime("")
    setFormValues((prev) => {
      return {
        doctorName: "",
        docGender: null,
        speaciality: null,
        additionalInformation: "",
        docSlotTimeIntervalInMinutes: null,
        docConsultationFees : ""
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
        <FormControl sx={{ width: "100%", mt: "-8px" }}>
          <TextField
            label="Doctor Name"
            name="doctorName"
            value={formValues.doctorName}
            required
            onChange={(e) =>
              handleFormValueChange("doctorName", e.target.value)
            }
            disabled={disabledFlag || false}
            fullWidth
            autoFocus
            inputProps={{
              maxLength: 120,
            }}
            size="small"
            autoComplete="off"
            variant="standard"
          />
        </FormControl>
        <FormControl sx={{ width: "100%" }}>
          <Autocomplete
            disablePortal
            id="doc-gender-combo"
            options={genderList}
            isOptionEqualToValue={(option, value) =>
              option?.label === value || option?.id === value.objId
            }
            value={selectedGender || ""}
            onChange={(e, opt) => {
              handleFormValueChange(
                "docGender",
                { objId: opt?.id, label: opt?.label } || ""
              );
              setSelectedGender(opt || "");
            }}
            disabled={disabledFlag || false}
            clearOnBlur={true}
            clearOnEscape={true}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Gender"
                variant="standard"
                name="docGender"
              />
            )}
          />
        </FormControl>
        <FormControl sx={{ width: "100%" }}>
          <Autocomplete
            disablePortal
            id="doc-degrees-combo"
            options={degrees}
            multiple
            isOptionEqualToValue={(option, value) =>
              option?.id === value.id || option?.id === value.objId
            }
            value={selectedDegree || []}
            onChange={(e, opt) => {
              setSelectedDegree(opt);
            }}
            required
            disabled={disabledFlag || false}
            clearOnBlur={true}
            clearOnEscape={true}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Degrees"
                variant="standard"
                name="degrees"
              />
            )}
          />
        </FormControl>
        <FormControl sx={{ width: "100%" }}>
          <Autocomplete
            disablePortal
            id="doc-speaciality-combo"
            options={specialities}
            isOptionEqualToValue={(option, value) =>
              option?.label === value || option?.id === value.objId
            }
            value={selectedSpeciality || ""}
            getOptionKey={(option) => option.label}
            onChange={(e, opt) => {
              handleFormValueChange("speaciality", {
                objId: opt?.id,
                label: opt?.label,
              });
              setSelectedSpeciality(opt?.label || "");
            }}
            disabled={disabledFlag || false}
            clearOnBlur={true}
            clearOnEscape={true}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Speaciality"
                variant="standard"
                name="speaciality"
              />
            )}
          />
        </FormControl>
        <FormControl sx={{ width: "100%" }}>
          <Autocomplete
            disablePortal
            id="doc-slottime-combo"
            options={SLOT_TIME_IN_MINUTES}
            isOptionEqualToValue={(option, value) => option?.label === value}
            value={selectedSlotTime || null}
            onChange={(e, opt) => {
              handleFormValueChange("docSlotTimeIntervalInMinutes", opt?.label);
              setSelectedSlotTime(opt?.label);
            }}
            disabled={disabledFlag || false}
            clearOnBlur={true}
            clearOnEscape={true}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Slot Time"
                variant="standard"
                name="docSlotTimeIntervalInMinutes"
              />
            )}
          />
        </FormControl>
        <FormControl sx={{ width: "100%" }}>
          <TextField
            label="Consultaion Fee"
            name="docConsultationFees"
            value={formValues.docConsultationFees}
            required
            onChange={(e) =>
              handleFormValueChange("docConsultationFees", e.target.value)
            }
            disabled={disabledFlag || false}
            fullWidth
            autoFocus
            inputProps={{
              maxLength: 120,
            }}
            size="small"
            autoComplete="off"
            variant="standard"
          />
        </FormControl>
        <FormControl sx={{ width: "100%" }}>
          <TextField
            label="Additional Information"
            name="additionalInformation"
            multiline
            maxRows={4}
            value={formValues.additionalInformation}
            onChange={(e) =>
              handleFormValueChange("additionalInformation", e.target.value)
            }
            disabled={disabledFlag || false}
            fullWidth
            autoFocus
            inputProps={{
              maxLength: 120,
            }}
            size="small"
            autoComplete="off"
            variant="standard"
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

export default AddNewDoctor;
