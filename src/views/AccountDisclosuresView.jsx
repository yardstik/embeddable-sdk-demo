import { Box } from "@mui/material";
import { Yardstik } from "@yardstik/embeddable-sdk";
import React, { useEffect, useRef, useState } from "react";

import { AccountForm } from "../components/AccountForm/AccountForm";
import { useAccountForm } from "../components/AccountForm/AccountFormProvider";
import { Iframe } from "../components/Iframe";

export function AccountDisclosuresView() {
  const containerRef = useRef();

  const [iframeReady, setIframeReady] = useState(false);

  const { jwt, appUrl, accountId, setTokenExpired } = useAccountForm();

  useEffect(() => {
    if (containerRef && jwt && import.meta.env.VITE_APP_YARDSTIK_ACCOUNT_ID) {
      const yardstikAccountDisclosures = new Yardstik.AccountDisclosuresIframe({
        token: jwt,
        domain: appUrl,
        accountId: accountId,
        container: containerRef.current,
      });

      yardstikAccountDisclosures.on("loaded", () => {
        setIframeReady(true);
      });

      yardstikAccountDisclosures.on("expiration", () => {
        console.log("The JWT token has expired.");
        setTokenExpired(true);
      });

      return () => {
        yardstikAccountDisclosures.destroy();
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
