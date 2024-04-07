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
  getMasterDataForDropdown,
  saveMastersData,
  updateMastersData,
} from "../../../http/masterRequests";
import { UI } from "../../../constants/project";


const AddNewUser = (props) => {
  const [roles, SetRoles] = useState([]);
  const [genders, setGenders] = useState([]);
  const [identityTypes, setIdentityTypes] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedIdType, setSelectedIdType] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [formValues, setFormValues] = useState({
    firstName: props?.selObj?.firstName || "",
    middleName: props?.selObj?.middleName || "",
    lastName: props?.selObj?.lastName || "",
    role: props?.selObj?.role || "",
    idType: props?.selObj?.idType || "",
    idNo: props?.selObj?.idNo || "",
    contactNo: props?.selObj?.contactNo || "",
    gender: props?.selObj?.gender || "",
  });

  useEffect(() => {
    getAllInitApi();
  }, []);

  useEffect(() => {
    setSelectedRole(props?.selObj?.role || "");
    setSelectedIdType(props?.selObj?.idType || "");
    setSelectedGender(props?.selObj?.gender || "");
  }, [props]);

  const getAllInitApi = async () => {
    const rolesList = await getMasterDataForDropdown(
      `/users/roles/all`,
      "role"
    );
    const genders = await getMasterDataForDropdown(
      `/masters/gender/all`,
      "completeName"
    );
    const identityTypeList = await getMasterDataForDropdown(
      `/masters/identityType/all`
    );
    setIdentityTypes(identityTypeList || []);
    setGenders(genders || []);
    SetRoles(rolesList || []);
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
    const payload = {
      ...formValues,
      role: selectedRole,
      idType: selectedIdType,
      gender: selectedGender,
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
    setSelectedIdType("");
    setSelectedRole("");
    setSelectedGender("");
    setFormValues((prev) => {
      return {
        firstName: "",
        middleName: "",
        lastName: "",
        role: "",
        idType: "",
        idNo: "",
        contactNo: "",
        gender: "",
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
            label="First Name"
            name="firstName"
            value={formValues.firstName}
            required
            onChange={(e) => handleFormValueChange("firstName", e.target.value)}
            disabled={readonlyFlag || false}
            fullWidth
            autoFocus
            inputProps={{
              maxLength: 20,
            }}
            size="small"
            autoComplete="off"
            variant={UI.fieldVariant}
          />
        </FormControl>
        <FormControl sx={{ width: "100%", mt: 1 }}>
          <TextField
            label="Middle Name"
            name="middleName"
            value={formValues.middleName}
            onChange={(e) =>
              handleFormValueChange("middleName", e.target.value)
            }
            disabled={readonlyFlag || false}
            fullWidth
            autoFocus
            inputProps={{
              maxLength: 20,
            }}
            size="small"
            autoComplete="off"
            variant={UI.fieldVariant}
          />
        </FormControl>
        <FormControl sx={{ width: "100%", mt: 1 }}>
          <TextField
            label="Last Name"
            name="lastName"
            value={formValues.lastName}
            onChange={(e) => handleFormValueChange("lastName", e.target.value)}
            disabled={readonlyFlag || false}
            fullWidth
            required
            autoFocus
            inputProps={{
              maxLength: 20,
            }}
            size="small"
            autoComplete="off"
            variant={UI.fieldVariant}
          />
        </FormControl>
        <FormControl sx={{ width: "100%", mt: 1 }}>
          <TextField
            label="Contact No"
            name="contactNo"
            value={formValues.contactNo}
            onChange={(e) => handleFormValueChange("contactNo", e.target.value)}
            disabled={readonlyFlag || false}
            fullWidth
            required
            autoFocus
            inputProps={{
              maxLength: 20,
            }}
            size="small"
            autoComplete="off"
            variant={UI.fieldVariant}
          />
        </FormControl>
        <FormControl sx={{ width: "100%", mt: 1 }}>
          <Autocomplete
            disablePortal
            id="gender-box-demo"
            options={genders}
            value={selectedGender || ""}
            getOptionKey={(option) => option.label}
            onChange={(e, opt) => {
              handleFormValueChange("gender", opt?.id || "");
              setSelectedGender(opt?.label || "");
            }}
            disabled={readonlyFlag || false}
            clearOnBlur={true}
            clearOnEscape={true}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Gender"
                variant={UI.fieldVariant}
                name="gender"
              />
            )}
          />
        </FormControl>
        <FormControl sx={{ width: "100%", mt: 1 }}>
          <Autocomplete
            disablePortal
            id="idType-box-demo"
            options={identityTypes}
            value={selectedIdType || ""}
            getOptionKey={(option) => option.label}
            onChange={(e, opt) => {
              handleFormValueChange("idType", opt?.id || "");
              setSelectedIdType(opt?.label || "");
            }}
            disabled={readonlyFlag || false}
            clearOnBlur={true}
            clearOnEscape={true}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="ID Type"
                variant={UI.fieldVariant}
                name="idType"
              />
            )}
          />
        </FormControl>
        <FormControl sx={{ width: "100%", mt: 1 }}>
          <TextField
            label="ID No"
            name="idNo"
            value={formValues.idNo}
            onChange={(e) => handleFormValueChange("idNo", e.target.value)}
            disabled={readonlyFlag || false}
            fullWidth
            required
            autoFocus
            inputProps={{
              maxLength: 20,
            }}
            size="small"
            autoComplete="off"
            variant={UI.fieldVariant}
          />
        </FormControl>
        <FormControl sx={{ width: "100%", mt: 1 }}>
          <Autocomplete
            disablePortal
            id="role-box-demo"
            options={roles}
            value={selectedRole || ""}
            getOptionKey={(option) => option.label}
            onChange={(e, opt) => {
              handleFormValueChange("role", opt?.id || "");
              setSelectedRole(opt?.label || "");
            }}
            disabled={readonlyFlag || false}
            clearOnBlur={true}
            clearOnEscape={true}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Role"
                variant={UI.fieldVariant}
                name="role"
              />
            )}
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

export default AddNewUser;
