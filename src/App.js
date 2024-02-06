import logo from "./logo.svg";
import { CssBaseline, Theme, ThemeProvider } from "@mui/material";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routings from "./routings";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import greenTheme from "./themes/greenTheme";
import { blackTheme } from "./themes/blackTheme";
import { blueTheme } from "./themes/bluetheme";
import { greyTheme } from "./themes/greyTheme";
import { sunBurstOrange } from "./themes/sunburstOrange";

function App() {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--reacIconsColor", blackTheme.palette.primary.main);
  }, []);
  return (
    <>
      <ThemeProvider theme={blackTheme}>
        <CssBaseline />
        <BrowserRouter basename="/">
          <HelmetProvider>
            <Routings />
          </HelmetProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
