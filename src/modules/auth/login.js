import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Backdrop, CircularProgress, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import { addBaseUrl, showBasicToast } from "../../common/functions/function";
import { handleLogin } from "../../http/authRequests";
import { API_FAILURE_MSG } from "../../constants/errorText";
import { ACCESS_TOKEN_KEY_NAME, TOKEN_SESSION_STORAGE_KEY_NAME } from "../../constants/project";


export default function Login() {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    handleLogin(data.get("userName"), data.get("password")).then((res) => {
      if (res) {
        showBasicToast("success", res.msg);
        navigate(addBaseUrl("home"));
      }
    });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
          background: "background.default",
          p: 1,
        }}
      >
        <Box
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            p: 3,
            borderRadius: 5,
            background: "background.default",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              mt : "-8px"
            }}
          >
            <Typography component="h1" variant="h5" >
              Sign in
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} >
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User Name"
              name="userName"
              autoComplete="off"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, textTransform: "capitalize" }}
            >
              Sign In
            </Button>
            {/* <Grid container sx={{ mt: 1 }}>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Box>
    </>
  );
}
