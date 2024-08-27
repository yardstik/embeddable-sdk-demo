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
    <Box sx={{ flexGrow: 1 }}>
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
          <Link component={RouterLink} to="/simple-iframe">
            <Typography
              sx={{
                color: "white",
                padding: "30px",
                alignSelf: "flex-end",
              }}
            >
              Simple Iframe
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
