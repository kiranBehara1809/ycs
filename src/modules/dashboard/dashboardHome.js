import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import React from "react";
import CustomHeaderWithSearchBar from "../../common/components/customHeaderWithSearchBar";
import { HOME_ICON, MOBILE_ICON, YOUTUBE_ICON } from "../../constants/icons";
import { HOME_CARDS } from "../../db/dbMasters/home";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const openYoutube = (link) => {
    window.open(link);
  };
  return (
    <>
      <Grid container spacing={1}>
        {HOME_CARDS.map((card, i) => {
          return (
            <Grid item xs={isMobile ? 6 : 3} key={i}>
              <Box
                sx={{
                  width: "100%",
                  maxHeight: "100px",
                  height: "100px",
                  borderRadius: "10px",
                  background: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.activatedOpacity
                  ),
                  p: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="h4"
                    color={"primary.main"}
                    sx={{ fontWeight: "bold" }}
                  >
                    {card.count}
                  </Typography>
                  {card.icon}
                </Box>
                <Typography variant="h6">&nbsp;</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="h6"
                    color={"primary.main"}
                    sx={{ fontWeight: "bold" }}
                  >
                    {card.name} ({card.inprogress})
                  </Typography>
                  <span
                    style={{ cursor: "pointer", fontSize: "10px !important" }}
                    onClick={() => openYoutube(card.youtubeChannel)}
                  >
                    {YOUTUBE_ICON}
                  </span>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Home;
