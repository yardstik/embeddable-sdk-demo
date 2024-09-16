import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Logo, useTheme } from "@yardstik/core.components";

import React from "react";
import { Link as RouterLink } from "react-router-dom";

export default function ProminentAppBar() {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position="static" sx={{ bgcolor: theme.palette.secondary.main }}>
        <Toolbar>
          <Logo />

          <Link component={RouterLink} to="/">
            <Typography
              sx={{
                color: "white",
                padding: "30px",
                alignSelf: "flex-end",
              }}
            >
              Candidate Report
            </Typography>
          </Link>

          <Link component={RouterLink} to="/candidate-intake-form">
            <Typography
              sx={{
                color: "white",
                padding: "30px",
                alignSelf: "flex-end",
              }}
            >
              Candidate Intake
            </Typography>
          </Link>

          <Link component={RouterLink} to="/account-view">
            <Typography
              sx={{
                color: "white",
                padding: "30px",
                alignSelf: "flex-end",
              }}
            >
              Account Disclosures
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
