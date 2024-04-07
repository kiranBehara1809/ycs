import {
  Box,
  Card,
  CardHeader,
  Chip,
  Divider,
  Grid,
  Popover,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { EDIT_ICON, VIEW_ICON } from "../../../constants/icons";
import PatientViewer from "../../shared/patientViewer";
import AddVitals from "../../shared/addVitals";

const OpListGridView = (props) => {
  const theme = useTheme();
  const [moreActionsAnchor, setMoreActionsAnchor] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState({
    type: "",
    data: null,
  });
  const actionStyles = {
    cursor: "pointer",
    width: "100%",
    "&:hover": {
      background: theme.palette.primary.main,
      backgroundColor: `${theme.palette.primary.main} !important`,
      color: "white",
    },
  };

  const handleMoreActions = (event, patient) => {
    setSelectedPatient({
      type: "",
      data: patient,
    });
    setMoreActionsAnchor(event.currentTarget);
  };
  return (
    <>
      {selectedPatient.type === "view" && (
        <PatientViewer
          selectedPatient={selectedPatient.data}
          closePatientViewer={() =>
            setSelectedPatient({
              type: "",
              data: null,
            })
          }
        />
      )}
      {selectedPatient.type === "addVitals" && (
        <AddVitals
          selectedPatient={selectedPatient.data}
          closeAddVitals={() =>
            setSelectedPatient({
              type: "",
              data: null,
            })
          }
        />
      )}
      <Grid
        container
        spacing={1}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {props?.data?.map((x, i) => {
          return (
            <Grid
              item
              xs={3}
              key={i}
              sx={{
                m: 1,
                borderRadius: "10px",
                p: 2,
                minHeight: "180px",
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                "&:hover": {
                  background: (theme) =>
                    alpha(
                      theme.palette.primary.main,
                      theme.palette.action.activatedOpacity
                    ),
                },
              }}
            >
              <Typography
                variant="body1"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                {x.salutation}.{x.firstName} {x.middleName} {x.lastName}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 1, display: "flex", justifyContent: "center" }}
              >
                {x.gender} - {x.ageString} - {x.maritalStatus}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Patient No :{" "}
                <span style={{ fontSize: "14px", padding: "0px 5px" }}>
                  {x.patientNo}
                </span>
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                UHID :{" "}
                <span style={{ fontSize: "14px", padding: "0px 5px" }}>
                  {x.UHID}
                </span>
              </Typography>

              <Divider
                sx={{
                  background: theme.palette.primary.main,
                  pt: 0.15,
                  mt: 0.5,
                  mb: 0.75,
                }}
              />
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Chip
                    sx={actionStyles}
                    label="View"
                    size="small"
                    variant="outlined"
                    onClick={() =>
                      setSelectedPatient({
                        type: "view",
                        data: x,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <Chip
                    sx={actionStyles}
                    label="Edit"
                    size="small"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Chip
                    sx={actionStyles}
                    label="Add Vitals"
                    size="small"
                    variant="outlined"
                    onClick={() =>
                      setSelectedPatient({
                        type: "addVitals",
                        data: x,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <Chip
                    sx={actionStyles}
                    label="Health Card"
                    size="small"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Chip
                    sx={actionStyles}
                    label="History"
                    size="small"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Chip
                    sx={actionStyles}
                    onClick={(event) => handleMoreActions(event, x)}
                    label="More"
                    size="small"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={() => setMoreActionsAnchor(null)}
        anchorEl={moreActionsAnchor}
        open={Boolean(moreActionsAnchor)}
      >
        <Grid
          sx={{ p: 1, minWidth: "120px", maxWidth: "140px" }}
          spacing={1}
          container
        >
          <Grid item xs={12}>
            <Chip
              sx={actionStyles}
              label="Addtional Action 1"
              size="small"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Chip
              sx={actionStyles}
              label="Addtional Action 1"
              size="small"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Chip
              sx={actionStyles}
              label="Addtional Action 1"
              size="small"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Popover>
    </>
  );
};

export default OpListGridView;
