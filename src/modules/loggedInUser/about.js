import React, { useState, useEffect } from "react";
import { PROJECT_INFO } from "../../constants/project";
import { Grid, ListItemText } from "@mui/material";

const About = () => {
  return (
    <>
      <Grid container>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={PROJECT_INFO.logo}
            width={300}
            height={300}
            style={{ borderRadius: "10px" }}
          />
        </Grid>
        <Grid item xs={6}>
          <ListItemText
            sx={{ pt: 2 }}
            primary={PROJECT_INFO.name || ""}
            secondary="Project Name"
          />
          <ListItemText
            sx={{ pt: 2 }}
            primary={PROJECT_INFO.description || ""}
            secondary="Project Description"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default About;
