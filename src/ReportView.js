import './App.css';
import React, { useState, useEffect } from 'react';
import { Yardstik } from '@yardstik/embedable-sdk';
import CircularProgress from '@material-ui/core/CircularProgress';

function ReportView() {
  const [jwt, setJwt] = useState('');
  const [iframeReady, setIframeReady] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [yardstikReport, setYardstikReport] = React.useState(null);

  const reportId = '589366ec-f7d6-42fb-8756-31a635d8f511';
  const domain = 'http://localhost:8080';
  const containerRef = React.useRef();

  React.useEffect(() => {
    if (containerRef && jwt && reportId) {
      const yardstikReport = new Yardstik.CandidateReportIframe({
        token: jwt,
        reportId,
        container: containerRef.current,
        domain: domain,
      });
      yardstikReport.on('loaded', () => {
        setIframeReady(true);
      })
      setYardstikReport(yardstikReport)
      yardstikReport.on('expiration', () => {
        console.log("The JWT token has expired.")
        setTokenExpired(true);
      })
      return () => {
        yardstikReport.destroy()
      }
    }
  }, [containerRef, jwt, reportId])

  // on component did mount, get the jwt from the backend
  useEffect(() => {
    fetch("http://localhost:3001/yardstik-jwt", {
      method: "POST",
      body: {
        "user_email": "erin.black@yardstik.com"
      }
    })
      .then(res => {
        res.json().then(json => {
          setJwt(json.token);
        });

      })
      .catch((err) => {
        console.log('in catch with err', err)
      });
  }, []);

  return (
    <div className="App">
      {!iframeReady &&
        <div style={{
          padding: '100px'
        }}>
          <CircularProgress />
        </div>}
      {tokenExpired && <div style={{
        color: 'navy',
        padding: '20px',
      }}>Your session has expired, please refresh the page!</div>}
      <div ref={containerRef} style={{
        display: iframeReady ? 'block' : 'none',
        padding: '20px'
      }} />
    </div>
  );
}

export default ReportView;