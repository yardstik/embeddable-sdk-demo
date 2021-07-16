import './App.css';
import React, { useState, useEffect } from 'react';
import { Yardstik } from '@yardstik/embedable-sdk';
import CircularProgress from '@material-ui/core/CircularProgress';
import { selectedAccountId, selectedDomain } from './constants';

function AccountView() {
  const [jwt, setJwt] = useState('');
  const [iframeReady, setIframeReady] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [yardstikAccountDisclosures, setYardstikAccountDisclosures] = React.useState(null);

  const accountId = selectedAccountId;
  const domain = selectedDomain;
  const containerRef = React.useRef();

  // Use this code to see a report in the iframe
  React.useEffect(() => {
    if (containerRef && jwt && accountId) {
      const yardstikAccountDisclosures = new Yardstik.AccountDisclosuresIframe({
        token: jwt,
        accountId,
        container: containerRef.current,
        domain: domain
      });
      yardstikAccountDisclosures.on('loaded', () => {
        setIframeReady(true);
      })
      setYardstikAccountDisclosures(yardstikAccountDisclosures)
      yardstikAccountDisclosures.on('expiration', () => {
        console.log("The JWT token has expired.")
        setTokenExpired(true);
      })
      return () => {
        yardstikAccountDisclosures.destroy()
      }
    }
  }, [containerRef, jwt, accountId])

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
      {!iframeReady && <div style={{
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

export default AccountView;