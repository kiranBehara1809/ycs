import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { UNDER_DEV_ICON } from "../../constants/icons";

const UnderDevelopment = () => {
  const theme = useTheme();
  const styles = {
    icon: {
      color: theme.palette.error.main,
      fontSize: "xx-large",
    },
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          p: 2,
        }}
      >
        {UNDER_DEV_ICON}
        <Typography variant="h6">Under Development...!</Typography>
      </Box>
    </>
  );
};

export default UnderDevelopment;
