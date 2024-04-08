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
import { Controller, useForm } from "react-hook-form";
import * as REGEX from "../../constants/regex";
import { UI } from "../../constants/project";
import projectLogo from "../../assets/project-logo.png";
import  store from '../../store'
import { PAGE_HEADER_ACTIONS } from "../../store/slices/pageHeader";

const helperTexts = {
  userEmail: {
    required: "User Email is Required",
    pattern: "Invalid data entered, please check",
  },
  password: {
    required: "Password is Required",
    maxLength: "Max Length Exceeded",
  },
};

export default function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { control, setValue, getValues, trigger, formState, watch } = useForm({
    mode: "all",
    reValidateMode: "onBlur",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("userEmail") === "") {
      showBasicToast("info", "User Email is required");
      return;
    }
    if (data.get("password") === "") {
      showBasicToast("info", "Password is required");
      return;
    }
    localStorage.setItem("CUR_USER_EMAIL", data.get("userEmail"));
    navigate(addBaseUrl("home"));
    store.dispatch(PAGE_HEADER_ACTIONS.setPageHeader("Dashboard"))
    // handleLogin(data.get("userEmail"), data.get("password")).then((res) => {
    //   if (res) {
    //     showBasicToast("success", res.msg);
    //     navigate(addBaseUrl("home"));
    //   }
    // });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
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
            p: 3,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            background: "background.default",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          }}
        >
          <img
            src={projectLogo}
            loading="eager"
            width={"200px"}
            height={196}
            style={{ borderRadius: "10px" }}
          />
        </Box>
        <Box
          sx={{
            p: 3,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            background: "background.default",
            width: "350px",
            minHeight: "250px",
            maxHeight: "250px",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              mt: "-8px",
              mb: 1,
            }}
          >
            <Typography component="h1" variant="h5">
              Login
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <Controller
              control={control}
              name="userEmail"
              defaultValue=""
              rules={{
                required: true,
                pattern: REGEX.TEXT_REGEX.EMAIL,
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  type="text"
                  variant={UI.fieldVariant}
                  fullWidth
                  autoComplete="off"
                  label="User Email"
                  required
                  autoFocus
                  placeholder={"abc@abc.com"}
                  error={error !== undefined}
                  helperText={error ? helperTexts.userEmail[error.type] : ""}
                />
              )}
            />
            {/* <TextField
              margin="normal"
              required
              fullWidth
              id="userEmail"
              label="User Email"
              name="userEmail"
              autoComplete="off"
              autoFocus
            /> */}
            {/* <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
            /> */}
            <div style={{ marginTop: "16px" }}>
              <Controller
                control={control}
                name="password"
                defaultValue=""
                rules={{
                  required: true,
                  maxLength: 30,
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="password"
                    variant={UI.fieldVariant}
                    fullWidth
                    autoComplete="off"
                    label="Password"
                    required
                    error={error !== undefined}
                    helperText={error ? helperTexts.password[error.type] : ""}
                  />
                )}
              />
            </div>
            <Button
              type="submit"
              fullWidth
              disabled={!formState.isValid}
              variant="contained"
              sx={{ mt: 3, textTransform: "capitalize" }}
            >
              Login
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
