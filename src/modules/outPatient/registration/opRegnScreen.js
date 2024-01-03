import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PatientPersonalDetailsCard from "./patientPersonalDetailsCard";

const OpRegnScreen = () => {
  const cardStyles = {
    height: "80px",
    cursor: "pointer",
    margin: "5px",
    borderRadius: "10px",
    p: 1,
    minHeight: "300px",
    maxHeight: "500px",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  };
  const [headerAccordion, setHeaderAccodion] = useState(true);
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
          <Typography variant="h6" sx={{ width: "66%", flexShrink: 0 }}>
            Out Patient (OP) Registration
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Grid container spacing={0.5} sx={{display : "flex", justifyContent : "center"}}>
        <Grid item xs={7} sx={cardStyles}>
          <PatientPersonalDetailsCard />
        </Grid>
      </Grid>
    </>
  );
};

export default OpRegnScreen;
