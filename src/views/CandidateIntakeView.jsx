import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import React from "react";

export function CandidateIntakeView() {
  const theme = useTheme();

  const [applyUrl, setApplyUrl] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const url = formData.get("applyUrl");

    setApplyUrl(url);
  }

  return (
    <Box
      sx={{
        px: 8,
        pb: 3,
        display: "flex",
        overflow: "hidden",
        height: "calc(100% - 100px)",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", width: "30%", mr: 8 }}
      >
        <TextField
          required
          name="applyUrl"
          label="Apply URL"
          sx={{ marginBottom: "20px" }}
        />

        <Button
          type="submit"
          variant="contained"
          data-testid="candidate-intake-submit-form"
        >
          Change apply url
        </Button>
      </Box>

      {!applyUrl && (
        <Box
          sx={{
            width: "80%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: theme.palette.grey[300],
          }}
        >
          <Typography variant="body1">
            Apply URL is not set. Please set the apply URL.
          </Typography>
        </Box>
      )}

      {applyUrl && (
        <Box sx={{ width: "80%", height: "100%" }}>
          <Box
            src={applyUrl}
            component="iframe"
            title="Candidate form Iframe"
            data-testid="candidate-intake-form"
            sx={{
              width: "100%",
              height: "100%",
              border: "none",
              overflow: "scroll",
            }}
          />
        </Box>
      )}
    </Box>
  );
}
