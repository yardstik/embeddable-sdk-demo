import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [jwt, setJwt] = useState('');
  const [reportId, setReportId] = useState('589366ec-f7d6-42fb-8756-31a635d8f511');
  const [iFrameUrl, setiFrameUrl] = useState('');

  // if you have a jwt and reportID, then generate the source URL for the iframe
  useEffect(() => {
    if (jwt && reportId) {
      setiFrameUrl(`http://localhost:8080/embed/report/${reportId}?jwt=${jwt}`)
      console.log(iFrameUrl);
    } else {
      setiFrameUrl('');
    }
  }, [jwt, reportId]);

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
          console.log('jwt', jwt);
        });

      })
      .catch((err) => {
        console.log('in catch with err', err)
      });
  }, []);

  return (
    <div className="App">
      <h1 className='title'>Hello World</h1>
      {/* if you have the source url, render the iframe */}
      {iFrameUrl ? <iframe title='iframe' src={iFrameUrl} width="800" height="600"></iframe> : <div>Embeded view not available</div>}
    </div>
  );
}

export default App;
