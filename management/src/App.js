import logo from "./logo.svg";
import { CssBaseline, Theme, ThemeProvider } from "@mui/material";
import "./App.css";
 import { BrowserRouter } from "react-router-dom";
import Routings from "./routings";
import { HelmetProvider } from "react-helmet-async";
import greenTheme from "./themes/greenTheme";


function App() {
  return (
    <>
      <ThemeProvider theme={greenTheme}>
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
