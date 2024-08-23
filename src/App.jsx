import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import { Box } from "@mui/material";
import AccountView from "./AccountView";
import TestAppBar from "./AppBar";
import ReportView from "./ReportView";
import SimpleIframe from "./SimpleIframe";

function App() {
  return (
    <Box sx={{ height: "100%", textAlign: "center", bgcolor: "grey.200" }}>
      <TestAppBar />
      <Switch>
        <Route path={"/"} exact={true} component={ReportView} />
        <Route path={"/report"} exact={true} component={ReportView} />
        <Route path={"/account-view"} exact={true} component={AccountView} />
        <Route path={"/simple-iframe"} exact={true} component={SimpleIframe} />
      </Switch>
    </Box>
  );
}

export default App;
