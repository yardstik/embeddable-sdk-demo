import './App.css';
import React, { useState, useEffect } from 'react';
import { Yardstik } from './Yardstik';

function App() {
  const [jwt, setJwt] = useState('');
  const [iframeReady, setIframeReady] = useState(false);
  const [yardstikReport, setYardstikReport] = React.useState(null);

  const reportId = '589366ec-f7d6-42fb-8756-31a635d8f511';

  const containerRef = React.useRef();

  React.useEffect(() => {
    if (containerRef && jwt && reportId) {
      const yardstikReport = new Yardstik.CandidateReportIframe({
        token: jwt,
        reportId,
        container: containerRef.current,
      });
      yardstikReport.on('loaded', () => {
        setIframeReady(true);
      })
      setYardstikReport(yardstikReport)
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
          console.log('in then with res', json);
          setJwt(json.token);
          console.log('jwt', json.token);
        });

      })
      .catch((err) => {
        console.log('in catch with err', err)
      });
  }, []);

  return (
    <div className="App">
      <div ref={containerRef} style={{
        display: iframeReady ? 'block' : 'none',
      }} />
      {!iframeReady && <>loading!</>}
      <h1 className='title'>Hello World</h1>
    </div>
  );
}

export default App;
