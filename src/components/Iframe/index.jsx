import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useAccountForm } from "../AccountForm/AccountFormProvider";

export function Iframe({ iframeReady, containerRef }) {
  const { tokenExpired, jwt, allFieldsFilled } = useAccountForm();

  const isFormSubmitted = Boolean(allFieldsFilled && jwt);

  if (!iframeReady && isFormSubmitted)
    return (
      <Box sx={{ width: "80%", height: "100%" }}>
        <Box p="100px">
          <CircularProgress />
        </Box>
      </Box>
    );

  if (tokenExpired)
    return (
      <Box sx={{ width: "80%", height: "100%" }}>
        <Box sx={{ color: "navy", padding: "20px" }}>
          Your session has expired, please refresh the page!
        </Box>
      </Box>
    );

  if (!isFormSubmitted) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          bgcolor: "grey.300",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body1">
          Please fill all the fields to load the view.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "80%", height: "100%" }}>
      <Box
        ref={containerRef}
        sx={{
          bgcolor: "grey.200",
          height: "100%",
          display: iframeReady ? "block" : "none",
          "& iframe": {
            width: "100%",
            height: "100%",
            border: "none !important",
          },
        }}
      />
    </Box>
  );
}
