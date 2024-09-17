import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import { Box, createTheme, ThemeProvider } from "@mui/material";
import AccountView from "./AccountView";
import TestAppBar from "./AppBar";
import ReportView from "./ReportView";
import SimpleIframe from "./SimpleIframe";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#8e17bf",
        light: "#a445cb",
        dark: "#631085",
      },
      secondary: {
        main: "#333333",
        light: "#5b5b5b",
        dark: "#232323",
      },
      grey: {
        50: "#f9f9f9",
        100: "#f0f0f0",
        200: "#e0e0e0",
        300: "#d0d0d0",
        400: "#c0c0c0",
        500: "#b0b0b0",
        600: "#a0a0a0",
        700: "#909090",
        800: "#808080",
        900: "#707070",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: "100%", textAlign: "center", bgcolor: "grey.200" }}>
        <TestAppBar />
        <Switch>
          <Route path={"/"} exact={true} component={ReportView} />
          <Route path={"/report"} exact={true} component={ReportView} />
          <Route path={"/account-view"} exact={true} component={AccountView} />
          <Route
            path={"/simple-iframe"}
            exact={true}
            component={SimpleIframe}
          />
        </Switch>
      </Box>
    </ThemeProvider>
  );
}

export default App;
