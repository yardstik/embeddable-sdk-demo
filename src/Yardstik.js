const EventEmitter = require('events');

const DOMAIN = 'http://localhost:8080'

class CandidateReportIframe extends EventEmitter {
  // private iframe;
  // build the iframe and attach to an element in the DOM
  constructor({ token, reportId, container, width = 800, height = 600 }) {
    if (!token || !reportId || !container) {
      throw new Error('token, reportId and container are required')
    }
    super();
    const iframeUrl = `${DOMAIN}/embed/report/${reportId}?jwt=${token}`;
    const iframe = document.createElement('iframe');
    iframe.src = iframeUrl
    iframe.setAttribute('width', width)
    iframe.setAttribute('height', height)
    container.appendChild(iframe);
    this.iframe = iframe;
    window.addEventListener('message', this.onMessage);
  }
  // method to handle events emitted by iframe
  onMessage = event => {
    // ignore events emitted from other domains
    if (event.origin !== DOMAIN) {
      return;
    }
    let message;
    try {
      // need to parse event sent by iframe
      message = JSON.parse(event.data);
    } catch (e) { /* intentionally not caught */ }

    if (!message) {
      return;
    }
    switch (message?.name) {
      case 'yardstik:loaded':
        this.onLoaded();
        break;
      case 'yardstik:tokenExpiration':
        this.onExpiration();
        break;
      default:
        break;
    }

  }
  // method to allow for clean-up of iframe
  destroy() {
    if (this.iframe) {
      this.iframe.remove();
    }
  }
  /* private */
  // method to emit loaded event that can be used by parent
  onLoaded = () => {
    console.log("Hey, I got the message that your page is loaded!");
    this.emit('loaded', true);
  }
  // method to emit token expiration event that can be used by parent
  onExpiration = () => {
    console.log('Hey, I got the message that your token expired!');
    this.emit('expiration', true);
  }
}

class AccountDisclosuresIframe extends EventEmitter {
  // private iframe;
  // build the iframe and attach to an element in the DOM
  constructor({ token, accountId, container, width = 800, height = 600 }) {
    if (!token || !accountId || !container) {
      throw new Error('token, accountId and container are required')
    }
    super();
    const iframeUrl = `${DOMAIN}/embed/signDisclosures/${accountId}?jwt=${token}`;
    const iframe = document.createElement('iframe');
    iframe.src = iframeUrl
    iframe.setAttribute('width', width);
    iframe.setAttribute('height', height);
    container.appendChild(iframe);
    this.iframe = iframe;
    window.addEventListener('message', this.onMessage);
  }
  // method to handle events emitted by iframe
  onMessage = event => {
    // ignore events emitted from other domains
    if (event.origin !== DOMAIN) {
      return;
    }
    let message;
    try {
      // need to parse event sent by iframe
      message = JSON.parse(event.data);
    } catch (e) { /* intentionally not caught */ }

    if (!message) {
      return;
    }
    switch (message?.name) {
      case 'yardstik:loaded':
        this.onLoaded()
        break;
      case 'yardstik:tokenExpiration':
        this.onExpiration()
        break;
      default:
        break;
    }

  }
  // method to allow for clean-up of iframe
  destroy() {
    if (this.iframe) {
      this.iframe.remove()
    }
  }
  /* private */
  // method to emit loaded event that can be used by parent
  onLoaded = () => {
    console.log("Hey, I got the message that your page is loaded!")
    this.emit('loaded', true)
  }
  // method to emit token expiration event that can be used by parent
  onExpiration = () => {
    console.log('Hey, I got the message that your token expired!')
    this.emit('expiration', true)
  }
}

export const Yardstik = {
  CandidateReportIframe,
  AccountDisclosuresIframe,
}