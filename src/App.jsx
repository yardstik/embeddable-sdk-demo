import { Box } from "@mui/material";
import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import TestAppBar from "./AppBar";
import { AccountFormProvider } from "./components/AccountForm/AccountFormProvider";
import { AccountDisclosuresView } from "./views/AccountDisclosuresView";
import { CandidateIntakeView } from "./views/CandidateIntakeView";
import { ReportView } from "./views/ReportView";

function App() {
  return (
    <AccountFormProvider>
      <Box sx={{ height: "100%", textAlign: "center", bgcolor: "grey.200" }}>
        <TestAppBar />

        <Switch>
          <Route path={"/"} exact={true} component={ReportView} />
          <Route path={"/report"} exact={true} component={ReportView} />
          <Route
            path={"/account-view"}
            exact={true}
            component={AccountDisclosuresView}
          />
          <Route
            exact={true}
            path={"/candidate-intake-form"}
            component={CandidateIntakeView}
          />
        </Switch>
      </Box>
    </AccountFormProvider>
  );
}

export default App;
