import './App.css';
import React, { useEffect } from 'react';
import { SIMPLE_IFRAME_URL } from './constants';
import { get } from 'lodash';

const onMessage = (event) => {
  let message;
  try {
    // need to parse event sent by iframe
    message = JSON.parse(event.data);
  } catch (e) { /* intentionally not caught */ }

  if (!message) {
    return;
  }
  const messageName = get(message, 'name', '');
  switch (messageName) {
    case 'yardstik:form_submitted':
      console.log('message received')
      break;
    default:
      break;
  }
}
function SimpleIframe() {
  useEffect(() => {
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
    }
  }, []);

  return (
    <div className="App">
      <div style={{
        padding: '20px'
      }}>
        <iframe title='test' width='600' height='650' src={SIMPLE_IFRAME_URL} />
      </div>
    </div>
  );
}

export default SimpleIframe;