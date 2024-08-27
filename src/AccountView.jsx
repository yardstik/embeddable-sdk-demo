import CircularProgress from "@mui/material/CircularProgress";
import { Yardstik } from "@yardstik/embeddable-sdk";
import React, { useEffect, useState } from "react";
import "./App.css";

function AccountView() {
  const [jwt, setJwt] = useState("");
  const [iframeReady, setIframeReady] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [yardstikAccountDisclosures, setYardstikAccountDisclosures] =
    React.useState(null);

  const containerRef = React.useRef();

  const backend_url =
    import.meta.env.IS_DOCKER === "true"
      ? import.meta.env.BACKEND_URL
      : import.meta.env.VITE_APP_BACKEND_URL;

  // Use this code to see a report in the iframe
  React.useEffect(() => {
    if (containerRef && jwt && import.meta.env.VITE_APP_YARDSTIK_ACCOUNT_ID) {
      const yardstikAccountDisclosures = new Yardstik.AccountDisclosuresIframe({
        token: jwt,
        accountId: import.meta.env.VITE_APP_YARDSTIK_ACCOUNT_ID,
        container: containerRef.current,
        domain: import.meta.env.VITE_APP_YARDSTIK_APP_URL,
      });
      yardstikAccountDisclosures.on("loaded", () => {
        setIframeReady(true);
      });
      setYardstikAccountDisclosures(yardstikAccountDisclosures);
      yardstikAccountDisclosures.on("expiration", () => {
        console.log("The JWT token has expired.");
        setTokenExpired(true);
      });
      return () => {
        yardstikAccountDisclosures.destroy();
      };
    }
  }, [containerRef, jwt]);

  // on component did mount, get the jwt from the backend
  useEffect(() => {
    fetch(`${backend_url}/token`, {
      headers: new Headers({
        "content-type": "application/json",
        accept: "application/json",
      }),
      method: "POST",
      body: JSON.stringify({
        user_email: import.meta.env.VITE_APP_YARDSTIK_ACCOUNT_EMAIL,
      }),
    })
      .then((res) => {
        res.json().then((json) => {
          setJwt(json.token);
        });
      })
      .catch((err) => {
        console.log("in catch with err", err);
      });
  }, [backend_url]);

  return (
    <div className="App">
      {!iframeReady && (
        <div
          style={{
            padding: "100px",
          }}
        >
          <CircularProgress />
        </div>
      )}
      {tokenExpired && (
        <div
          style={{
            color: "navy",
            padding: "20px",
          }}
        >
          Your session has expired, please refresh the page!
        </div>
      )}
      <div
        ref={containerRef}
        style={{
          display: iframeReady ? "block" : "none",
          padding: "20px",
        }}
      />
    </div>
  );
}

export default AccountView;
