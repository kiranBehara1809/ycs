import { Grid, Typography } from "@mui/material";
import React from "react";
import { toTitleCase } from "../../common/functions/function";

const ThemeSwitcher = () => {
  const themes = ["blue", "green", "grey", "orange"];

  const handleChangeTheme = (theme) => {
    
  }
  return (
    <>
      <Grid container spacing={1}>
        {themes.map((x, i) => (
          <Grid
            item
            key={i}
            xs={3}
            sx={{
              height: "80px",
              cursor: "pointer",
              margin: "5px",
              borderRadius: "10px",
              p: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              "&:hover": {
                background: x,
                color: "white",
              },
            }}
          >
            <Typography variant="body2" onClick={() => handleChangeTheme(x)}>
              {toTitleCase(x)}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ThemeSwitcher;
