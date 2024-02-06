import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  useTheme,
  useMediaQuery,
  Box,
  Button,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import RegnFormV3 from "./opRehistrationV3";
import PatientDetails from "./patientDetails";
import CommunicationDetails from "./communicationDetails";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  ADDRESS_ICON,
  DOCTOR_ICON,
  MONEY_STACK,
  USERS_ICON,
  USER_ICON,
} from "../../../constants/icons";
import CustomHeader from "../../../common/components/customHeader";
import KinEmergencyContDetails from "./kinEmergencyContDetails";
import DocSelectionDetails from "./docSelectionDetails";

const OpRegnScreen = () => {
  const theme = useTheme();
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const sm_up = useMediaQuery(theme.breakpoints.up("sm"));
  const cardStyles = {
    height: "auto",
    cursor: "pointer",
    margin: "10px 5px 10px 5px",
    borderRadius: "10px",
    p: 1,
    minHeight: "auto",
    maxHeight: "500px",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  };
  const [headerAccordion, setHeaderAccodion] = useState(true);
  const [resetFlag, setResetFlag] = useState(true);
  const [submitClickFlag, handleSubmitClickFlag] = useState(false);
  const [regnDate, setRegnDate] = useState(
    dayjs(new Date()).format("DD/MM/YYYY h:mm:ss a")
  );
  useEffect(() => {
    setInterval(() => {
      setRegnDate(dayjs(new Date()).format("DD/MM/YYYY h:mm:ss a"));
    }, 1000);
  }, []);
  return (
    <>
      <Accordion
        expanded={headerAccordion}
        onChange={() => setHeaderAccodion((prev) => !prev)}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant="h6" sx={{ width: "80%", flexShrink: 0 }}>
            Out Patient (OP) Registration
          </Typography>
          <Box sx={{ flex: 1 }}></Box>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={(event) => {
                  event.stopPropagation();
                  handleSubmitClickFlag(true);
                }}
              >
                Submit
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="reset"
                fullWidth
                variant="contained"
                color="secondary"
                onClick={(event) => {
                  event.stopPropagation();
                  handleSubmitClickFlag(false);
                  setResetFlag((prev) => !prev);
                }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1}>
            <Grid item xs={1.5}>
              <ListItemText
                primary={`${currentUser?.firstName || ""} ${
                  currentUser?.lastName || ""
                }`}
                secondary="Registered By"
              />
            </Grid>
            <Grid item xs={1.5}>
              <ListItemText
                primary={currentUser?.userName || ""}
                secondary="User Name"
              />
            </Grid>
            <Grid item xs={1.5}>
              <ListItemText
                primary={regnDate || ""}
                secondary="Registered On"
              />
            </Grid>
            <Grid item xs={1.5}>
              <ListItemText
                primary={"Out Patient (OP)" || ""}
                secondary="Patient Type"
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Grid
        container
        spacing={1}
        sx={{ display: "flex", justifyContent: "space-evenly", mt: 0.1 }}
      >
        <Grid item xs={sm_up ? 5.8 : 12} sx={cardStyles}>
          <CustomHeader headerText={"User Details"} headerIcon={USER_ICON} />
          <PatientDetails
            key={resetFlag}
            hasSubmitBtnClicked={submitClickFlag}
          />
        </Grid>
        <Grid item xs={sm_up ? 5.8 : 12} sx={cardStyles}>
          <CustomHeader
            headerText={"Communication Details"}
            headerIcon={ADDRESS_ICON}
          />
          <CommunicationDetails
            key={resetFlag}
            hasSubmitBtnClicked={submitClickFlag}
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={1}
        sx={{ display: "flex", justifyContent: "space-evenly", mt: 0.1 }}
      >
        <Grid item xs={sm_up ? 5.8 : 12} sx={cardStyles}>
          <CustomHeader
            headerText={"Kin/Emergency Contact"}
            headerIcon={USERS_ICON}
          />
          <KinEmergencyContDetails
            key={resetFlag}
            hasSubmitBtnClicked={submitClickFlag}
          />
        </Grid>
        <Grid item xs={sm_up ? 5.8 : 12} sx={cardStyles}>
          <CustomHeader headerText={"Doctor"} headerIcon={DOCTOR_ICON} />
          <DocSelectionDetails
            key={resetFlag}
            hasSubmitBtnClicked={submitClickFlag}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default OpRegnScreen;
