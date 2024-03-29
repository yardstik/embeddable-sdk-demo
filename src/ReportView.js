import './App.css';
import React, { useState, useEffect } from 'react';
import { Yardstik } from '@yardstik/embeddable-sdk';
import CircularProgress from '@material-ui/core/CircularProgress';

function ReportView() {
  const [jwt, setJwt] = useState('');
  const [iframeReady, setIframeReady] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [yardstikReport, setYardstikReport] = React.useState(null);

  const containerRef = React.useRef();

  const backend_url = process.env.IS_DOCKER === 'true' ? process.env.BACKEND_URL : process.env.REACT_APP_BACKEND_URL;

  React.useEffect(() => {
    if (containerRef && jwt && process.env.REACT_APP_YARDSTIK_REPORT_ID) {
      const yardstikReport = new Yardstik.CandidateReportIframe({
        token: jwt,
        accountId: process.env.REACT_APP_YARDSTIK_ACCOUNT_ID,
        reportId: process.env.REACT_APP_YARDSTIK_REPORT_ID,
        container: containerRef.current,
        domain: process.env.REACT_APP_YARDSTIK_APP_URL,
      });
      yardstikReport.on('loaded', () => {
        setIframeReady(true);
      })
      setYardstikReport(yardstikReport)

      yardstikReport.on('expiration', () => {
        console.log("The JWT token has expired.")
        setTokenExpired(true);
      });

      return () => {
        yardstikReport.destroy()
      }
    }
  }, [containerRef, jwt])

  // on component did mount, get the jwt from the backend
  useEffect(() => {
    fetch(`${backend_url}/token`, {
      headers: new Headers({
        'content-type': 'application/json',
        'accept': 'application/json'
      }),
      method: "POST",
      body: JSON.stringify({
        user_email: process.env.REACT_APP_YARDSTIK_ACCOUNT_EMAIL
      })
    })
      .then(res => {
        res.json().then(json => {
          setJwt(json.token);
        });

      })
      .catch((err) => {
        console.log('in catch with err', err)
      });
  }, [backend_url]);

  return (
    <div className="App">
      {!iframeReady &&
        <div style={{
          padding: '100px'
        }}>
          <CircularProgress />
        </div>}
      {tokenExpired &&
        <div style={{ color: 'navy', padding: '20px' }}>Your session has expired, please refresh the page!</div>
      }
      <div ref={containerRef} style={{
        display: iframeReady ? 'block' : 'none',
        padding: '20px'
      }} />
    </div>
  );
}

export default ReportView;
