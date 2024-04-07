import logo from "./logo.svg";
import { CssBaseline, Theme, ThemeProvider } from "@mui/material";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routings from "./routings";
import { HelmetProvider } from "react-helmet-async";
import greenTheme from "./themes/greenTheme";
import { useEffect } from "react";
import { blackTheme } from "./themes/blackTheme";
import { blueTheme } from "./themes/bluetheme";
import { greyTheme } from "./themes/greyTheme";
import { sunBurstOrange } from "./themes/sunburstOrange";

function App() {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--reacIconsColor", blueTheme.palette.primary.main);
  }, []);
  return (
    <>
      <ThemeProvider theme={blueTheme}>
        <CssBaseline />
        <BrowserRouter>
          <HelmetProvider>
            <Routings />
          </HelmetProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
