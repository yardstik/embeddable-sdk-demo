import { Box, Button, TextField } from "@mui/material";
import React from "react";

import { useAccountForm } from "./AccountFormProvider";

export function AccountForm() {
  const { handleSubmit, accountId, accountEmail, reportId, apiKey, appUrl } =
    useAccountForm();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <TextField
        required
        name="accountId"
        defaultValue={accountId}
        label="Account ID"
        sx={{ marginBottom: "20px" }}
      />

      <TextField
        required
        name="accountEmail"
        label="Account Email"
        defaultValue={accountEmail}
        sx={{ marginBottom: "20px" }}
      />

      <TextField
        required
        name="reportId"
        label="Report ID"
        defaultValue={reportId}
        sx={{ marginBottom: "20px" }}
      />

      <TextField
        required
        name="apiKey"
        label="API Key"
        type="password"
        defaultValue={apiKey}
        sx={{ marginBottom: "20px" }}
      />

      <TextField
        required
        name="appUrl"
        label="APP URL"
        defaultValue={appUrl}
        InputLabelProps={{ shrink: true }}
        sx={{ marginBottom: "20px" }}
      />

      <Button
        type="submit"
        variant="contained"
        data-testid="candidate-intake-submit-form"
      >
        Load Report
      </Button>
    </Box>
  );
}
