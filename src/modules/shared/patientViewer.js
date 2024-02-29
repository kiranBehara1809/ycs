import {
  Box,
  Dialog,
  Divider,
  Grid,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomDialogHeader from "../../common/components/customDialogHeader";
import { USER_ICON } from "../../constants/icons";
import CustomHeader from "../../common/components/customHeader";

const PatientViewer = (props) => {
  const [open, setOpen] = useState(
    props?.selectedPatient !== null ? true : false
  );
  const [data, setData] = useState({
    patientDetails: props?.selectedPatient?.patientDetails || null,
    kinEmergencyContDetails:
      props?.selectedPatient?.kinEmergencyContDetails || null,
    docSelectionDetails: props?.selectedPatient?.docSelectionDetails || null,
    communicationDetails: props?.selectedPatient?.communicationDetails || null,
    commonDetails: props?.selectedPatient?.commonDetails || null,
  });
  const closeDialog = () => {
    props.closePatientViewer();
    setOpen(false);
  };
  return (
    <>
      <Dialog open={open || false} fullWidth maxWidth={"lg"}>
        <CustomDialogHeader
          headerIcon={USER_ICON}
          headerTitle={"Patient Viewer"}
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
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    sx={{ pb: 0.5, fontWeight: "bold" }}
                  >
                    Common Details
                  </Typography>
                  <Divider />
                </Grid>
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
                    primary={data?.commonDetails?.patientType || "--"}
                    secondary="Patient Type"
                  />
                </Grid>
                <Grid item xs={2}>
                  <ListItemText
                    primary={data?.commonDetails?.registeredBy || ""}
                    secondary="Registered By "
                  />
                </Grid>
                <Grid item xs={2}>
                  <ListItemText
                    primary={data?.commonDetails?.registeredOn || ""}
                    secondary="Registered On"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={6}>
              <Grid
                container
                sx={{
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  p: 2,
                }}
              >
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    sx={{ pb: 0.5, fontWeight: "bold" }}
                  >
                    Patient Details
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={4}>
                  <ListItemText
                    primary={data?.patientDetails?.salutation?.label || ""}
                    secondary="Salutation"
                  />
                </Grid>
                <Grid item xs={4}>
                  <ListItemText
                    primary={data?.patientDetails?.firstName || ""}
                    secondary="First Name"
                  />
                </Grid>
                <Grid item xs={4}>
                  <ListItemText
                    primary={data?.patientDetails?.middleName || "--"}
                    secondary="Middle Name"
                  />
                </Grid>
                <Grid item xs={4}>
                  <ListItemText
                    primary={data?.patientDetails?.lastName || ""}
                    secondary="Last Name"
                  />
                </Grid>
                <Grid item xs={4}>
                  <ListItemText
                    primary={data?.patientDetails?.gender?.label || ""}
                    secondary="Gender"
                  />
                </Grid>
                <Grid item xs={4}>
                  <ListItemText
                    primary={data?.patientDetails?.maritalStatus?.label || ""}
                    secondary="Marital Status"
                  />
                </Grid>
                <Grid item xs={4}>
                  <ListItemText
                    primary={data?.patientDetails?.bloodGroup?.label || ""}
                    secondary="Blood Group"
                  />
                </Grid>
                <Grid item xs={4}>
                  <ListItemText
                    primary={data?.patientDetails?.ageString || ""}
                    secondary="Age"
                  />
                </Grid>
                <Grid item xs={4}>
                  <ListItemText
                    primary={
                      data?.patientDetails?.dateOfBirth?.split("T")[0] || ""
                    }
                    secondary="Date Of Birth"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid
                container
                sx={{
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  p: 2,
                }}
              >
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    sx={{ pb: 0.5, fontWeight: "bold" }}
                  >
                    Communication Details
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <ListItemText
                    primary={data?.communicationDetails?.addressLine1 || ""}
                    secondary="Address Line"
                  />
                </Grid>
                <Grid item xs={4}>
                  <ListItemText
                    primary={data?.communicationDetails?.city?.label || ""}
                    secondary="City"
                  />
                </Grid>
                <Grid item xs={4}>
                  <ListItemText
                    primary={data?.communicationDetails?.state?.label || ""}
                    secondary="State"
                  />
                </Grid>
                <Grid item xs={4}>
                  <ListItemText
                    primary={data?.communicationDetails?.country?.label || ""}
                    secondary="Country"
                  />
                </Grid>
                <Grid item xs={4}>
                  <ListItemText
                    primary={data?.communicationDetails?.contactNo || ""}
                    secondary="Contact No"
                  />
                </Grid>
                <Grid item xs={4}>
                  <ListItemText
                    primary={
                      data?.communicationDetails?.alternateContactNo || "--"
                    }
                    secondary="Alterate Contact No"
                  />
                </Grid>
                <Grid item xs={4}>
                  <ListItemText
                    primary={data?.communicationDetails?.whatsAppNo || "--"}
                    secondary="Whatapp No"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={6}>
              <Grid
                container
                sx={{
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  p: 2,
                }}
              >
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    sx={{ pb: 0.5, fontWeight: "bold" }}
                  >
                    Kin/Emergency Contact Details
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={4}>
                  <ListItemText
                    primary={data?.kinEmergencyContDetails?.kinFirstName || ""}
                    secondary="Kin First Name"
                  />
                </Grid>
                <Grid item xs={4}>
                  <ListItemText
                    primary={data?.kinEmergencyContDetails?.kinLastName || ""}
                    secondary="Kin Last Name"
                  />
                </Grid>
                <Grid item xs={4}>
                  <ListItemText
                    primary={
                      data?.kinEmergencyContDetails?.kinRelation?.label || "--"
                    }
                    secondary="Kin Relation"
                  />
                </Grid>
                <Grid item xs={12}>
                  <ListItemText
                    primary={data?.kinEmergencyContDetails?.kinComments || "--"}
                    secondary="Comments"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid
                container
                sx={{
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  p: 2,
                }}
              >
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    sx={{ pb: 0.5, fontWeight: "bold" }}
                  >
                    Doctor Details
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <ListItemText
                    primary={data?.docSelectionDetails?.doctor?.label || ""}
                    secondary="Doctor"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  );
};

export default PatientViewer;
