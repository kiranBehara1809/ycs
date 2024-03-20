import React, { useState, useEffect } from "react";
import CustomHeaderWithSearchBar from "../../common/components/customHeaderWithSearchBar";
import { SETTINGS_ICON } from "../../constants/icons";
import { Grid, Stack, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { SETTINGS_MENU } from "../../db/dbMasters/settingsMenu";
import ThemeSwitcher from "../shared/themeSwitcher";

const SettingsHome = () => {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState(null);
  const handleSettingCardClick = (obj) => {
    setSelectedOption(obj);
  };
  return (
    <>
      <CustomHeaderWithSearchBar
        headerText="Settings"
        headerIcon={SETTINGS_ICON}
        placeholder="Search Settings"
      />
      <Grid container spacing={1}>
        {SETTINGS_MENU?.map((option, index) => {
          return (
            <Grid
              onClick={() => handleSettingCardClick(option)}
              item
              xs={5}
              sm={3.7}
              key={option.uniqueName}
              sx={{
                height: "80px",
                cursor: "pointer",
                margin: "5px",
                borderRadius: "10px",
                p: 1,
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                borderBottom:
                  selectedOption?.uniqueName === option.uniqueName
                    ? `1.5px solid ${theme.palette.primary.main} !important`
                    : "",
                background: (theme) =>
                  selectedOption?.uniqueName === option.uniqueName
                    ? alpha(
                        theme.palette.primary.main,
                        theme.palette.action.activatedOpacity
                      )
                    : "",
                "&:hover": {
                  background: (theme) =>
                    alpha(
                      theme.palette.primary.main,
                      theme.palette.action.activatedOpacity
                    ),
                },
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {option.icon}
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {option.name}
                </Typography>
              </Stack>
            </Grid>
          );
        })}
        <Grid item xs={12} sm={7.5}>
          <ThemeSwitcher />
        </Grid>
      </Grid>
    </>
  );
};

export default SettingsHome;
