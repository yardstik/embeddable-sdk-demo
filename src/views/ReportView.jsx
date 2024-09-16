import { Box } from "@mui/material";
import { Yardstik } from "@yardstik/embeddable-sdk";
import React, { useEffect, useRef, useState } from "react";
import { AccountForm } from "../components/AccountForm/AccountForm";
import { useAccountForm } from "../components/AccountForm/AccountFormProvider";
import { Iframe } from "../components/Iframe";

export function ReportView() {
  const containerRef = useRef();

  const [iframeReady, setIframeReady] = useState(false);

  const { jwt, appUrl, reportId, accountId, allFieldsFilled, setTokenExpired } =
    useAccountForm();

  useEffect(() => {
    if (containerRef && jwt && allFieldsFilled) {
      const yardstikReport = new Yardstik.CandidateReportIframe({
        token: jwt,
        accountId: accountId,
        reportId: reportId,
        container: containerRef.current,
        domain: appUrl,
      });

      yardstikReport.on("loaded", () => {
        setIframeReady(true);
      });

      yardstikReport.on("expiration", () => {
        console.log("The JWT token has expired.");
        setTokenExpired(true);
      });

      return () => {
        yardstikReport.destroy();
      };
    }
  }, [containerRef, jwt]);

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
      <Box sx={{ width: "30%", mr: 8 }}>
        <AccountForm />
      </Box>

      <Iframe iframeReady={iframeReady} containerRef={containerRef} />
    </Box>
  );
}
