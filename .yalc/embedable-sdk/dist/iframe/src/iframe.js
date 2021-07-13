"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YardstikCandidateReportIframe = exports.CandidateReportIframe = exports.returnReportIframe = void 0;
const events_1 = require("events");
const lodash_1 = require("lodash");
const returnReportIframe = () => {
    console.log('in reutrn report iframe');
    return 'I am the report iframe';
};
exports.returnReportIframe = returnReportIframe;
const DOMAIN = 'http://localhost:8080';
class CandidateReportIframe extends events_1.EventEmitter {
    constructor(params) {
        super();
        this.onMessage = (event) => {
            if (event.origin !== DOMAIN) {
                return;
            }
            let message;
            try {
                message = JSON.parse(event.data);
                console.log('message', message.name);
            }
            catch (e) { }
            if (!message) {
                return;
            }
            const messageName = lodash_1.get(message, 'name', '');
            console.log('messageName', messageName);
            switch (messageName) {
                case 'yardstik:loaded':
                    this.onLoaded();
                    console.log('in on loaded');
                    break;
                case 'yardstik:tokenExpiration':
                    this.onExpiration();
                    break;
                default:
                    break;
            }
        };
        this.onLoaded = () => {
            console.log("Hey, I got the message that your page is loaded!");
            this.emit('loaded', true);
        };
        this.onExpiration = () => {
            console.log('Hey, I got the message that your token expired!');
            this.emit('expiration', true);
        };
        console.log('in candidate report iframe constructor in library');
        const { token, reportId, container, width = '800', height = '600' } = params;
        if (!token || !reportId || !container) {
            throw new Error('token, reportId and container are required');
        }
        const iframeUrl = `${DOMAIN}/embed/report/${reportId}?jwt=${token}`;
        const iframe = document.createElement('iframe');
        iframe.src = iframeUrl;
        iframe.setAttribute('width', width);
        iframe.setAttribute('height', height);
        container.appendChild(iframe);
        this.iframe = iframe;
        window.addEventListener('message', this.onMessage);
    }
    destroy() {
        if (this.iframe) {
            this.iframe.remove();
        }
    }
}
exports.CandidateReportIframe = CandidateReportIframe;
exports.YardstikCandidateReportIframe = {
    CandidateReportIframe,
};
//# sourceMappingURL=iframe.js.map